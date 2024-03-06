package tn.esprit.pockerplanning.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;
import tn.esprit.pockerplanning.entities.Project;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class IPDFServiceImp {
    public static byte[] generatePDF(List<Project> projects) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            // Add content to the PDF
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            contentStream.beginText();
            contentStream.newLineAtOffset(100, 700);
            contentStream.showText("List of Projects:");
            contentStream.newLine();
            contentStream.newLine();

            for (Project project : projects) {
                contentStream.showText("ID: " + project.getId());
                contentStream.newLine();
                contentStream.showText("Name: " + project.getName());
                contentStream.newLine();
                contentStream.showText("Domain: " + project.getDomain());
                contentStream.newLine();
                contentStream.showText("Status: " + project.getStatusProject());
                contentStream.newLine();
                contentStream.showText("StartDate: " + project.getStartDate());
                contentStream.newLine();
                contentStream.showText("EndDate: " + project.getEndDate());
                contentStream.newLine();
                // Add more project details as needed
                contentStream.newLine();
            }

            contentStream.endText();
            contentStream.close();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            return outputStream.toByteArray();
        }
    }
}
