import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

export async function POST(req: NextRequest) {
    try{
        const {nombres, telefono, turno, gestorEmail, gestorNombre, tratamiento, sede} = await req.json();

        if(!nombres || !telefono || !turno){
            return NextResponse.json({ mensaje: "Missing required fields" }, { status: 400 })
        }

        // Email de destino: si se proporciona gestorEmail, usar ese; sino usar el por defecto
        const destinatario = gestorEmail || process.env.SMTP_USER;
        
        // Asunto personalizado según el tratamiento y sede
        const asunto = `🩺 Nuevo Lead - ${tratamiento || 'Consulta'} ${sede ? `- ${sede}` : ''}`;
        
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: destinatario,
            subject: asunto,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">🩺 Nuevo Lead</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">${tratamiento || 'Consulta'} - ${sede || 'Sede no especificada'}</p>
                    </div>
                    
                    <!-- Información del Paciente -->
                    <div style="padding: 30px;">
                        <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                            <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">👤 Información del Paciente</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Nombres:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${nombres}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Teléfono:</td>
                                    <td style="padding: 8px 0; color: #6b7280;"><a href="tel:+51${telefono}" style="color: #2563eb; text-decoration: none;">+51 ${telefono}</a></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Turno preferido:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${turno}</td>
                                </tr>
                                ${sede ? `
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Sede:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${sede}</td>
                                </tr>
                                ` : ''}
                                ${tratamiento ? `
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Tratamiento:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${tratamiento}</td>
                                </tr>
                                ` : ''}
                            </table>
                        </div>
                        
                        <!-- Información del Gestor -->
                        <div style="background-color: #ecfdf5; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                            <h2 style="color: #059669; margin-top: 0; margin-bottom: 15px; font-size: 18px;">👨‍⚕️ Gestor Asignado</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                ${gestorNombre ? `
                                <tr style="border-bottom: 1px solid #d1fae5;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Gestor:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${gestorNombre}</td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${destinatario}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Detalles del Lead -->
                        <div style="background-color: #fef3c7; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                            <h2 style="color: #d97706; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📅 Detalles del Lead</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="border-bottom: 1px solid #fde68a;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Fecha:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleDateString('es-PE', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #fde68a;">
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Hora:</td>
                                    <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleTimeString('es-PE')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Página origen:</td>
                                    <td style="padding: 8px 0; color: #6b7280;"><a href="${req.headers.get('referer') || '#'}" style="color: #2563eb; text-decoration: none;">${req.headers.get('referer') || 'No disponible'}</a></td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Acción recomendada -->
                        <div style="background-color: #dbeafe; padding: 25px; border-radius: 8px; text-align: center; border-left: 4px solid #3b82f6;">
                            <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 10px;">📞 Acción Recomendada</h3>
                            <p style="margin: 0; color: #6b7280;">Contactar al paciente lo antes posible para agendar su cita y brindar información detallada sobre el tratamiento.</p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                        <p style="margin: 0;">Este lead fue generado automáticamente desde la landing page de <strong>Insalud</strong></p>
                        <p style="margin: 5px 0 0 0;">📧 Sistema automatizado de gestión de leads</p>
                    </div>
                </div>
            `,
        })

        return NextResponse.json({ 
            mensaje: "Correo enviado correctamente",
            destinatario: destinatario,
            gestor: gestorNombre || "Gestor por defecto"
        }, { status: 200 })
    }catch (error){
        console.error('Error sending email:', error);
        return NextResponse.json({ mensaje: "Error al enviar el correo" }, { status: 500 })
    }
} 