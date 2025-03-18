type Props = {
    url: string,
    method: "POST" | "GET" | "DELETE" | "PATCH" | "PUT",
    options?: { [key: string]: any }[]
}

export const useApi = async (url: string, method: "POST" | "GET" | "DELETE" | "PATCH" | "PUT", options?: { [key: string]: any }) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        });
        return await response.json();
    } catch (err) {
        throw new Error(err as string)
    }
}