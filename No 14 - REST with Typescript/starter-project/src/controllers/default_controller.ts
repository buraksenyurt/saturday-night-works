import { Controller, DefaultWorker, htmlResult, textResult, renderView, viewResult } from "fortjs";

export class DefaultController extends Controller {
    @DefaultWorker()
    async default() {
        try {
            const model = {
                title: 'FortJs'
            }
            const result = await viewResult('controller:default,action:default', model);
            return result;
        } catch (ex) {
            console.log(ex);
            // handle exception and show user a good message.
            // save this ex in a file or db, so that you can know what's the issue and where
            const result = await textResult(`Our server is busy right now. Please try later.`);
            return result;
        }
    }
}