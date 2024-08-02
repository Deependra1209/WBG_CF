const { validateField, setValue } = require('./common');
const cds = require('@sap/cds');
let oInput,tx;

module.exports = cds.service.impl(function (){

    //Reassign CA
    this.on("lmzjuz1z0jx8qd4n", async (req) => {
        try {
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oReassignCA = oInput.ReassignCA;
           

            tx = cds.transaction(req);


            //Main post call Corrective Action
            if(validateField(oReassignCA.CRAID)){
 
            result = await tx.run(`CALL "prUpdateReassignCA"(?,?,?,?)`, [setValue(oReassignCA.CRAID), setValue(oReassignCA.INCID), setValue(oReassignCA.ASSID), setValue(oReassignCA.RASNT)]);
            console.log(result);
            
            

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oReassignCA.INCID),setValue(oReassignCA.INCID),'Corrective Action','Re Assign CA',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
        
            return `{ \"Success\":\"Corrective Action Reassign\", \"Incident Id\":${oReassignCA.INCID} }`;
        }
        }catch (error) {
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Corrective Action Reassign', 'ReassignCA', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Close CA
    this.on("c1n4m1f3gffb960r", async (req) => {
        try {
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oCloseCA = oInput.CloseCA;
           

            tx = cds.transaction(req);


            //Main post call Corrective Action
            if(validateField(oCloseCA.CRAID)){
 
            result = await tx.run(`CALL "prUpdateCloseCA"(?,?,?)`, [setValue(oCloseCA.CRAID), setValue(oCloseCA.INCID), setValue(oCloseCA.CASTS)]);
            console.log(result);
            
            

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oCloseCA.INCID),setValue(oCloseCA.INCID),'Corrective Action','Close CA',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
        
            return `{ \"Success\":\"Corrective Action Closed\", \"Incident Id\":${oCloseCA.INCID} }`;
        }
        }catch (error) {
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Corrective Action Close', 'closeCA', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })
})