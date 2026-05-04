# Documentación Técnica — Portafolio Profesional
**Kevin Jara** | Fullstack Engineer & Industrial Automation Specialist  
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · Vercel  
**Versión del documento:** 1.1 | Mayo 2026

---

## Índice

1. [Introducción y Justificación del Stack](#1-introducción-y-justificación-del-stack)
   - 1.1 [Qué es Next.js y por qué no React puro](#11-qué-es-nextjs-y-por-qué-no-react-puro)
   - 1.2 [SSR vs SSG vs CSR — El triángulo del rendering](#12-ssr-vs-ssg-vs-csr--el-triángulo-del-rendering)
   - 1.3 [SEO: Por qué le importa al navegador cómo se genera el HTML](#13-seo-por-qué-le-importa-al-navegador-cómo-se-genera-el-html)
   - 1.4 [Tailwind CSS — Filosofía Utility-First](#14-tailwind-css--filosofía-utility-first)
   - 1.5 [TypeScript — Tipado estático como red de seguridad](#15-typescript--tipado-estático-como-red-de-seguridad)

2. [Arquitectura del Proyecto](#2-arquitectura-del-proyecto)
   - 2.1 [Estructura de carpetas (App Router)](#21-estructura-de-carpetas-app-router)
   - 2.2 [Server Components vs Client Components](#22-server-components-vs-client-components)
   - 2.3 [Flujo de datos: de la URL al navegador](#23-flujo-de-datos-de-la-url-al-navegador)
   - 2.4 [CI/CD: GitHub + Vercel](#24-cicd-github--vercel)

3. [Análisis Técnico de los Proyectos Integrados](#3-análisis-técnico-de-los-proyectos-integrados)
   - 3.1 [Visión Artificial — Detección de Fugas](#31-visión-artificial--detección-de-fugas)
   - 3.2 [Instrumentación y Control Industrial](#32-instrumentación-y-control-industrial)
   - 3.3 [Sistemas UPS Industriales](#33-sistemas-ups-industriales)
   - 3.4 [Sistemas Fotovoltaicos](#34-sistemas-fotovoltaicos)

4. [Internacionalización (i18n) — Switch ES / EN](#4-internacionalización-i18n--switch-es--en)
   - 4.1 [Qué es i18n y por qué importa](#41-qué-es-i18n-y-por-qué-importa)
   - 4.2 [Arquitectura de la solución](#42-arquitectura-de-la-solución)
   - 4.3 [El patrón Context API explicado](#43-el-patrón-context-api-explicado)
   - 4.4 [Cómo agregar un nuevo idioma](#44-cómo-agregar-un-nuevo-idioma)

5. [Guía de Mantenimiento](#5-guía-de-mantenimiento)
   - 4.1 [El ciclo git push → deploy automático](#41-el-ciclo-git-push--deploy-automático)
   - 4.2 [Variables de entorno y el archivo .env](#42-variables-de-entorno-y-el-archivo-env)
   - 4.3 [Comandos de referencia rápida](#43-comandos-de-referencia-rápida)

6. [Glosario de Términos](#6-glosario-de-términos)

---

## 1. Introducción y Justificación del Stack

### 1.1 Qué es Next.js y por qué no React puro

**React** es una *biblioteca* de JavaScript para construir interfaces de usuario. Su único trabajo es renderizar componentes. No sabe nada de rutas, ni de optimización de imágenes, ni de cómo servir tu aplicación al mundo.

**Next.js** es un *framework* completo construido sobre React. Agrega todo lo que React no tiene:

| Capacidad | React puro | Next.js |
|---|---|---|
| Enrutamiento | Manual (React Router) | Automático por sistema de archivos |
| Renderizado en servidor | ❌ No | ✅ SSR / SSG nativos |
| Optimización de imágenes | ❌ No | ✅ `<Image>` automático |
| SEO (meta tags, OpenGraph) | Manual y difícil | ✅ `export const metadata` |
| División de código | Manual | ✅ Automático por ruta |
| Deploy production-ready | Configuración compleja | ✅ `next build` + Vercel |

La analogía de ingeniería: React es el motor de un vehículo. Next.js es el vehículo completo — carrocería, dirección, frenos y panel de instrumentos incluidos.

---

### 1.2 SSR vs SSG vs CSR — El triángulo del rendering

Entender estos tres conceptos es fundamental para cualquier rol de desarrollo web moderno.

#### CSR — Client-Side Rendering (React puro por defecto)

```
Servidor  ──────────►  Navegador
  HTML vacío           Descarga JS → Ejecuta JS → Renderiza UI
  (<div id="root"/>)        ↑
                        ~2-5 segundos de espera
```

El servidor envía un HTML casi vacío. El navegador descarga todo el JavaScript, lo ejecuta, y *entonces* construye la página. **Problema:** los bots de Google ven el HTML vacío antes de que el JS corra. Mala indexación = bajo SEO.

#### SSR — Server-Side Rendering

```
Servidor (Node.js)  ──────────►  Navegador
  Ejecuta React          HTML completo con contenido
  en el servidor  ──►    Navegador muestra contenido inmediato
                         JS llega después → hidrata la UI
```

El servidor genera el HTML con contenido real *en cada petición*. El navegador recibe HTML completo y lo muestra de inmediato. Ideal para páginas con datos dinámicos (ej. dashboard con datos de usuario).

#### SSG — Static Site Generation (el que usa este portafolio)

```
Tiempo de build (una sola vez)
  next build ──► Genera todos los HTML de forma estática
                    ↓
Vercel almacena los archivos estáticos en su CDN global
                    ↓
Usuario pide la página ──► Vercel entrega el HTML desde el nodo CDN más cercano
                           (latencia de ~10ms, sin servidor Node corriendo)
```

**¿Por qué SSG es perfecto para un portafolio?**

El contenido de un portafolio no cambia por usuario ni en tiempo real. Se genera una vez en el build y se sirve a todos por igual. El resultado: velocidad máxima, costo mínimo (gratis en Vercel), y HTML pre-renderizado que los bots de Google leen perfectamente.

---

### 1.3 SEO: Por qué le importa al navegador cómo se genera el HTML

SEO (Search Engine Optimization) es el conjunto de prácticas que hacen que tu sitio aparezca en Google. Los bots de Google funcionan así:

1. Entran a tu URL
2. Leen el HTML que reciben
3. Si el HTML está vacío (CSR puro), ven poco contenido → baja posición
4. Si el HTML tiene el contenido completo (SSG/SSR), indexan todo → buena posición

En `app/layout.tsx` del portafolio definimos los metadatos:

```typescript
export const metadata: Metadata = {
  title: 'Kevin Jara — Fullstack Engineer | Computer Vision & Industrial Automation',
  description: 'Portafolio profesional de Kevin Jara...',
}
```

Next.js inyecta esto en el `<head>` del HTML generado:

```html
<head>
  <title>Kevin Jara — Fullstack Engineer | Computer Vision & Industrial Automation</title>
  <meta name="description" content="Portafolio profesional de Kevin Jara..." />
</head>
```

Un reclutador que busque "fullstack engineer computer vision Chile" en Google tiene más probabilidad de encontrar este portafolio gracias al SSG + metadatos correctos.

---

### 1.4 Tailwind CSS — Filosofía Utility-First

#### El problema que resuelve

CSS tradicional tiene un problema de escalabilidad: terminas con archivos `.css` enormes llenos de clases inventadas que colisionan entre sí:

```css
/* CSS tradicional — propenso a conflictos */
.card { padding: 16px; }
.card-header { font-size: 20px; font-weight: bold; }
.card-special { padding: 16px; background: blue; } /* duplicación */
```

#### La solución: clases de utilidad atómicas

Tailwind invierte el paradigma. En lugar de clases semánticas, cada clase tiene **un solo propósito**:

```tsx
// Tailwind — cada clase hace exactamente una cosa
<div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 hover:border-sky-300 transition-colors">
```

| Clase Tailwind | CSS equivalente |
|---|---|
| `p-4` | `padding: 1rem` |
| `rounded-xl` | `border-radius: 0.75rem` |
| `bg-white` | `background-color: #ffffff` |
| `dark:bg-slate-800` | `@media(dark) { background-color: #1e293b }` |
| `hover:border-sky-300` | `&:hover { border-color: #7dd3fc }` |
| `transition-colors` | `transition: color, background-color... 150ms` |

#### Responsive design con prefijos

Tailwind usa un sistema **mobile-first**: sin prefijo = todos los tamaños, prefijo = desde ese breakpoint hacia arriba.

```tsx
<h1 className="text-5xl sm:text-6xl md:text-7xl">
  Kevin Jara
</h1>
```

- `text-5xl` → Móvil (< 640px): fuente de 3rem
- `sm:text-6xl` → Tablet (≥ 640px): fuente de 3.75rem  
- `md:text-7xl` → Desktop (≥ 768px): fuente de 4.5rem

#### Dark mode con Tailwind v4

Este proyecto usa **Tailwind v4** con dark mode basado en clase (`.dark` en el elemento `<html>`), gestionado por `next-themes`. La configuración en `globals.css`:

```css
@import "tailwindcss";

/* Activa dark: cuando el ancestro tiene clase .dark */
@custom-variant dark (&:where(.dark, .dark *));
```

Esto permite usar `dark:` en cualquier componente:

```tsx
<p className="text-slate-600 dark:text-slate-400">
  Texto gris en light, gris más claro en dark
</p>
```

#### Ventaja en producción: PurgeCSS automático

Tailwind v4 analiza todos tus archivos y genera **solo el CSS que usas**. Un portafolio típico pesa menos de 10KB de CSS en producción, comparado con ~150KB de Bootstrap completo.

---

### 1.5 TypeScript — Tipado estático como red de seguridad

TypeScript es JavaScript con un sistema de tipos. En este proyecto, define contratos claros entre componentes:

```typescript
// data/projects.ts — el "contrato" de un proyecto
export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  achievement: string
  technologies: string[]
  category: 'software' | 'industrial' | 'energy'  // solo estos 3 valores son válidos
  github?: string   // el ? significa opcional
  demo?: string
}
```

Si en algún componente intentas acceder a `project.nonExistent`, TypeScript lo detecta **antes de compilar**, no en producción frente al usuario. Para un perfil de ingeniería, usar TypeScript señala madurez técnica.

---

## 2. Arquitectura del Proyecto

### 2.1 Estructura de carpetas (App Router)

```
portafolio-web/
│
├── app/                          ← Corazón del App Router de Next.js
│   ├── layout.tsx                ← Layout raíz: envuelve TODAS las páginas
│   ├── page.tsx                  ← Ruta "/" (homepage)
│   └── globals.css               ← Estilos globales + configuración Tailwind
│
├── components/                   ← Componentes reutilizables
│   ├── ui/                       ← Componentes de interfaz genéricos
│   │   ├── NavBar.tsx            ← Barra de navegación (Client Component)
│   │   ├── ThemeProvider.tsx     ← Proveedor de dark/light mode
│   │   └── SocialIcons.tsx       ← SVGs de GitHub y LinkedIn
│   └── sections/                 ← Secciones completas de la página
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       └── Contact.tsx
│
├── data/                         ← "Base de datos" en TypeScript
│   ├── projects.ts               ← Array de tus 4 proyectos
│   └── skills.ts                 ← Array de categorías de habilidades
│
├── lib/                          ← Utilidades compartidas
│   └── utils.ts                  ← Función cn() para clases condicionales
│
├── public/                       ← Archivos estáticos (imágenes, CV, favicon)
│   └── cv.pdf                    ← Tu CV descargable
│
├── next.config.ts                ← Configuración de Next.js
├── tsconfig.json                 ← Configuración de TypeScript
├── postcss.config.mjs            ← Configuración de PostCSS (para Tailwind v4)
└── package.json                  ← Dependencias y scripts del proyecto
```

#### ¿Por qué App Router y no Pages Router?

Next.js tiene dos sistemas de rutas. El **Pages Router** (antiguo) usa `/pages/index.tsx`. El **App Router** (moderno, desde Next.js 13) usa `/app/page.tsx`.

Las diferencias clave:

| Característica | Pages Router | App Router |
|---|---|---|
| Componentes por defecto | Client Components | **Server Components** |
| Layouts anidados | Complicado | Nativo y elegante |
| Streaming / Suspense | Limitado | Nativo |
| Recomendación oficial | Legacy | ✅ Nuevo estándar |

---

### 2.2 Server Components vs Client Components

Esta distinción es el concepto más importante de Next.js moderno.

#### Server Components (por defecto)

```tsx
// app/page.tsx — Server Component (no tiene 'use client')
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Hero />   {/* Este componente se evalúa en el servidor */}
    </>
  )
}
```

- Se ejecutan **en el servidor de Vercel**, nunca en el navegador del usuario
- El resultado es HTML puro que viaja por la red
- No pueden usar `useState`, `useEffect`, ni eventos del browser
- **Ventaja:** cero JavaScript enviado al cliente para este componente

#### Client Components ('use client')

```tsx
// components/ui/NavBar.tsx
'use client'  // ← Esta directiva lo convierte en Client Component

import { useState, useEffect } from 'react'

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)  // ✅ OK en Client
  // ...
}
```

- Se ejecutan en el **navegador del usuario**
- Pueden usar hooks de React, eventos, localStorage, etc.
- Se envía JavaScript al cliente para hacerlos interactivos

#### La regla de oro de la composición

```
Server Component (app/page.tsx)
  └── Server Component (Hero, About, Projects...)
        └── Client Component (NavBar, animaciones Framer Motion)
              └── Server Component ← ⚠️ Solo pasándolo como prop/children
```

Un Server Component puede importar Client Components. Un Client Component **no puede** importar Server Components directamente. Este proyecto respeta esta jerarquía.

---

### 2.3 Flujo de datos: de la URL al navegador

Cuando alguien entra a tu portafolio en Vercel, esto es lo que ocurre paso a paso:

```
1. USUARIO escribe tu-portafolio.vercel.app
        │
        ▼
2. DNS resuelve el dominio hacia la red de Vercel (CDN global)
        │
        ▼
3. VERCEL entrega el HTML estático pre-generado (SSG)
   — Este archivo fue creado por `next build` cuando hiciste push
   — No hay Node.js corriendo, es un archivo estático puro
        │
        ▼
4. NAVEGADOR recibe el HTML completo y lo muestra (pintura inicial)
   — El usuario ya ve la página sin esperar JavaScript
        │
        ▼
5. NAVEGADOR descarga el JavaScript de React/Next.js en paralelo
        │
        ▼
6. HIDRATACIÓN: React "toma control" del HTML existente
   — Los Client Components (NavBar, animaciones) se activan
   — Los event listeners se adjuntan
   — El portafolio se vuelve completamente interactivo
```

**¿Por qué esto importa?** La métrica **LCP (Largest Contentful Paint)** mide cuándo aparece el contenido principal. Con SSG, el LCP es casi instantáneo porque el HTML llega completo en el paso 3. Con CSR puro, el LCP espera hasta el paso 5-6. Google premia los LCP rápidos en el ranking.

---

### 2.4 CI/CD: GitHub + Vercel

**CI/CD** son las siglas de *Continuous Integration / Continuous Deployment* (Integración y Despliegue Continuo). Es el pipeline automático que transforma tu código en una app en producción sin intervención manual.

#### Cómo funciona la integración GitHub ↔ Vercel

```
Tu máquina local
      │
      │  git commit + git push
      ▼
┌─────────────────────────────────┐
│           GITHUB                │
│  Recibe el nuevo código         │
│  Dispara un webhook a Vercel    │
└──────────────┬──────────────────┘
               │  Webhook (notificación HTTP automática)
               ▼
┌─────────────────────────────────┐
│           VERCEL                │
│  1. Clona tu repositorio        │
│  2. npm install                 │
│  3. npm run build (next build)  │
│  4. Verifica que el build pase  │
│  5. Despliega a producción      │
└──────────────┬──────────────────┘
               │
               ▼
    ✅ Nueva versión en vivo en tu URL
    (en aproximadamente 30-60 segundos)
```

#### Ambientes de Vercel

Vercel crea automáticamente **tres ambientes** según el contexto de Git:

| Ambiente | Cuándo se activa | URL generada |
|---|---|---|
| **Production** | Push a `main` | `tu-sitio.vercel.app` |
| **Preview** | Cada Pull Request | `tu-sitio-git-feature-xyz.vercel.app` |
| **Development** | `npm run dev` local | `localhost:3000` |

Los ambientes de Preview son extremadamente útiles: cada rama o PR tiene su propia URL temporal para revisar cambios antes de mergear a producción.

---

## 3. Análisis Técnico de los Proyectos Integrados

### 3.1 Visión Artificial — Detección de Fugas

#### Contexto del proyecto

El sistema detecta fugas presurizadas en tuberías de transporte de relaves mineros usando visión computacional en tiempo real, con integración al DCS de la planta.

#### Teoría: Cómo funciona la detección de patrones visuales

Una "fuga presurizada" en tuberías de relave produce un patrón visual característico: una columna o nube de material en erupción. OpenCV detecta este patrón mediante:

**1. Preprocesamiento de frame**

```python
import cv2
import numpy as np

frame = cv2.VideoCapture(0).read()[1]

# Convertir a escala de grises reduce 3 canales (RGB) a 1
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

# Suavizado gaussiano elimina ruido de la cámara
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
```

**2. Detección de movimiento por sustracción de fondo**

```python
# MOG2 modela el "fondo estático" de la cámara
# Todo lo que se mueve es "foreground" — candidato a fuga
back_sub = cv2.createBackgroundSubtractorMOG2(history=500, varThreshold=50)
fg_mask = back_sub.apply(blurred)
```

**3. Análisis morfológico del blob detectado**

```python
# Encuentra contornos de objetos en movimiento
contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

for contour in contours:
    area = cv2.contourArea(contour)
    if area > UMBRAL_AREA_FUGA:          # ej: 5000 px²
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = h / w             # una erupción es más alta que ancha
        
        if aspect_ratio > 1.5:           # patrón vertical = fuga probable
            activar_alarma()
```

#### Integración con el DCS (Distributed Control System)

El DCS es el cerebro de control de una planta de procesos. Se comunica con instrumentos y actuadores usando protocolos industriales estandarizados.

```
┌──────────────────┐         ┌──────────────────────────┐
│  Software Python  │         │    DCS de la Planta      │
│  (Visión Artif.) │         │  (Honeywell / Siemens /  │
│                  │         │   ABB / Rockwell)        │
│  Detecta fuga    │──────►  │  Recibe señal de alarma  │
│                  │ OPC-UA  │  Ejecuta respuesta:      │
│  cv2.contour()   │ / MQTT  │  - Cierra válvula V-101  │
│  → alarma=True   │         │  - Activa bomba backup   │
│                  │         │  - Notifica sala control │
└──────────────────┘         └──────────────────────────┘
```

**OPC-UA** (OPC Unified Architecture) es el protocolo estándar de comunicación entre software de supervisión y sistemas de control industriales. Es el "HTTP de la industria": permite que sistemas de diferentes fabricantes hablen entre sí de forma segura.

#### Por qué este proyecto es técnicamente diferenciador

La mayoría de los sistemas de detección de fugas usan sensores de presión o flujo. Este sistema detecta la fuga *visualmente*, lo que permite:
- Detección sin contacto (sin sensor en la tubería)
- Localización espacial de la fuga (en qué punto del tramo)
- Alerta antes de que los sensores de presión detecten la caída (tiempo de respuesta menor)

---

### 3.2 Instrumentación y Control Industrial

#### Contexto del proyecto

Calibración, configuración y mantenimiento de sensores y actuadores en una planta de procesos mineros para garantizar la continuidad operativa.

#### Teoría: El rol de la calibración en la continuidad operativa

Un **instrumento de medición** convierte una variable física (temperatura, presión, nivel, flujo) en una señal eléctrica estándar que el sistema de control puede procesar.

La señal estándar más común en la industria es el lazo de corriente **4-20 mA**:

```
Variable física           Señal eléctrica
──────────────            ────────────────
0%  del rango     ───►    4 mA  (mínimo)
25% del rango     ───►    8 mA
50% del rango     ───►    12 mA
75% del rango     ───►    16 mA
100% del rango    ───►    20 mA
```

**¿Por qué empieza en 4 mA y no en 0?** Para detectar fallas. Si la señal cae a 0 mA, el sistema sabe que hay un cable cortado o un sensor fallado, no que la variable llegó a cero. Esto es **"fail-safe by design"** — un principio de ingeniería que este portafolio también aplica.

#### El costo de un instrumento fuera de calibración

```
Variable real: Nivel del estanque = 75%
Instrumento descalibrado: Reporta 60%

Consecuencia en el PLC/DCS:
  IF nivel < 65% THEN activar_bomba_llenado()

Resultado:
  - Bomba activa cuando no debería → sobrellenado
  - Derrame → contaminación → multa regulatoria
  - Parada de planta → pérdida estimada: $50,000/hora en minería
```

La calibración periódica con patrones trazables (NIST, SAC) garantiza que la señal eléctrica refleje fielmente la variable física, manteniendo el lazo de control dentro de sus tolerancias de diseño.

#### Instrumentos típicos en planta minera y sus variables

| Instrumento | Variable | Protocolo | Rango típico |
|---|---|---|---|
| Transmisor de presión | Presión de proceso | 4-20 mA / HART | 0-600 PSI |
| Transmisor de nivel | Nivel en estanques | 4-20 mA / Profibus | 0-10 m |
| Caudalímetro electromagnético | Flujo de pulpa | HART / Modbus | 0-500 m³/h |
| Termopar tipo K | Temperatura | 4-20 mA | -200 a 1260°C |
| Válvula de control | Posición (actuador) | 4-20 mA | 0-100% apertura |

---

### 3.3 Sistemas UPS Industriales

#### Contexto del proyecto

Diagnóstico preventivo y correctivo de sistemas UPS de gran escala para garantizar el suministro eléctrico ininterrumpido de equipos de control en entornos mineros.

#### Teoría: Anatomía de un UPS industrial

Un UPS (Uninterruptible Power Supply) opera bajo el principio de **doble conversión** en sistemas de alta criticidad:

```
Red AC (220V/380V)
      │
      ▼
┌─────────────┐    AC → DC     ┌──────────────┐
│   Rectificador│ ──────────►  │ Banco de      │
│   (Charger)   │             │ Baterías      │
└─────────────┘               └──────┬───────┘
                                     │
                              DC siempre disponible
                                     │
                                     ▼
                              ┌─────────────┐    DC → AC    ┌──────────────┐
                              │   Inversor   │ ──────────►  │ Cargas       │
                              │   (UPS out)  │             │ Críticas     │
                              └─────────────┘             │ (PLCs, DCS,  │
                                                          │  Servers)    │
                                                          └──────────────┘
```

En la doble conversión, la carga **nunca ve la red directamente**: siempre es alimentada por el inversor. Cuando la red falla, las baterías continúan alimentando el inversor sin interrupción (tiempo de conmutación = 0 ms).

#### Diagnóstico del banco de baterías

La degradación de las baterías de plomo-ácido (VRLA) es el punto de falla más común en UPS industriales:

| Prueba diagnóstica | Qué revela | Criterio de rechazo |
|---|---|---|
| Medición de tensión en circuito abierto | Carga de la celda | < 12.5V en batería 12V |
| Prueba de descarga controlada | Capacidad real vs nominal | < 80% de capacidad nominal |
| Medición de impedancia interna | Degradación química interna | > 150% del valor base |
| Temperatura de superficie (termografía) | Celda en cortocircuito interno | ΔT > 3°C respecto a vecinas |

#### Autonomía — el cálculo crítico

```
Autonomía (horas) = Capacidad del banco (Ah) × Eficiencia del inversor
                    ─────────────────────────────────────────────────────
                    Potencia de la carga (W) / Tensión DC del bus

Ejemplo:
  Banco: 200 Ah × 48V DC
  Carga: 10 kW
  Eficiencia inversor: 95%

  Autonomía = (200 × 48 × 0.95) / 10,000 = 0.912 horas ≈ 54 minutos
```

Un banco degradado puede tener solo el 60% de su capacidad nominal, reduciendo 54 minutos a 32 minutos — diferencia crítica si el proceso de apagado controlado requiere 45 minutos.

---

### 3.4 Sistemas Fotovoltaicos

#### Contexto del proyecto

Dimensionamiento de arreglos solares, selección de componentes y supervisión de montaje para instalaciones en entornos remotos.

#### Teoría: El proceso de dimensionamiento energético

El dimensionamiento de un sistema fotovoltaico sigue un proceso de ingeniería estructurado en 5 pasos:

**Paso 1: Inventario de cargas**

```
Carga               Potencia    Horas/día   Consumo diario
──────────────────  ─────────   ─────────   ──────────────
Iluminación LED     5 × 18W     6h          540 Wh
Bomba de agua       750W        2h          1,500 Wh
Router WiFi         15W         24h         360 Wh
Laptop              65W         8h          520 Wh
─────────────────────────────────────────────────────────
TOTAL                                       2,920 Wh/día
```

**Paso 2: Irradiación solar del sitio**

La irradiación se mide en **HSP (Horas Solar Pico)** — la cantidad de horas al día con irradiación equivalente a 1,000 W/m². Se obtiene de bases de datos como NASA POWER o PVGIS.

Ejemplo Norte de Chile (Antofagasta): **6.5 HSP/día** (una de las zonas con mayor irradiación del mundo).

**Paso 3: Dimensionamiento del arreglo de paneles**

```
Potencia pico necesaria = Consumo diario / (HSP × Eficiencia sistema)

Eficiencia sistema = Inversor × Cableado × Panel = 0.96 × 0.98 × 0.80 = 0.75

Potencia pico = 2,920 Wh / (6.5 × 0.75) = 599 Wp

→ Selección: 2 paneles de 330 Wp = 660 Wp (con margen del 10%)
```

**Paso 4: Dimensionamiento del banco de baterías**

```
Autonomía requerida: 2 días sin sol (criterio de diseño)
Profundidad de descarga (DoD): 50% (para baterías plomo-ácido)

Capacidad (Ah) = (Consumo diario × Días autonomía) / (Tensión banco × DoD)
              = (2,920 × 2) / (48V × 0.5)
              = 5,840 / 24
              = 243 Ah

→ Selección: Banco de 250 Ah / 48V (baterías de gel VRLA)
```

**Paso 5: Selección del inversor/cargador**

```
Potencia inversor ≥ Potencia pico simultánea de cargas × 1.25 (factor de seguridad)
                 ≥ 750W (bomba) + 65W (laptop) + 33W (otros) = 848W × 1.25
                 ≥ 1,060 W

→ Selección: Inversor/cargador 1,500W / 48V (próxima potencia comercial estándar)
```

---

## 4. Internacionalización (i18n) — Switch ES / EN

### 4.1 Qué es i18n y por qué importa

**i18n** es la abreviatura estándar de *internationalization* (hay 18 letras entre la "i" y la "n"). Se refiere al proceso de diseñar una aplicación para que pueda adaptarse a múltiples idiomas sin cambiar el código fuente.

Para un portafolio de ingeniería, tener soporte bilingüe ES/EN es estratégico:

| Audiencia | Idioma | Contexto |
|---|---|---|
| Empresas chilenas / latinas | Español | Minería, industria local |
| Multinacionales con presencia en Chile | Inglés | BHP, Anglo American, SQM |
| Reclutadores de LinkedIn internacionales | Inglés | Búsquedas globales |
| Startups tech | Inglés | Comunicación interna en inglés |

---

### 4.2 Arquitectura de la solución

Se eligió **Context API de React** sobre librerías externas (next-intl, i18next) por una razón de proporcionalidad: para un portafolio de una sola página, agregar una librería de 50KB es sobreingeniería. El Context API de React es suficiente y no añade ninguna dependencia.

```
lib/translations.ts          ← Base de datos de textos ES y EN
        │
        ▼
contexts/LanguageContext.tsx  ← Estado global del idioma seleccionado
        │
        ├── components/ui/NavBar.tsx      ← Toggle ES | EN visible
        ├── components/sections/Hero.tsx
        ├── components/sections/About.tsx
        ├── components/sections/Projects.tsx  ← también lee data/projects.ts
        ├── components/sections/Skills.tsx    ← también lee data/skills.ts
        └── components/sections/Contact.tsx
```

Los datos de proyectos y habilidades también son bilingües. El tipo `BilingualText` garantiza que ambas versiones existan:

```typescript
// data/projects.ts
export type BilingualText = { es: string; en: string }

export type Project = {
  title: string          // mismo en ambos idiomas
  subtitle: BilingualText
  description: BilingualText
  achievement: BilingualText
  // ...
}
```

En el componente, se accede a la versión correcta mediante el `lang` del contexto:

```tsx
// components/sections/Projects.tsx
const { lang, t } = useLanguage()

// ...
<p>{project.description[lang]}</p>   // → "Solución de software..." o "Desktop software..."
<p>{project.achievement[lang]}</p>
```

---

### 4.3 El patrón Context API explicado

El **Context API** de React resuelve el problema de *prop drilling*: pasar datos a través de muchos niveles de componentes.

**Sin Context (prop drilling):**

```
layout.tsx (tiene el idioma)
  └── page.tsx           ← recibe lang como prop
        └── Hero.tsx     ← recibe lang como prop
              └── Badge  ← recibe lang como prop (solo para mostrar un texto)
```

Cada componente intermedio tiene que recibir y re-pasar `lang` aunque no lo use. Esto escala muy mal.

**Con Context:**

```
layout.tsx
  └── LanguageProvider   ← guarda el estado del idioma
        ├── NavBar.tsx   ← const { lang } = useLanguage() ✅
        ├── Hero.tsx     ← const { t } = useLanguage()    ✅
        ├── About.tsx    ← const { t } = useLanguage()    ✅
        └── ...          ← cualquier componente accede directamente
```

La implementación tiene tres partes:

**1. El estado global (`contexts/LanguageContext.tsx`)**

```typescript
'use client'

import { createContext, useContext, useState } from 'react'
import { translations, type Lang, type Translations } from '@/lib/translations'

type LanguageContextType = {
  lang: Lang           // 'es' | 'en'
  setLang: (l: Lang) => void
  t: Translations      // el objeto completo de textos del idioma activo
}

// Valor por defecto (solo se usa si el componente está fuera del Provider)
const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
})

// El Provider envuelve toda la app en layout.tsx
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState<Lang>('es')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// El hook que usan los componentes
export const useLanguage = () => useContext(LanguageContext)
```

**2. El toggle en la barra de navegación (`NavBar.tsx`)**

```tsx
const { lang, setLang, t } = useLanguage()

<div className="flex items-center gap-0.5">
  <button
    onClick={() => setLang('es')}
    className={lang === 'es' ? 'text-sky-500' : 'text-slate-400'}
  >
    ES
  </button>
  <span>|</span>
  <button
    onClick={() => setLang('en')}
    className={lang === 'en' ? 'text-sky-500' : 'text-slate-400'}
  >
    EN
  </button>
</div>
```

Cuando el usuario hace click en "EN":
1. `setLang('en')` actualiza el estado en `LanguageProvider`
2. React re-renderiza todos los componentes que consumen el contexto
3. Cada componente recibe `t = translations['en']` y muestra el texto en inglés
4. Todo ocurre **sin recargar la página** (React gestiona el DOM)

**3. El tipado en `lib/translations.ts`**

```typescript
// Se define primero la forma que deben tener las traducciones
export type Translations = {
  nav: { home: string; about: string; ... }
  hero: { badge: string; role: string; ... }
  // ...
}

// Luego el objeto se tipea explícitamente
export const translations: Record<Lang, Translations> = {
  es: { ... },
  en: { ... },
}
```

El tipo `Record<Lang, Translations>` obliga a TypeScript a verificar que **tanto `es` como `en` cumplan exactamente la misma estructura**. Si agregas una clave en español y olvidas agregarla en inglés, TypeScript lanza un error antes de compilar.

---

### 4.4 Cómo agregar un nuevo idioma

Si en el futuro quisieras agregar portugués (Brasil) para expandir a ese mercado:

**Paso 1:** Agregar `'pt'` al tipo `Lang`

```typescript
// lib/translations.ts
export type Lang = 'es' | 'en' | 'pt'
```

**Paso 2:** Agregar el objeto de traducciones

```typescript
export const translations: Record<Lang, Translations> = {
  es: { ... },  // existente
  en: { ... },  // existente
  pt: {         // nuevo
    nav: { home: 'Início', about: 'Sobre mim', projects: 'Projetos', ... },
    hero: { badge: 'Disponível para novos projetos', ... },
    // TypeScript te obliga a completar TODOS los campos
  },
}
```

**Paso 3:** Agregar el botón en el NavBar

```tsx
<button onClick={() => setLang('pt')} className={lang === 'pt' ? 'text-sky-500' : 'text-slate-400'}>
  PT
</button>
```

**Paso 4:** Agregar campos `pt` en `data/projects.ts` y `data/skills.ts`

TypeScript marcará en rojo cualquier campo faltante, actuando como guía automática del proceso.

---

## 5. Guía de Mantenimiento

### 4.1 El ciclo git push → deploy automático

Cuando desarrollas una nueva funcionalidad o corriges un error, el flujo es:

```bash
# 1. Modificas un archivo (ej: actualizas un proyecto en data/projects.ts)

# 2. Verificas qué cambió
git status
git diff

# 3. Añades los cambios al área de staging (preparación)
git add data/projects.ts
# o para añadir todo:
git add .

# 4. Creas un commit con mensaje descriptivo
git commit -m "feat: agrega nuevo proyecto de automatización con MQTT"

# 5. Subes el commit a GitHub
git push

# ← En este momento Vercel recibe un webhook y empieza el deploy automático
# ← En ~45 segundos tu sitio en producción refleja el cambio
```

#### Anatomía de un buen mensaje de commit

Los commits son la historia de tu proyecto. Usar el estándar **Conventional Commits** comunica intención:

```
feat: nueva funcionalidad
fix: corrección de bug
style: cambios de diseño sin lógica
docs: cambios en documentación
refactor: restructuración sin cambio de funcionalidad
chore: mantenimiento (actualizar dependencias, etc.)
```

Ejemplos aplicados a este portafolio:

```bash
git commit -m "feat: añade sección de certificaciones"
git commit -m "fix: corrige link roto en botón descargar CV"
git commit -m "style: ajusta paleta de colores del Hero a modo light"
git commit -m "docs: actualiza descripción del proyecto fotovoltaico"
```

---

### 4.2 Variables de entorno y el archivo .env

#### Qué es una variable de entorno

Imagina que tu portafolio más adelante integra un formulario de contacto que usa un servicio de email (como EmailJS o Resend). Para usar ese servicio necesitas una **API key** — una contraseña secreta que identifica tu cuenta.

**Error crítico de principiante:**

```typescript
// ❌ NUNCA hagas esto — la API key queda visible en GitHub
const response = await fetch('https://api.emailservice.com/send', {
  headers: {
    'Authorization': 'Bearer sk_live_mi_api_key_super_secreta_12345'
  }
})
```

Cuando haces `git push`, este código (con la API key) sube a GitHub. Si el repositorio es público, cualquier persona puede ver y usar tu key. Si es privado, igualmente es mala práctica.

**La solución: variables de entorno**

```bash
# Archivo .env.local (en la raíz del proyecto)
# Este archivo NUNCA se sube a GitHub
RESEND_API_KEY=sk_live_mi_api_key_super_secreta_12345
NEXT_PUBLIC_SITE_URL=https://tu-portafolio.vercel.app
```

```typescript
// En tu código — Next.js reemplaza esto en build time
const apiKey = process.env.RESEND_API_KEY  // ← lee del ambiente, no hardcodeado
```

#### El archivo .gitignore protege tus secretos

`create-next-app` ya creó un `.gitignore` que incluye:

```
.env
.env.local
.env.production
.env*.local
```

Estos archivos **nunca** serán subidos a GitHub, sin importar cuántas veces hagas `git add .`.

#### Variables en Vercel

Para que tu app en producción tenga acceso a las variables:

1. Ve a tu proyecto en Vercel → **Settings → Environment Variables**
2. Agrega `RESEND_API_KEY` con su valor
3. Selecciona en qué ambiente aplicar (Production, Preview, Development)
4. Vercel inyecta la variable de forma segura durante el build

#### Prefijo NEXT_PUBLIC_

```bash
# Variable privada (solo disponible en el servidor)
DATABASE_URL=postgresql://user:pass@host/db

# Variable pública (disponible también en el navegador del cliente)
NEXT_PUBLIC_SITE_URL=https://tu-portafolio.vercel.app
```

**Regla de oro:** Si el valor es un secreto (API key, contraseña, token), NUNCA uses `NEXT_PUBLIC_`. Si lo haces, el valor queda expuesto en el JavaScript que descarga el usuario.

---

### 4.3 Comandos de referencia rápida

| Comando | Dónde ejecutar | Qué hace |
|---|---|---|
| `npm run dev` | Local | Inicia servidor de desarrollo en `localhost:3000` |
| `npm run build` | Local | Genera build de producción (verifica errores) |
| `npm run lint` | Local | Revisa el código con ESLint |
| `git status` | Local | Muestra archivos modificados sin commitear |
| `git diff` | Local | Muestra exactamente qué cambió en cada archivo |
| `git add .` | Local | Añade todos los cambios al staging |
| `git commit -m "msg"` | Local | Crea un punto de guardado con descripción |
| `git push` | Local | Sube commits a GitHub → activa deploy en Vercel |
| `git pull` | Local | Baja cambios de GitHub a tu máquina |
| `git log --oneline` | Local | Muestra historial de commits resumido |

---

## 6. Glosario de Términos

### Framework

Un **framework** es un conjunto de herramientas, convenciones y código base que impone una estructura para construir aplicaciones. A diferencia de una *library* (que ofreces donde y cuando quieres), un framework define cómo debes organizar tu código.

**Analogía industrial:** React es una herramienta (un multímetro). Next.js es el kit completo de instrumentación (multímetro + pinzas amperimétricas + analizador de redes + maleta organizada con protocolos de uso).

En este proyecto: Next.js es el framework que organiza cómo se crean las rutas, cómo se renderizan los componentes y cómo se optimizan las imágenes.

---

### Componente

Un **componente** es una unidad reutilizable e independiente de interfaz de usuario. Combina estructura (HTML), estilo (CSS) y lógica (JavaScript) en un solo archivo.

```tsx
// Un componente en React/Next.js
export default function ProjectCard({ title, description }: Props) {
  return (
    <div className="p-6 rounded-xl border">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

// Reutilizable infinitas veces con distintos datos
<ProjectCard title="Visión Artificial" description="..." />
<ProjectCard title="Sistema Fotovoltaico" description="..." />
```

**Analogía industrial:** Un componente es como un módulo de instrumentación HART estándar. Mismo diseño físico, misma interfaz eléctrica, pero configurado con distintos parámetros (tag, rango, unidad) según la aplicación.

---

### Hook

Un **hook** es una función especial de React que permite añadir estado y comportamiento a componentes funcionales. Su nombre siempre comienza con `use`.

```typescript
// useState — añade memoria al componente
const [isOpen, setIsOpen] = useState(false)

// useEffect — ejecuta código en respuesta a cambios
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// useRef — referencia a un elemento del DOM
const ref = useRef(null)

// useInView (Framer Motion) — detecta si un elemento está en la pantalla
const isInView = useInView(ref, { once: true })
```

**Analogía industrial:** Un hook es como un bloque de función en un PLC. `useState` es análogo a un registro interno (memoria de estado). `useEffect` es análogo a un bloque de interrupción por evento.

---

### Deployment

**Deploy** (despliegue) es el proceso de tomar el código de tu máquina local y publicarlo en un servidor accesible por Internet.

El flujo en este proyecto:

```
Código en tu PC  →  GitHub  →  Vercel (build + deploy)  →  URL pública
(desarrollo)         (repo)      (infraestructura cloud)     (producción)
```

Hay diferentes tipos de deploy:

- **Deploy manual:** Copias archivos a un servidor vía FTP. Lento, propenso a errores. Práctica obsoleta.
- **Deploy automático (CI/CD):** Cada `git push` activa un pipeline automático. Estándar de la industria actual.
- **Deploy atómico (Vercel):** Si el build falla, la versión anterior sigue activa. El usuario nunca ve una versión rota.

---

### Repository (Repositorio)

Un **repositorio** (o "repo") es una carpeta de proyecto gestionada por Git. Registra el historial completo de todos los cambios realizados al código a lo largo del tiempo.

```
Repositorio = Todos los archivos del proyecto + Historial de commits

Cada commit = Snapshot (fotografía) del código en un momento dado
```

**Analogía industrial:** Un repositorio es como el libro de registro de mantenimiento de un instrumento, pero para código. Cada entrada (commit) dice: quién hizo el cambio, qué se cambió y por qué.

El repositorio vive simultáneamente en dos lugares:

- **Repositorio local:** En tu máquina (`portafolio-web/`)
- **Repositorio remoto:** En GitHub (en la nube, respaldado)

---

### Prop

Una **prop** (abreviatura de *property* — propiedad) es un dato que un componente padre pasa a un componente hijo para parametrizarlo.

```tsx
// El componente hijo recibe props
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`px-3 py-1 rounded-full bg-${color}-100 text-${color}-700`}>
      {label}
    </span>
  )
}

// El componente padre envía props — como argumentos de función
<Badge label="Python" color="sky" />
<Badge label="OpenCV" color="green" />
<Badge label="DCS" color="amber" />
```

Las props son **de solo lectura** — un componente hijo no puede modificar sus propias props. Si necesita comunicar algo hacia arriba, usa callbacks (funciones pasadas como props).

**Analogía industrial:** Las props son como los parámetros de configuración de un transmisor HART. El configurador (padre) define el rango, la unidad y el tag. El transmisor (hijo) opera con esos parámetros pero no los puede cambiar por sí mismo.

---

*Fin de la documentación — Versión 1.0*  
*Este documento debe actualizarse cada vez que se incorporen nuevas tecnologías o proyectos al portafolio.*
