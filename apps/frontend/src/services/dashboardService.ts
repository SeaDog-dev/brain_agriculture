import { api } from "./api";

import type { DashboardData } from "../types/dashbaord";

export async function getDashboardData(): Promise<DashboardData> {
    const response = await api.get<DashboardData>("/dashboard");

    return response.data;
}