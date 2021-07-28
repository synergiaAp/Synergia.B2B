var OfferStatus;
(function (OfferStatus) {
    OfferStatus[OfferStatus["Draft"] = 0] = "Draft";
    OfferStatus[OfferStatus["Finished"] = 1] = "Finished";
    OfferStatus[OfferStatus["Ordered"] = 2] = "Ordered";
})(OfferStatus || (OfferStatus = {}));
var MonthlyReportStatus;
(function (MonthlyReportStatus) {
    MonthlyReportStatus[MonthlyReportStatus["Draft"] = 0] = "Draft";
    MonthlyReportStatus[MonthlyReportStatus["Submitted"] = 1] = "Submitted";
})(MonthlyReportStatus || (MonthlyReportStatus = {}));
var WeeklyPlanStatus;
(function (WeeklyPlanStatus) {
    WeeklyPlanStatus[WeeklyPlanStatus["Draft"] = 0] = "Draft";
    WeeklyPlanStatus[WeeklyPlanStatus["Submitted"] = 1] = "Submitted";
})(WeeklyPlanStatus || (WeeklyPlanStatus = {}));
var CampaignStatus;
(function (CampaignStatus) {
    CampaignStatus[CampaignStatus["Pending"] = 1] = "Pending";
    CampaignStatus[CampaignStatus["Sent"] = 2] = "Sent";
})(CampaignStatus || (CampaignStatus = {}));
var HoodOfferStatus;
(function (HoodOfferStatus) {
    HoodOfferStatus[HoodOfferStatus["New"] = 0] = "New";
    HoodOfferStatus[HoodOfferStatus["Draft"] = 1] = "Draft";
    HoodOfferStatus[HoodOfferStatus["Finished"] = 2] = "Finished";
    HoodOfferStatus[HoodOfferStatus["Imported"] = 3] = "Imported";
    HoodOfferStatus[HoodOfferStatus["Offered"] = 4] = "Offered";
})(HoodOfferStatus || (HoodOfferStatus = {}));
var HoodOfferAccessoryType;
(function (HoodOfferAccessoryType) {
    HoodOfferAccessoryType[HoodOfferAccessoryType["Ventilator"] = 1] = "Ventilator";
    HoodOfferAccessoryType[HoodOfferAccessoryType["Smoki"] = 2] = "Smoki";
    HoodOfferAccessoryType[HoodOfferAccessoryType["Ansul"] = 3] = "Ansul";
})(HoodOfferAccessoryType || (HoodOfferAccessoryType = {}));
var HoodFinalOfferElementType;
(function (HoodFinalOfferElementType) {
    HoodFinalOfferElementType[HoodFinalOfferElementType["Hood"] = 1] = "Hood";
    HoodFinalOfferElementType[HoodFinalOfferElementType["HoodAccessoryVentilator"] = 2] = "HoodAccessoryVentilator";
    HoodFinalOfferElementType[HoodFinalOfferElementType["HoodAccessorySmoki"] = 3] = "HoodAccessorySmoki";
    HoodFinalOfferElementType[HoodFinalOfferElementType["HoodAccessoryAnsul"] = 4] = "HoodAccessoryAnsul";
    HoodFinalOfferElementType[HoodFinalOfferElementType["Other"] = 5] = "Other";
})(HoodFinalOfferElementType || (HoodFinalOfferElementType = {}));
var OfferDeliveryType;
(function (OfferDeliveryType) {
    OfferDeliveryType[OfferDeliveryType["NoDelivery"] = 1] = "NoDelivery";
    OfferDeliveryType[OfferDeliveryType["WithDelivery"] = 2] = "WithDelivery";
})(OfferDeliveryType || (OfferDeliveryType = {}));
//# sourceMappingURL=Enums.js.map