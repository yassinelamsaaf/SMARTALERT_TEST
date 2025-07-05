import axios_instance from "@/apis/axios";
import { getToken } from "@/utils/auth";



export async function deleteOneAlert(alertId) {
    try {
        const token = getToken();
        if (!token) throw new Error("No auth token found");
        await axios_instance.delete(`/api/alerts/${alertId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { id: alertId, success: true };
    } catch (error) {
        return { id: alertId, success: false, error: error?.response?.data?.message || error.message || error };
    }
}

export async function deleteAlerts(...ids) {
    // Delete all alerts in parallel, collect results
    const results = await Promise.all(ids.map(id => deleteOneAlert(id)));
    const successes = results.filter(r => r.success).map(r => r.id);
    const errors = results.filter(r => !r.success).map(r => ({ id: r.id, error: r.error }));
    return { successes, errors };
}