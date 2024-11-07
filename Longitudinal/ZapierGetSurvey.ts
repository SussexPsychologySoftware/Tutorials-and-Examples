export async function checkSurveyCompletion({ surveyId, email }: { surveyId: string, email: string }): Promise<{ result: string }> {
  // Define the base URL for the API
  const baseUrl = 'https://yul1.qualtrics.com/API/v3';

  // Construct the full URL with the surveyId path parameter
  const url = `${baseUrl}/surveys/${surveyId}`;

  // Make the API request using fetchWithZapier
  const response = await fetchWithZapier(url);

  // Use throwErrorIfNotOk to handle any non-OK responses
  await response.throwErrorIfNotOk();

  // Parse the JSON response
  const data = await response.json();

  // Check if the survey has responses
  const responses = data.result.responses || [];

  // Check if any response is associated with the given email
  const hasCompleted = responses.some((response: any) => response.email === email);

  // Return 'yes' if the person with the given email has completed the survey, 'no' otherwise
  return { result: hasCompleted ? 'yes' : 'no' };
}