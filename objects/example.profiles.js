"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleProfiles = exports.PaymentQuotaStatus = void 0;
var PaymentQuotaStatus;
(function (PaymentQuotaStatus) {
    PaymentQuotaStatus["PENDING"] = "Pendiente";
    PaymentQuotaStatus["PARTIALLY_PAID"] = "Parcialmente Pagada";
    PaymentQuotaStatus["COMPLETE"] = "Completa";
})(PaymentQuotaStatus || (exports.PaymentQuotaStatus = PaymentQuotaStatus = {}));
exports.ExampleProfiles = [
    {
        name: "Lucas",
        age: 23,
        phone: '+549351223344',
        career: "Ingenieria Informatica",
        status: "Activo",
        payments: [
            {
                sequence: 1,
                due_date: "2024-06-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 2,
                due_date: "2024-07-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 3,
                due_date: "2024-08-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 4,
                due_date: "2024-09-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 5,
                due_date: "2024-10-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 6,
                due_date: "2024-11-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 7,
                due_date: "2024-12-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 8,
                due_date: "2025-01-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 9,
                due_date: "2025-02-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 10,
                due_date: "2025-03-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 11,
                due_date: "2025-04-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 12,
                due_date: "2025-05-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
        ],
    },
    {
        name: "Jeronimo",
        age: 23,
        phone: '+52155667788',
        career: "Licenciatura en Administracion",
        status: "Activo",
        payments: [
            {
                sequence: 1,
                due_date: "2024-06-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 2,
                due_date: "2024-07-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 3,
                due_date: "2024-08-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 4,
                due_date: "2024-09-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 5,
                due_date: "2024-10-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 6,
                due_date: "2024-11-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 7,
                due_date: "2024-12-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 8,
                due_date: "2025-01-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 9,
                due_date: "2025-02-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 10,
                due_date: "2025-03-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 11,
                due_date: "2025-04-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 12,
                due_date: "2025-05-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
        ],
    },
    {
        name: "Franco",
        age: 23,
        phone: '+549113223322',
        career: "Certificacion en Marketing Digital",
        status: "Ingresante",
        payments: [
            {
                sequence: 1,
                due_date: "2024-06-15",
                amount: 85,
                status: PaymentQuotaStatus.COMPLETE,
            },
            {
                sequence: 2,
                due_date: "2024-07-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 3,
                due_date: "2024-08-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 4,
                due_date: "2024-09-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 5,
                due_date: "2024-10-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 6,
                due_date: "2024-11-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 7,
                due_date: "2024-12-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 8,
                due_date: "2025-01-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 9,
                due_date: "2025-02-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 10,
                due_date: "2025-03-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 11,
                due_date: "2025-04-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
            {
                sequence: 12,
                due_date: "2025-05-15",
                amount: 85,
                status: PaymentQuotaStatus.PENDING,
            },
        ],
    },
];
