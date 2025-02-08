import { defineStore } from "pinia";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";

export const useResumeStore = defineStore("resume", () => {
  const generateResumePDF = async (resumeData: {
    name: string;
    phone: string;
    age: number;
    email: string;
    address: string;
    summary: string;
    backgrounds: AcademicBackground[];
    languages: UserLanguage[];
    qualifications: Qualification[];
    skills: Skill[];
    experiences: Experience[];
  }) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([550, 750]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;
    const margin = 50;
    const maxWidth = page.getWidth() - 2 * margin;
    let y = page.getHeight() - margin;

    const addText = (
      text: string,
      x: number,
      y: number,
      size: number,
      font: any,
      color = rgb(0, 0, 0),
      maxWidth: number
    ) => {
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color,
        maxWidth,
        lineHeight: size * 1.2,
      });
    };

    // Função para adicionar uma linha horizontal
    const addLine = (y: number) => {
      page.drawLine({
        start: { x: margin, y },
        end: { x: page.getWidth() - margin, y },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    };

    // Adiciona o título (Nome)
    addText(resumeData.name, margin, y, 24, boldFont, rgb(0, 0, 0), maxWidth);
    y -= 30;

    addText(
      `Email: ${resumeData.email}`,
      margin,
      y,
      fontSize,
      font,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 20;
    addText(
      `Telefone: ${resumeData.phone}`,
      margin,
      y,
      fontSize,
      font,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 20;
    addText(
      `Endereço: ${resumeData.address}`,
      margin,
      y,
      fontSize,
      font,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 30;

    // Adiciona a linha divisória
    addLine(y);
    y -= 20;

    // Adiciona a seção "Resumo"
    addText("Sobre mim", margin, y, 18, boldFont, rgb(0, 0, 0), maxWidth);
    y -= 20;
    addText(
      resumeData.summary,
      margin,
      y,
      fontSize,
      font,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 60;

    // Adiciona a linha divisória
    addLine(y);
    y -= 20;

    // Adiciona a seção "Experiência profissional"
    addText(
      "Experiência profissional",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 20;

    resumeData.experiences.forEach((exp) => {
      addText(
        `${exp.institution} | ${exp.period}`,
        margin,
        y,
        fontSize,
        boldFont,
        rgb(0, 0, 0),
        maxWidth
      );
      y -= 15;
      addText(
        `${exp.function}`,
        margin,
        y,
        fontSize,
        font,
        rgb(0, 0, 0),
        maxWidth
      );
      y -= 15;
    });

    addLine(y);
    y -= 20;

    addText(
      "Formação acadêmica",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 20;

    resumeData.backgrounds.forEach((bkg) => {
      addText(
        `${bkg.institution} (${bkg.startYear} - ${bkg.endYear})`,
        margin,
        y,
        fontSize,
        boldFont,
        rgb(0, 0, 0),
        maxWidth
      );
      y -= 15;
      addText(
        `${bkg.description}`,
        margin,
        y,
        fontSize,
        font,
        rgb(0, 0, 0),
        maxWidth
      );
      y -= 30;
    });

    // Adiciona a linha divisória
    addLine(y);
    y -= 20;

    // Adiciona a seção "Habilidades e competências"
    addText(
      "Habilidades e competências",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 20;

    resumeData.skills.forEach((skill) => {
      addText(
        `- ${skill.skill}`,
        margin,
        y,
        fontSize,
        font,
        rgb(0, 0, 0),
        maxWidth
      );
      y -= 15;
    });

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, "Curriculo.pdf", "application/pdf");
  };

  return {
    generateResumePDF,
  };
});
