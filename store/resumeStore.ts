import { defineStore } from "pinia";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";

export const useResumeStore = defineStore("resume", () => {
  const generateResumePDF = async (resumeData: {
    name: string;
    image: any;
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
    if (
      !resumeData.experiences.length ||
      !resumeData.skills.length ||
      !resumeData.backgrounds.length ||
      !resumeData.qualifications.length
    ) {
      console.log("Not complete");
      return;
    }

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595.28, 841.89]);
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontSize = 12;
    const margin = 50;
    const maxWidth = page.getWidth() - 2 * margin;
    let y = page.getHeight() - margin;

    const heightOfText = (text: string, fontSize: number, maxWidth: number) => {
      const words = text.split(" ");
      let lines = 1;
      let currentLineLength = 0;

      words.forEach((word) => {
        const wordWidth = word.length * (fontSize * 0.6);
        if (currentLineLength + wordWidth > maxWidth) {
          lines++;
          currentLineLength = wordWidth;
        } else {
          currentLineLength += wordWidth;
        }
      });

      return lines * fontSize * 1.2;
    };

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

    const addLine = (y: number) => {
      page.drawLine({
        start: { x: margin, y },
        end: { x: page.getWidth() - margin, y },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    };

    const checkForNewPage = (requiredSpace: number) => {
      if (y - requiredSpace < margin) {
        // Cria uma nova página
        page = pdfDoc.addPage([595.28, 841.89]);
        y = page.getHeight() - margin;
      }
    };

    if (resumeData.image) {
      let image;
      try {
        image = await pdfDoc.embedPng(resumeData.image);
      } catch {
        image = await pdfDoc.embedJpg(resumeData.image);
      }

      const imageWidth = 110;
      const imageHeight = 120;

      const imageX = page.getWidth() - imageWidth - margin;
      const imageY = y - imageHeight + 10;

      page.drawImage(image, {
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
      });
    }

    checkForNewPage(30);
    addText(resumeData.name, margin, y, 24, boldFont, rgb(0, 0, 0), maxWidth);
    y -= 30;

    checkForNewPage(20);
    addText(
      `Idade: ${resumeData.age}`,
      margin,
      y,
      fontSize,
      font,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 20;

    checkForNewPage(20);
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

    checkForNewPage(20);
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

    checkForNewPage(20);
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

    checkForNewPage(20);
    addLine(y);
    y -= 20;

    checkForNewPage(30);
    addText("Sobre mim", margin, y, 18, boldFont, rgb(0, 0, 0), maxWidth);
    y -= 30;

    const summaryHeight = heightOfText(resumeData.summary, fontSize, maxWidth);
    checkForNewPage(summaryHeight);

    addText(
      resumeData.summary,
      margin,
      y,
      fontSize,
      font,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= summaryHeight;

    checkForNewPage(20);
    addLine(y);
    y -= 20;

    checkForNewPage(30);
    addText(
      "Experiência profissional",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 30;

    resumeData.experiences.forEach((exp) => {
      checkForNewPage(45);
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
      y -= 30;
    });

    checkForNewPage(20);
    addLine(y);
    y -= 20;

    checkForNewPage(30);
    addText(
      "Formação acadêmica",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 30;

    resumeData.backgrounds.forEach((bkg) => {
      checkForNewPage(45);
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

    checkForNewPage(20);
    addLine(y);
    y -= 20;

    checkForNewPage(30);
    addText(
      "Capacitação Complementar",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 30;

    resumeData.qualifications.forEach((bkg) => {
      checkForNewPage(45);
      addText(
        `${bkg.institution} (${bkg.workload})`,
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

    checkForNewPage(20);
    addLine(y);
    y -= 20;

    checkForNewPage(30);
    addText(
      "Habilidades e competências",
      margin,
      y,
      18,
      boldFont,
      rgb(0, 0, 0),
      maxWidth
    );
    y -= 30;

    resumeData.skills.forEach((skill) => {
      checkForNewPage(20);
      addText(
        `- ${skill.skill}`,
        margin,
        y,
        fontSize,
        font,
        rgb(0, 0, 0),
        maxWidth
      );
      y -= 20;
    });

    checkForNewPage(20);
    addLine(y);
    y -= 20;

    if (resumeData.languages && resumeData.languages.length > 0) {
      checkForNewPage(30);
      addText("Idiomas", margin, y, 18, boldFont, rgb(0, 0, 0), maxWidth);
      y -= 30;

      resumeData.languages.forEach((lang) => {
        checkForNewPage(20);
        addText(
          `- ${lang.name}: ${lang.level}`,
          margin,
          y,
          fontSize,
          font,
          rgb(0, 0, 0),
          maxWidth
        );
        y -= 20;
      });

      checkForNewPage(20);
      y -= 20;
    }

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, "Curriculo.pdf", "application/pdf");
  };

  return {
    generateResumePDF,
  };
});
