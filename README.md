[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tu-usuario/tu-repo/actions)
[![Next.js](https://img.shields.io/badge/nextjs-15-blue)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

# Insalud Campañas - Documentación

---

## 📋 Descripción General

Este proyecto es una landing multi-sede y multi-tratamiento para Insalud, con un sistema de ruleta de premios independiente por cada combinación de sede y tratamiento. Está construido con Next.js, TypeScript y una arquitectura de componentes reutilizables y escalables.

---

## 📁 Estructura de Carpetas

```
src/
├── app/           # Páginas y rutas principales (Next.js App Router)
├── components/    # Componentes reutilizables (UI, ruleta, formularios, etc.)
├── contexts/      # Contextos globales (ej: TitleContext para la ruleta)
├── data/          # Datos estáticos y de configuración
├── hooks/         # Custom hooks (ej: useSpinWheel)
├── lib/           # Utilidades y helpers
├── schemas/       # Validaciones y esquemas Zod
├── styles/        # Estilos globales y utilidades CSS
├── types/         # Tipos TypeScript
├── utils/         # Funciones auxiliares
```

---

## 🎡 Arquitectura de la Ruleta y Contexto

### ¿Cómo funciona?
- Cada página puede tener una ruleta de premios independiente.
- El estado de participación y de "premio reclamado" se guarda en localStorage usando una clave única por sede y tratamiento.
- El título principal de la página cambia dinámicamente cuando el usuario gana en la ruleta.
- Todo es escalable: puedes agregar nuevas ruletas en nuevas páginas fácilmente.

### ¿Cómo agregar una nueva ruleta?
1. **Envolver la página con el `TitleProvider`** y pasarle las props `sede` y `tratamiento`:
   ```tsx
   <TitleProvider sede="Golf" tratamiento="Prostatitis">
     ...
   </TitleProvider>
   ```
2. **Agregar el componente `SpinWheelTrigger`** con las mismas props:
   ```tsx
   <SpinWheelTrigger sede="Golf" tratamiento="Prostatitis" />
   ```
3. **El título de la página cambiará automáticamente** cuando el usuario gane.

### Ejemplo de uso en una página
```tsx
import { TitleProvider } from '@/contexts/TitleContext'
import { SpinWheelTrigger } from '@/components/ui/SpinWheelTrigger'

export default function ProstatitisGolf() {
  return (
    <TitleProvider sede="Golf" tratamiento="Prostatitis">
      <HeroContact ... />
      <SpinWheelTrigger sede="Golf" tratamiento="Prostatitis" />
      ...
    </TitleProvider>
  )
}
```

### Tabla de rutas y ruletas
| Ruta                                 | Sede         | Tratamiento      | Ruleta independiente |
|--------------------------------------|--------------|------------------|----------------------|
| /jesus-maria/vph                     | Jesús María  | VPH              | Sí                   |
| /jesus-maria/prostatitis             | Jesús María  | Prostatitis      | Sí                   |
| /jesus-maria/ondas-de-choque         | Jesús María  | Ondas de Choque  | Sí                   |
| /golf/vph                            | Golf         | VPH              | Sí                   |
| /golf/prostatitis                    | Golf         | Prostatitis      | Sí                   |
| /golf/ondas-de-choque                | Golf         | Ondas de Choque  | Sí                   |
| /sur/vph                             | Sur          | VPH              | Sí                   |

---

## 🧑‍💻 Buenas Prácticas y Convenciones
- Usa siempre el `TitleProvider` y el `SpinWheelTrigger` con las props correctas.
- Los componentes y hooks están documentados con comentarios explicativos.
- El código es modular, reutilizable y fácil de escalar.
- Usa TypeScript para todo.
- Mantén los datos y textos en archivos separados en `/data`.

---

## ⚙️ Instalación y Despliegue

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd insalud-peru-campanias
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta en desarrollo:
   ```bash
   npm run dev
   ```
4. Compila para producción:
   ```bash
   npm run build
   npm start
   ```

---

## 🤝 Créditos y Contacto

- Desarrollador principal: [Tu Nombre]
- Contacto: [tu-email@ejemplo.com]
- Diseño y producto: Insalud Perú

---

# Insalud Campañas - Documentation (English)

---

## 📋 General Description

This project is a multi-location and multi-treatment landing for Insalud, with an independent prize wheel system for each location and treatment combination. Built with Next.js, TypeScript, and a scalable, reusable component architecture.

---

## 📁 Folder Structure

```
src/
├── app/           # Main pages and routes (Next.js App Router)
├── components/    # Reusable components (UI, wheel, forms, etc.)
├── contexts/      # Global contexts (e.g., TitleContext for the wheel)
├── data/          # Static/configuration data
├── hooks/         # Custom hooks (e.g., useSpinWheel)
├── lib/           # Utilities and helpers
├── schemas/       # Zod validation schemas
├── styles/        # Global styles and CSS utilities
├── types/         # TypeScript types
├── utils/         # Helper functions
```

---

## 🎡 Wheel & Context Architecture

### How does it work?
- Each page can have its own independent prize wheel.
- Participation and "prize claimed" state is stored in localStorage using a unique key per location and treatment.
- The main page title changes dynamically when the user wins the wheel.
- Everything is scalable: you can easily add new wheels to new pages.

### How to add a new wheel?
1. **Wrap the page with `TitleProvider`** and pass `sede` and `tratamiento` props:
   ```tsx
   <TitleProvider sede="Golf" tratamiento="Prostatitis">
     ...
   </TitleProvider>
   ```
2. **Add the `SpinWheelTrigger` component** with the same props:
   ```tsx
   <SpinWheelTrigger sede="Golf" tratamiento="Prostatitis" />
   ```
3. **The page title will change automatically** when the user wins.

### Example usage in a page
```tsx
import { TitleProvider } from '@/contexts/TitleContext'
import { SpinWheelTrigger } from '@/components/ui/SpinWheelTrigger'

export default function ProstatitisGolf() {
  return (
    <TitleProvider sede="Golf" tratamiento="Prostatitis">
      <HeroContact ... />
      <SpinWheelTrigger sede="Golf" tratamiento="Prostatitis" />
      ...
    </TitleProvider>
  )
}
```

### Routes and wheels table
| Route                                | Location     | Treatment        | Independent wheel    |
|--------------------------------------|--------------|------------------|---------------------|
| /jesus-maria/vph                     | Jesús María  | VPH              | Yes                 |
| /jesus-maria/prostatitis             | Jesús María  | Prostatitis      | Yes                 |
| /jesus-maria/ondas-de-choque         | Jesús María  | Ondas de Choque  | Yes                 |
| /golf/vph                            | Golf         | VPH              | Yes                 |
| /golf/prostatitis                    | Golf         | Prostatitis      | Yes                 |
| /golf/ondas-de-choque                | Golf         | Ondas de Choque  | Yes                 |
| /sur/vph                             | Sur          | VPH              | Yes                 |

---

## 🧑‍💻 Best Practices & Conventions
- Always use `TitleProvider` and `SpinWheelTrigger` with the correct props.
- Components and hooks are documented with explanatory comments.
- Code is modular, reusable, and easy to scale.
- Use TypeScript everywhere.
- Keep data and texts in separate files under `/data`.

---

## ⚙️ Installation & Deployment

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd insalud-peru-campanias
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## 🤝 Credits & Contact

- Lead developer: [Your Name]
- Contact: [your-email@example.com]
- Design & product: Insalud Perú
