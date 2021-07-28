enum OfferStatus {
    Draft = 0,
    Finished = 1,
    Ordered = 2
}

enum MonthlyReportStatus {
    Draft = 0,
    Submitted = 1,
}

enum WeeklyPlanStatus {
    Draft = 0,
    Submitted = 1,
}

enum CampaignStatus {
    Pending = 1,
    Sent = 2
}

enum HoodOfferStatus {
    New = 0,
    Draft = 1,
    Finished = 2,
    Imported = 3,
    Offered = 4
}

enum HoodOfferAccessoryType {
    Ventilator = 1,
    Smoki = 2,
    Ansul = 3
}

enum HoodFinalOfferElementType {
    Hood = 1,
    HoodAccessoryVentilator = 2,
    HoodAccessorySmoki = 3,
    HoodAccessoryAnsul = 4,
    Other = 5
}

enum OfferDeliveryType {
    NoDelivery = 1,
    WithDelivery = 2
}