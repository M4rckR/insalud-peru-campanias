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
        const {nombres, telefono, turno} = await req.json();

        if(!nombres || !telefono || !turno){
            return NextResponse.json({ mensaje: "Missing required fields" }, { status: 400 })
        }

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: "New lead",
            html: `<p>Nombres: ${nombres}</p><p>Telefono: ${telefono}</p><p>Turno: ${turno}</p>
            <p>Fecha: ${new Date().toLocaleDateString()}</p>
            <p>Hora: ${new Date().toLocaleTimeString()}</p>
            <p>Página actual: ${req.url}</p>
            `,
        })

        return NextResponse.json({ mensaje: "Correo enviado correctamente" }, { status: 200 })
    }catch (error){
        console.error('Error sending email:', error);
        return NextResponse.json({ mensaje: "Error al enviar el correo" }, { status: 500 })
    }
} 