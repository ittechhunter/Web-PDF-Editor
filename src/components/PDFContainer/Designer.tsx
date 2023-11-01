import {useEffect, useRef} from "react";
import {Designer} from "@pdfme/ui";
// @ts-ignore
import {generate} from "@pdfme/generator";
// @ts-ignore
import {Template, checkTemplate} from "@pdfme/common";

import {
    getFontsData,
    getTemplate,
    readFile,
    cloneDeep,
    getTemplateFromJsonFile,
    downloadJsonFile,
} from "@/lib/helpers";

const headerHeight = 65;

function PDFDesigner() {
    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);

    useEffect(() => {
        let template: Template = getTemplate();
        try {
            const templateString = localStorage.getItem("template");
            const templateJson = templateString
                ? JSON.parse(templateString)
                : getTemplate();
            checkTemplate(templateJson);
            template = templateJson as Template;
        } catch {
            localStorage.removeItem("template");
        }

        getFontsData().then((font) => {
            if (designerRef.current) {
                designer.current = new Designer({
                    domContainer: designerRef.current,
                    template,
                });
                designer.current.onSaveTemplate(onSaveTemplate);
            }
        });
        return () => {
            if (designer.current) {
                designer.current.destroy();
            }
        };
    }, [designerRef]);

    const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
                if (designer.current) {
                    designer.current.updateTemplate(
                        Object.assign(cloneDeep(designer.current.getTemplate()), {
                            basePdf,
                        })
                    );
                }
            });
        }
    };

    const onLoadTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            getTemplateFromJsonFile(e.target.files[0])
                .then((t) => {
                    if (designer.current) {
                        designer.current.updateTemplate(t);
                    }
                })
                .catch((e) => {
                    alert(`Invalid template file.
--------------------------
${e}`);
                });
        }
    };

    const onDownloadTemplate = () => {
        if (designer.current) {
            downloadJsonFile(designer.current.getTemplate(), "template");
            console.log(designer.current.getTemplate());
        }
    };

    const onSaveTemplate = (template?: Template) => {
        if (designer.current) {
            localStorage.setItem(
                "template",
                JSON.stringify(template || designer.current.getTemplate())
            );
            alert("Saved!");
        }
    };

    const onResetTemplate = () => {
        if (designer.current) {
            designer.current.updateTemplate(getTemplate());
            localStorage.removeItem("template");
        }
    };

    const onGeneratePDF = async () => {
        if (designer.current) {
            const template = designer.current.getTemplate();
            const inputs = template.sampledata ?? [];
            const font = await getFontsData();
            const pdf = await generate({
                template, inputs
            });
            const blob = new Blob([pdf.buffer], {type: "application/pdf"});
            window.open(URL.createObjectURL(blob));
        }
    };

    return (
        <div>
            <header
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginRight: 120,
                }}
            >
                <strong>Designer</strong>
                <span style={{margin: "0 1rem"}}>:</span>
                <label style={{width: 180}}>
                    Change BasePDF
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={onChangeBasePDF}
                    />
                </label>
                <span style={{margin: "0 1rem"}}>/</span>
                <label style={{width: 180}}>
                    Load Template
                    <input
                        type="file"
                        accept="application/json"
                        onChange={onLoadTemplate}
                    />
                </label>
                <span style={{margin: "0 1rem"}}>/</span>
                <button onClick={onDownloadTemplate}>Download Template</button>
                <span style={{margin: "0 1rem"}}>/</span>
                <button onClick={() => onSaveTemplate()}>Save Template</button>
                <span style={{margin: "0 1rem"}}>/</span>
                <button onClick={onResetTemplate}>Reset Template</button>
                <span style={{margin: "0 1rem"}}>/</span>
                <button onClick={onGeneratePDF}>Generate PDF</button>
            </header>
            <div ref={designerRef} style={{width: '100%', height: `calc(100vh - ${headerHeight}px)`}}/>
        </div>
    );
}

export default PDFDesigner;