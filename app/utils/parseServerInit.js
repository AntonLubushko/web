/**
 * in module use
 * import Parse from '/home/work/test-task/web/app/utils/parse-server/init';
 */



import Parse from 'parse';
import {isClient} from '../helpers';

const PARSE_APP_ID = process.env.PARSE_APP_ID || 'TestTaskApplTcVXkSPuZpMsSKccGIN0TLlq0hcq';

const PARSE_SERVER_URL = process.env.PARSE_SERVER_URL || '/parse';

const PARSE_SERVER_URL_DOCKER = process.env.PARSE_SERVER_URL_DOCKER || 'http://parse-server/parse';

Parse.serverURL = typeof window !== "undefined" ? PARSE_SERVER_URL : PARSE_SERVER_URL_DOCKER;
Parse.initialize(PARSE_APP_ID);


export default Parse;
