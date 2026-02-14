// Netlify serverless function to handle counter operations
// This keeps your API key secure on the server side

const COUNTER_API_BASE = 'https://api.counterapi.dev/v2';
const WORKSPACE = 'adarsh04-p'; // Your workspace name

exports.handler = async (event, context) => {
  // Only allow GET and POST requests
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const API_KEY = process.env.COUNTER_API_KEY;
  
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  // Parse query parameters
  const params = event.queryStringParameters || {};
  const action = params.action; // 'up', 'down', 'get'
  const counterName = params.counter; // 'visits' or 'likes'

  if (!action || !counterName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing action or counter parameter' })
    };
  }

  try {
    let endpoint;
    
    // Build the appropriate endpoint
    switch (action) {
      case 'up':
        endpoint = `${COUNTER_API_BASE}/${WORKSPACE}/${counterName}/up`;
        break;
      case 'down':
        endpoint = `${COUNTER_API_BASE}/${WORKSPACE}/${counterName}/down`;
        break;
      case 'get':
        endpoint = `${COUNTER_API_BASE}/${WORKSPACE}/${counterName}`;
        break;
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }

    // Make request to CounterAPI
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Counter API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update counter' })
    };
  }
};
