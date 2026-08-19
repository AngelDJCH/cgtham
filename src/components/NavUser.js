import { useNavigate } from 'react-router-dom'
import '../styles/navuser.css'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'

export default function NavUser(props) {

    const navigate = useNavigate()

    const img_perfil = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdXNlci1pY29uIGx1Y2lkZS11c2VyIj48cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg=='
    const img_mensajes = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbWVzc2FnZXMtc3F1YXJlLWljb24gbHVjaWRlLW1lc3NhZ2VzLXNxdWFyZSI+PHBhdGggZD0iTTE2IDEwYTIgMiAwIDAgMS0yIDJINi44MjhhMiAyIDAgMCAwLTEuNDE0LjU4NmwtMi4yMDIgMi4yMDJBLjcxLjcxIDAgMCAxIDIgMTQuMjg2VjRhMiAyIDAgMCAxIDItMmgxMGEyIDIgMCAwIDEgMiAyeiIvPjxwYXRoIGQ9Ik0yMCA5YTIgMiAwIDAgMSAyIDJ2MTAuMjg2YS43MS43MSAwIDAgMS0xLjIxMi41MDJsLTIuMjAyLTIuMjAyQTIgMiAwIDAgMCAxNy4xNzIgMTlIMTBhMiAyIDAgMCAxLTItMnYtMSIvPjwvc3ZnPg=='
    const img_inscripciones = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbm90ZWJvb2stcGVuLWljb24gbHVjaWRlLW5vdGVib29rLXBlbiI+PHBhdGggZD0iTTEzLjQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0ydi03LjQiLz48cGF0aCBkPSJNMiA2aDQiLz48cGF0aCBkPSJNMiAxMGg0Ii8+PHBhdGggZD0iTTIgMTRoNCIvPjxwYXRoIGQ9Ik0yIDE4aDQiLz48cGF0aCBkPSJNMjEuMzc4IDUuNjI2YTEgMSAwIDEgMC0zLjAwNC0zLjAwNGwtNS4wMSA1LjAxMmEyIDIgMCAwIDAtLjUwNi44NTRsLS44MzcgMi44N2EuNS41IDAgMCAwIC42Mi42MmwyLjg3LS44MzdhMiAyIDAgMCAwIC44NTQtLjUwNnoiLz48L3N2Zz4='
    const img_eventos = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtY2FsZW5kYXItY2xvY2staWNvbiBsdWNpZGUtY2FsZW5kYXItY2xvY2siPjxwYXRoIGQ9Ik0xNiAxNHYyLjJsMS42IDEiLz48cGF0aCBkPSJNMTYgMnY0Ii8+PHBhdGggZD0iTTIxIDcuNVY2YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMy41Ii8+PHBhdGggZD0iTTMgMTBoNSIvPjxwYXRoIGQ9Ik04IDJ2NCIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiLz48L3N2Zz4='
    const img_ofertas_laborales = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnJpZWZjYXNlLWJ1c2luZXNzLWljb24gbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcyI+PHBhdGggZD0iTTEyIDEyaC4wMSIvPjxwYXRoIGQ9Ik0xNiA2VjRhMiAyIDAgMCAwLTItMmgtNGEyIDIgMCAwIDAtMiAydjIiLz48cGF0aCBkPSJNMjIgMTNhMTguMTUgMTguMTUgMCAwIDEtMjAgMCIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgeD0iMiIgeT0iNiIgcng9IjIiLz48L3N2Zz4='
    const img_postulaciones = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtZm9sZGVyLWthbmJhbi1pY29uIGx1Y2lkZS1mb2xkZXIta2FuYmFuIj48cGF0aCBkPSJNNCAyMGgxNmEyIDIgMCAwIDAgMi0yVjhhMiAyIDAgMCAwLTItMmgtNy45M2EyIDIgMCAwIDEtMS42Ni0uOWwtLjgyLTEuMkEyIDIgMCAwIDAgNy45MyAzSDRhMiAyIDAgMCAwLTIgMnYxM2MwIDEuMS45IDIgMiAyWiIvPjxwYXRoIGQ9Ik04IDEwdjQiLz48cGF0aCBkPSJNMTIgMTB2MiIvPjxwYXRoIGQ9Ik0xNiAxMHY2Ii8+PC9zdmc+'
    const img_comentarios = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbWVzc2FnZS1jaXJjbGUtaWNvbiBsdWNpZGUtbWVzc2FnZS1jaXJjbGUiPjxwYXRoIGQ9Ik0yLjk5MiAxNi4zNDJhMiAyIDAgMCAxIC4wOTQgMS4xNjdsLTEuMDY1IDMuMjlhMSAxIDAgMCAwIDEuMjM2IDEuMTY4bDMuNDEzLS45OThhMiAyIDAgMCAxIDEuMDk5LjA5MiAxMCAxMCAwIDEgMC00Ljc3Ny00LjcxOSIvPjwvc3ZnPg=='
    const img_convenios = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtaGFuZHNoYWtlLWljb24gbHVjaWRlLWhhbmRzaGFrZSI+PHBhdGggZD0ibTExIDE3IDIgMmExIDEgMCAxIDAgMy0zIi8+PHBhdGggZD0ibTE0IDE0IDIuNSAyLjVhMSAxIDAgMSAwIDMtM2wtMy44OC0zLjg4YTMgMyAwIDAgMC00LjI0IDBsLS44OC44OGExIDEgMCAxIDEtMy0zbDIuODEtMi44MWE1Ljc5IDUuNzkgMCAwIDEgNy4wNi0uODdsLjQ3LjI4YTIgMiAwIDAgMCAxLjQyLjI1TDIxIDQiLz48cGF0aCBkPSJtMjEgMyAxIDExaC0yIi8+PHBhdGggZD0iTTMgMyAyIDE0bDYuNSA2LjVhMSAxIDAgMSAwIDMtMyIvPjxwYXRoIGQ9Ik0zIDRoOCIvPjwvc3ZnPg=='
    const img_usuarios = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdXNlcnMtaWNvbiBsdWNpZGUtdXNlcnMiPjxwYXRoIGQ9Ik0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyIi8+PHBhdGggZD0iTTE2IDMuMTI4YTQgNCAwIDAgMSAwIDcuNzQ0Ii8+PHBhdGggZD0iTTIyIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciLz48Y2lyY2xlIGN4PSI5IiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg=='
    const img_organizaciones = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnVpbGRpbmcyLWljb24gbHVjaWRlLWJ1aWxkaW5nLTIiPjxwYXRoIGQ9Ik0xMCAxMmg0Ii8+PHBhdGggZD0iTTEwIDhoNCIvPjxwYXRoIGQ9Ik0xNCAyMXYtM2EyIDIgMCAwIDAtNCAwdjMiLz48cGF0aCBkPSJNNiAxMEg0YTIgMiAwIDAgMC0yIDJ2N2EyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yaC0yIi8+PHBhdGggZD0iTTYgMjFWNWEyIDIgMCAwIDEgMi0yaDhhMiAyIDAgMCAxIDIgMnYxNiIvPjwvc3ZnPg=='
    const img_historicos = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYWxidW0taWNvbiBsdWNpZGUtYWxidW0iPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PHBvbHlsaW5lIHBvaW50cz0iMTEgMyAxMSAxMSAxNCA4IDE3IDExIDE3IDMiLz48L3N2Zz4='
    const img_organizacion = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnVpbGRpbmctaWNvbiBsdWNpZGUtYnVpbGRpbmciPjxwYXRoIGQ9Ik0xMiAxMGguMDEiLz48cGF0aCBkPSJNMTIgMTRoLjAxIi8+PHBhdGggZD0iTTEyIDZoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48cGF0aCBkPSJNMTYgNmguMDEiLz48cGF0aCBkPSJNOCAxMGguMDEiLz48cGF0aCBkPSJNOCAxNGguMDEiLz48cGF0aCBkPSJNOCA2aC4wMSIvPjxwYXRoIGQ9Ik05IDIydi0zYTEgMSAwIDAgMSAxLTFoNGExIDEgMCAwIDEgMSAxdjMiLz48cmVjdCB4PSI0IiB5PSIyIiB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PC9zdmc+'
    const img_configuracion = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc2V0dGluZ3MtaWNvbiBsdWNpZGUtc2V0dGluZ3MiPjxwYXRoIGQ9Ik05LjY3MSA0LjEzNmEyLjM0IDIuMzQgMCAwIDEgNC42NTkgMCAyLjM0IDIuMzQgMCAwIDAgMy4zMTkgMS45MTUgMi4zNCAyLjM0IDAgMCAxIDIuMzMgNC4wMzMgMi4zNCAyLjM0IDAgMCAwIDAgMy44MzEgMi4zNCAyLjM0IDAgMCAxLTIuMzMgNC4wMzMgMi4zNCAyLjM0IDAgMCAwLTMuMzE5IDEuOTE1IDIuMzQgMi4zNCAwIDAgMS00LjY1OSAwIDIuMzQgMi4zNCAwIDAgMC0zLjMyLTEuOTE1IDIuMzQgMi4zNCAwIDAgMS0yLjMzLTQuMDMzIDIuMzQgMi4zNCAwIDAgMCAwLTMuODMxQTIuMzQgMi4zNCAwIDAgMSA2LjM1IDYuMDUxYTIuMzQgMi4zNCAwIDAgMCAzLjMxOS0xLjkxNSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz48L3N2Zz4='
    const img_curso = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbGlwYm9hcmQtY2xvY2staWNvbiBsdWNpZGUtY2xpcGJvYXJkLWNsb2NrIj48cGF0aCBkPSJNMTYgMTR2Mi4ybDEuNiAxIi8+PHBhdGggZD0iTTE2IDRoMmEyIDIgMCAwIDEgMiAydi44MzIiLz48cGF0aCBkPSJNOCA0SDZhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2Ii8+PHJlY3QgeD0iOCIgeT0iMiIgd2lkdGg9IjgiIGhlaWdodD0iNCIgcng9IjEiLz48L3N2Zz4='
    const img_visitas = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluLXBsdXMtaWNvbiBsdWNpZGUtbWFwLXBpbi1wbHVzIj48cGF0aCBkPSJNMTkuOTE0IDExLjEwNUE3LjI5OCA3LjI5OCAwIDAgMCAyMCAxMGE4IDggMCAwIDAtMTYgMGMwIDQuOTkzIDUuNTM5IDEwLjE5MyA3LjM5OSAxMS43OTlhMSAxIDAgMCAwIDEuMjAyIDAgMzIgMzIgMCAwIDAgLjgyNC0uNzM4Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjxwYXRoIGQ9Ik0xNiAxOGg2Ii8+PHBhdGggZD0iTTE5IDE1djYiLz48L3N2Zz4='


    const { user } = useAuth()


    return (
        <div className="navuser" style={{ left: `${props.left}` }}>
            <ul>

                <li
                    id='header_list'
                    style={{ backgroundColor: '#E3DBBB', borderRadius: '10px 10px 0px 0px', display: 'flex', justifyContent: 'center' }}
                >
                    <p><strong>OPCIONES</strong></p>
                </li>
                {
                    user.rol.includes('ADMIN_ORG') ? <li
                        onClick={(e) => {
                            console.log(user)
                            navigate(`/organizacion/${user.organizacion}`)
                        }}
                    >
                        <img src={img_organizacion} alt='Organizacion' />
                        <p>Organizacion</p>
                    </li> : null
                }
                {
                    user.tipo != 'Comité' && (
                        <li
                            onClick={() => {
                                navigate(`/mensajes`)
                            }}
                        >
                            <img alt='mensajes' src={img_mensajes} />
                            <p>Mensajes</p>
                        </li>
                    )
                }
                {
                    user.tipo != 'Escuela' && (
                        <li


                            onClick={(e) => {
                                navigate('/inscripciones')
                            }}

                        >
                            <img src={img_inscripciones} alt='Inscripciones' />
                            <p>
                                Inscripciones
                            </p>
                        </li>
                    )
                }
                <li

                    onClick={(e) => { navigate('/eventos') }}

                >
                    <img src={img_eventos} alt='Eventos' />
                    <p>Eventos</p>
                </li>
                {
                    user.tipo != 'Cámara' && (
                        <li

                            onClick={(e) => { navigate('/cursos') }}

                        >
                            <img src={img_curso} alt='Cursos' />
                            <p>Cursos</p>
                        </li>
                    )
                }
                {
                    user.tipo != 'Cámara' && (
                        <li

                            onClick={(e) => { navigate('/visitas') }}

                        >
                            <img src={img_visitas} alt='Visitas' />
                            <p>Visitas</p>
                        </li>
                    )
                }
                {
                    user.tipo != 'Cámara' && (
                        <li

                            onClick={(e) => {
                                navigate('/ofertaslaborales')
                            }}

                        >
                            <img src={img_ofertas_laborales} alt='Ofertas Laborales' />
                            <p>Ofertas Laborales</p>
                        </li>
                    )
                }
                <li

                    onClick={(e) => {
                        navigate('/comentarios')
                    }}

                >
                    <img src={img_comentarios} alt='Comentarios' />
                    <p>Comentarios</p>
                </li>
                <li

                    onClick={(e) => {
                        navigate('/convenios')
                    }}

                >
                    <img src={img_convenios} alt='Convenios' />
                    <p>Convenios</p>
                </li>
                {
                    user.rol.includes('ADMIN_SYS') ? <li

                        onClick={(e) => {
                            navigate('/organizaciones')
                        }}

                    >
                        <img src={img_organizaciones} alt='Organizaciones' />
                        <p>Organizaciones</p>
                    </li> : null
                }

                {
                    user.rol.includes('ADMIN_SYS') ? <li

                        onClick={(e) => {
                            navigate('/historicos')
                        }}

                    >
                        <img src={img_historicos} alt='Historicos' />
                        <p>Historicos</p>
                    </li> : null
                }

                {/* {
                    user.tipo.includes('Cámara de Comercio') ? <li
                        onClick={(e) => {
                            navigate('/afiliaciones')
                        }}
                    >
                        <img src={img_historicos} alt='Afiliaciones' />
                        <p>Afiliciones</p>
                    </li> : null
                } */}
            </ul>

        </div>
    )
}