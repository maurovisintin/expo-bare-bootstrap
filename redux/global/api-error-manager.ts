import { PayloadAction } from 'typesafe-actions';

import { sendLocalNotification } from '../../services/notification';
import loggingService from '../../services/logging';

const SILENT_ERROR_CODES = [422];

const mapProblems = (problem: string) => {
  switch (problem) {
    case 'CLIENT_ERROR':
      return 'Client error';
    case 'SERVER_ERROR':
      return 'Server error';
    case 'TIMEOUT_ERROR':
      return 'Timeout';
    case 'CONNECTION_ERROR':
      return 'Connection error';
    case 'NETWORK_ERROR':
      return 'Network error';
    case 'CANCEL_ERROR':
      return 'Cancel error';
    default:
      return '';
  }
};

const saga = function* saga(action: PayloadAction<string, any>): Generator {
  try {
    const { response } = action.payload;

    const error = {
      errorType: mapProblems(response.problem),
      statusCode: response.status ? response.status : '',
      message: response.originalError
        ? response.originalError.message
        : 'not present',
      url:
        response.originalError && response.originalError.config
          ? response.originalError.config.url
          : 'not present',
      correlationId:
        response.config && response.config.headers
          ? response.config.headers['x-correlation-id']
          : 'not present'
    };

    if (SILENT_ERROR_CODES.includes(response.status)) return;

    loggingService.setTag('correlationId', error.correlationId);
    loggingService.setError(new Error(JSON.stringify(error)));

    yield sendLocalNotification({
      body: `${error.statusCode} ${error.errorType} - ${error.url}`,
      type: 'error'
    });
  } catch (e) {
    loggingService.setError(e);
  }
};

export { saga };
