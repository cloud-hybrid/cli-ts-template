/***
 * @name        cli-prompt
 * @package     @cloud-vault
 * @summary     ESM-based CLI Prompt
 *
 * @author      Jacob B. Sanders
 * @license     BSD 3-Clause License
 * @copyright   Cloud-Technology LLC. & Affiliates
 */
/***
 * Asynchronous CLI Prompt
 *
 * @param query
 *
 * @returns {Promise<string>}
 *
 * @constructor
 *
 */
declare const Prompt: (query: string) => Promise<string>;
export { Prompt };
export default Prompt;
