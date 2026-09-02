"""
Serviço para gerar PDFs de relatórios de treinos
"""
from io import BytesIO
from datetime import datetime
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

class RelatorioPDFGenerator:
    def __init__(self):
        self.WIDTH, self.HEIGHT = A4
        self.styles = getSampleStyleSheet()
        self._create_custom_styles()
    
    def _create_custom_styles(self):
        """Criar estilos customizados"""
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#667eea'),
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        self.styles.add(ParagraphStyle(
            name='CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#764ba2'),
            spaceAfter=12,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ))
        
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['Normal'],
            fontSize=10,
            spaceAfter=6,
            alignment=TA_LEFT
        ))
    
    def gerar_relatorio_atleta(self, atleta: dict, ciclos: list, treinos: list) -> BytesIO:
        """
        Gerar PDF com relatório completo de um atleta
        
        Args:
            atleta: Dict com dados do atleta
            ciclos: Lista de ciclos do atleta
            treinos: Lista de treinos
        
        Returns:
            BytesIO com o PDF gerado
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=0.75*inch,
            bottomMargin=0.75*inch
        )
        
        story = []
        
        # Título
        titulo = Paragraph(
            f"🏃 Relatório de Treinos",
            self.styles['CustomTitle']
        )
        story.append(titulo)
        
        # Informações do atleta
        data_atual = datetime.now().strftime("%d/%m/%Y")
        info_atleta = Paragraph(
            f"""
            <b>Atleta:</b> {atleta.get('nome', 'N/A')}<br/>
            <b>Email:</b> {atleta.get('email', 'N/A')}<br/>
            <b>Aderência:</b> {atleta.get('aderencia', 0):.1f}%<br/>
            <b>Gerado em:</b> {data_atual}
            """,
            self.styles['CustomBody']
        )
        story.append(info_atleta)
        story.append(Spacer(1, 0.3*inch))
        
        # Ciclos e treinos
        for ciclo in ciclos:
            story.append(Paragraph(
                f"Ciclo: {ciclo.get('nome', 'Sem nome')}",
                self.styles['CustomHeading']
            ))
            
            # Filtrar treinos deste ciclo
            treinos_ciclo = [t for t in treinos if t.get('ciclo_id') == ciclo.get('id')]
            
            if treinos_ciclo:
                # Criar tabela de treinos
                data_tabela = [['Semana', 'Dia', 'Fase', 'Tipo', 'Pace', 'Obs']]
                
                for treino in treinos_ciclo:
                    data_tabela.append([
                        str(treino.get('semana', '')),
                        treino.get('dia', ''),
                        treino.get('fase', ''),
                        treino.get('tipo', ''),
                        treino.get('pace', ''),
                        treino.get('obs', '') or '-'
                    ])
                
                tabela = Table(data_tabela, colWidths=[0.8*cm, 1.2*cm, 1.5*cm, 2*cm, 1.8*cm, 2.7*cm])
                tabela.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#667eea')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 10),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f5f5f5')]),
                    ('FONTSIZE', (0, 1), (-1, -1), 8),
                ]))
                
                story.append(tabela)
            else:
                story.append(Paragraph(
                    "Nenhum treino registrado",
                    self.styles['CustomBody']
                ))
            
            story.append(Spacer(1, 0.2*inch))
        
        # Rodapé
        story.append(Spacer(1, 0.3*inch))
        rodape = Paragraph(
            f"""
            <i>
            Este relatório foi gerado automaticamente pelo sistema Treinador Mateus Lucas.<br/>
            Para mais informações, acesse o painel do treinador.
            </i>
            """,
            self.styles['CustomBody']
        )
        story.append(rodape)
        
        # Gerar PDF
        doc.build(story)
        buffer.seek(0)
        return buffer
    
    def gerar_treino_imprimivel(self, atleta: dict, ciclo: dict, treinos: list) -> BytesIO:
        """
        Gerar PDF simples e clean para imprimir treino da semana
        
        Args:
            atleta: Dict com dados do atleta
            ciclo: Dict com dados do ciclo
            treinos: Lista de treinos
        
        Returns:
            BytesIO com o PDF gerado
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=0.5*inch,
            leftMargin=0.5*inch,
            topMargin=0.5*inch,
            bottomMargin=0.5*inch
        )
        
        story = []
        
        # Cabeçalho
        story.append(Paragraph(
            f"{atleta.get('nome', 'Atleta')}",
            self.styles['Title']
        ))
        story.append(Paragraph(
            f"Ciclo: {ciclo.get('nome', 'N/A')}",
            self.styles['Heading2']
        ))
        story.append(Spacer(1, 0.2*inch))
        
        # Treinos
        for treino in treinos:
            texto = f"""
            <b>Dia:</b> {treino.get('dia', '---')}<br/>
            <b>Fase:</b> {treino.get('fase', '')}<br/>
            <b>Tipo:</b> {treino.get('tipo', '')}<br/>
            <b>Pace:</b> {treino.get('pace', '')}<br/>
            <b>Obs:</b> {treino.get('obs', '-')}<br/>
            <br/>
            """
            story.append(Paragraph(texto, self.styles['CustomBody']))
        
        doc.build(story)
        buffer.seek(0)
        return buffer
