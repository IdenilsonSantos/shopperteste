type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function fetchData<T>(
  url: string,
  method: HttpMethod = "GET",
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = "An unknown error occurred.";
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message ||
          errorData.error ||
          errorData.error_description ||
          JSON.stringify(errorData);
      } catch (parseError) {
        console.warn("Failed to parse error response:", parseError);
      }
      throw errorMessage;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default fetchData;
