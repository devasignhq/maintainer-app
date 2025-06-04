export const formatDateAndTime = (value: string) => {
	const dateTime = new Date(value);
	
    const day = String(dateTime.getDate()).padStart(2, '0'); // Ensure day is always 2 digits
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Ensure month is always 2 digits
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

	const formattedTime = dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return `${formattedDate}, ${formattedTime}`;
}

export const formatDate = (value: string) => {
    const dateTime = new Date(value);
    const day = String(dateTime.getDate()).padStart(2, '0'); // Ensure day is always 2 digits
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Ensure month is always 2 digits
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

/** ie Converts `ELAPSED_CONTRACT` to `Elapsed Contract` */
export const enumToStringConverter = (value: string) => {
	if (!value) return value;
	const splittedValues = value.split("_");

	const newValue = splittedValues.reduce((acc, value) => {
		return acc += value.slice(0, 1) + value.slice(1).toLowerCase() + " ";
	}, "")

	return newValue.trim();
}
/**
 * Formats a numeric value into a localized string representation with proper currency formatting.
 * 
 * This function takes a numeric input and converts it to a formatted string based on the specified locale.
 * It handles different numeric types and provides fallback formatting if the specified locale is invalid.
 * 
 * @param value - The numeric value to format. Can be a number, string, or bigint.
 * @param standard - The locale string (e.g., 'en-US') or array of locales for formatting.
 *                  Defaults to 'en-US' if not provided or if specified locale is invalid.
 * @param dec - The number of decimal places to show. Defaults to 2 if not specified.
 * @param noDecimals - If true, removes decimal formatting completely. If false, uses decimal places as specified by dec.
 * @returns A formatted string representation of the number. Returns "--" for null or undefined values.
 * 
 * @example
 * moneyFormat(1234.56) // Returns "1,234.56"
 * moneyFormat(1234.56, 'de-DE') // Returns "1.234,56"
 * moneyFormat(1234.56, 'en-US', 3) // Returns "1,234.560"
 * moneyFormat(1234.56, 'en-US', 2, true) // Returns "1,235"
 */
export function moneyFormat(
	value: number | string | bigint, 
	standard?: string | string[], 
	dec?: number,
	noDecimals?: boolean,
) {
	const options: Intl.NumberFormatOptions = noDecimals ? {} : {
		minimumFractionDigits: dec || 2,
		maximumFractionDigits: dec || 2,
	};
    try {
        // Use default locale if none provided or invalid
        const locale = standard || 'en-US';
        const nf = new Intl.NumberFormat(locale, options);
        return (value || value === 0) ? nf.format(Number(value)) : "--";
    } catch {
        // Fallback to basic locale if the provided one fails
        const nf = new Intl.NumberFormat('en-US', options);
        return (value || value === 0) ? nf.format(Number(value)) : "--";
    }
}

/**
 * Converts a GitHub API URL to a GitHub web URL
 * @param apiUrl - The GitHub API URL (e.g., "https://api.github.com/repos/owner/repo/issues/123")
 * @returns The corresponding GitHub web URL (e.g., "https://github.com/owner/repo/issues/123")
 */
export function convertGitHubApiUrlToWebUrlRegex(apiUrl: string): string {
    const match = apiUrl.match(/^https:\/\/api\.github\.com\/repos\/(.+)$/);
    
    if (!match) {
        return apiUrl;
    }
    
    return `https://github.com/${match[1]}`;
}