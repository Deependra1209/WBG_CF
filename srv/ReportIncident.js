const { validateField, generateIncidentNumber,getSequenceNumber,lpad,setValue } = require('./common');
const cds = require('@sap/cds');
let oInput,tx;

function lPad(str,len) {
    return new Promise(async function(resolve, reject){
        try {
            var s = str.toString();
            while (s.length < len) {
                s = "0" + s;
            }
            resolve(s);
        }catch(error) {
            reject();
            throw error.toString();
        }
    })
}
module.exports = cds.service.impl(function (){

    this.on("i1YrIhR4FiW0Wkg2", async (req) => {
        try {
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oReportIncident = oInput.ReportIncident;
            const oNearMiss = oInput.NearMiss;
            const oEnvironmental = oInput.Environmental;
            const oFire = oInput.Fire;
            const oTranspotation = oInput.Transpotation;
            const oOfficialTravel = oInput.OfficialTravel;
            const aAttachments = oInput.Attachments;

            tx = cds.transaction(req);


            //main post call incident details
            if(validateField(oReportIncident.INCID)){
 
            result = await tx.run(`CALL "prCreateUpdateIncidentDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oReportIncident.INCID),setValue(oReportIncident.CLASS) ,setValue(oReportIncident.OTRMN) ,setValue(oReportIncident.REPOB) ,setValue(oReportIncident.ORGZN) ,
                setValue(oReportIncident.REPPR) ,setValue(oReportIncident.INUPI) ,setValue(oReportIncident.INCVP),setValue(oReportIncident.IUNIT) ,setValue(oReportIncident.INCDT) ,
                setValue(oReportIncident.INCTM) ,setValue(oReportIncident.INCLC) ,setValue(oReportIncident.CNTIR) ,setValue(oReportIncident.INRDT),setValue(oReportIncident.INRTM) ,
                setValue(oReportIncident.LODES) ,setValue(oReportIncident.INDES) ,setValue(oReportIncident.REGNO) ,setValue(oReportIncident.WORKC) ,setValue(oReportIncident.WITBY),
                setValue(oReportIncident.ISAVE) ,setValue(oReportIncident.ATTFL)]);
            console.log(result);
            
            const oINCID = oReportIncident.INCID == 0 ? await getSequenceNumber("INC_T_INCDT","INCID") : oReportIncident.INCID;

            //incident type
            for(let i=0;i<oReportIncident.INCType.length;i++){
                result = await tx.run(`CALL "prCreateUpdateIncidentType"(?,?,?,?)`, [setValue(oReportIncident.INCType[i].ITPID), oINCID, setValue(oReportIncident.INCType[i].INCTP),
                setValue(oReportIncident.INCType[i].ISDEL)]);
                console.log(result);
            }
 
            //injured people details    
            for(let i=0;i<oReportIncident.DetailsofInjured.length;i++){
                result = await tx.run(`CALL "prCreateUpdateInjuredDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oReportIncident.DetailsofInjured[i].INJID), oINCID, 
                setValue(oReportIncident.DetailsofInjured[i].EMPTP), setValue(oReportIncident.DetailsofInjured[i].NAOIN), 
                setValue(oReportIncident.DetailsofInjured[i].INUPI), setValue(oReportIncident.DetailsofInjured[i].INCVP), setValue(oReportIncident.DetailsofInjured[i].EUNIT), 
                setValue(oReportIncident.DetailsofInjured[i].REGON), setValue(oReportIncident.DetailsofInjured[i].ECITY), setValue(oReportIncident.DetailsofInjured[i].NSOTL), 
                setValue(oReportIncident.DetailsofInjured[i].ESOTL), setValue(oReportIncident.DetailsofInjured[i].CNTRY), setValue(oReportIncident.DetailsofInjured[i].ORGAN), 
                setValue(oReportIncident.DetailsofInjured[i].EASNS), setValue(oReportIncident.DetailsofInjured[i].PPNON)]);
                console.log(result);

                const oINJID = oReportIncident.DetailsofInjured[i].INJID == 0 ? await getSequenceNumber("INC_T_INJDT","INJID"):oReportIncident.DetailsofInjured[i].INJID;

                // personal injury
                for(let j=0;j<oReportIncident.DetailsofInjured[i].personalinjury.length;j++){
                    result = await tx.run(`CALL "prCreateUpdatePersonalInjury"(?,?,?,?,?,?,?,?,?,?)`, [setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].PRIID), oINCID, 
                     oINJID, setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].LTRTQ), setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WTIMF), 
                    setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WBBFE), setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WBSPT), 
                    setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WHDTE), setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].TOBBF), 
                    setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].OTHER)]);
                    console.log(result);

                    const oPINID = oReportIncident.DetailsofInjured[i].personalinjury[j].PRIID == 0 ? await getSequenceNumber("INC_T_PIJIL","PRIID") : oReportIncident.DetailsofInjured[i].personalinjury[j].PRIID;

                    //body parts
                    for(let k=0;k<oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart.length;k++){
                        result = await tx.run(`CALL "prCreateUpdateInjuredBodyPart"(?,?,?,?,?,?)`, [setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].IBDID), oINCID, oPINID, 
                        setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].BODPT),setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].NOIIL), 
                        setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].SIDEY)]);
                        console.log(result);
                    }
                }
            }

            //witness details
            for(let i=0;i<oReportIncident.witnessdetails.length;i++){
                result = await tx.run(`CALL "prCreateUpdateWitnessDetails"(?,?,?,?,?,?,?)`, [setValue(oReportIncident.witnessdetails[i].WITID),oINCID,null, 
                setValue(oReportIncident.witnessdetails[i].WITTP), setValue(oReportIncident.witnessdetails[i].WITNM), setValue(oReportIncident.witnessdetails[i].WITPN), 
                setValue(oReportIncident.witnessdetails[i].WITEM)]);
                console.log('hahahahahah');
                console.log(result);
            }


            // Environmental
            if(validateField(oEnvironmental.ENVID)){
                result = await tx.run(`CALL "prCreateUpdateEnvironmental"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oEnvironmental.ENVID),oINCID, setValue(oEnvironmental.WESCD), 
                    setValue(oEnvironmental.PRLOC), setValue(oEnvironmental.DESLO), setValue(oEnvironmental.PRSDC), null,null, 
                    setValue(oEnvironmental.WCTTR), setValue(oEnvironmental.TSROS), setValue(oEnvironmental.EQSRD), 
                    setValue(oEnvironmental.UNMNT), setValue(oEnvironmental.ISCON), setValue(oEnvironmental.WCRLS), 
                    setValue(oEnvironmental.WRSCN), setValue(oEnvironmental.WIMRT), setValue(oEnvironmental.CNMSS), setValue(oEnvironmental.ADCOM)]);
                console.log(result);

                const oENVID = oEnvironmental.ENVID == 0 ? await getSequenceNumber("INC_T_ENVIT","ENVID") : oEnvironmental.ENVID;

                // released to
                for(let i=0;i<oEnvironmental.releasedto.length;i++){
                    result = await tx.run(`CALL "prCreateUpdateReleasedTo"(?,?,?,?,?)`, [setValue(oEnvironmental.releasedto[i].RSLID),oENVID,oINCID,setValue(oEnvironmental.releasedto[i].RLTOI),
                    setValue(oEnvironmental.releasedto[i].ISDEL)]);
                    console.log(result);
                }
            }

            //fire explosion
            if(validateField(oFire.FREID)){
            result = await tx.run(`CALL "prCreateUpdateFireExplosion"(?,?,?,?,?,?,?,?)`, [setValue(oFire.FREID), oINCID, setValue(oFire.EQPUD), setValue(oFire.IRTES), 
                setValue(oFire.WAEVD), setValue(oFire.DWASD), 
                setValue(oFire.COINC), setValue(oFire.WIRMT)]);
            console.log(result);
            }
            // transportation
            if(validateField(oTranspotation.TRSID)){ 
            result = await tx.run(`CALL "prCreateUpdateTransportation"(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oTranspotation.TRSID),oINCID, setValue(oTranspotation.TYPTR), setValue(oTranspotation.LOCXX), 
                setValue(oTranspotation.SPEXX), setValue(oTranspotation.POLIV), setValue(oTranspotation.ACTTI), setValue(oTranspotation.OPASS), setValue(oTranspotation.INJUR), setValue(oTranspotation.OVCXX), setValue(oTranspotation.VEIID), 
                setValue(oTranspotation.MDLYR), setValue(oTranspotation.VECDS), setValue(oTranspotation.PCVXX)]);
            console.log(result);
            }
            //attachments
            for(let i=0;i<aAttachments.length;i++){
                result = await tx.run(`CALL "prCreateUpdateAttachment"(?,?,?,?,?,?,?)`, [setValue(aAttachments[i].ATTID),oINCID, setValue(aAttachments[i].FLTTL), setValue(aAttachments[i].FILTP), 
                setValue(aAttachments[i].FLDES), setValue(aAttachments[i].ISCON), setValue(aAttachments[i].OBJCT)]);
                console.log(result);
            }

            //near miss
            if(validateField(oNearMiss.NRMID)){
            result = await tx.run(`CALL "prCreateUpdateNearMiss"(?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oNearMiss.NRMID),oINCID, setValue(oNearMiss.NRMDT), setValue(oNearMiss.NMRDT), setValue(oNearMiss.NRMTM), 
            setValue(oNearMiss.NMRTM), setValue(oNearMiss.WEACN), setValue(oNearMiss.INCCN), setValue(oNearMiss.LOCTN), setValue(oNearMiss.OFFTR), setValue(oNearMiss.NMDES), setValue(oNearMiss.WITBY)]);
            console.log(result);

            const oNRMID = oNearMiss.NRMID == 0 ? await getSequenceNumber("INC_T_NRMIS","NRMID") : oNearMiss.NRMID;


            //near miss type
            for(let i=0;i<oNearMiss.nearmisstype.length;i++){
                result = await tx.run(`CALL "prCreateUpdateNearMissType"(?,?,?,?,?)`, [setValue(oNearMiss.nearmisstype[i].NMTID),oINCID, oNRMID, setValue(oNearMiss.nearmisstype[i].NRMTP), 
                setValue(oNearMiss.nearmisstype[i].ISDEL)]);
                console.log(result);
            }

            //near miss potential
            for(let i=0;i<oNearMiss.potentialnearmiss.length;i++){
                result = await tx.run(`CALL "prCreateUpdatePotentialNearMiss"(?,?,?,?,?)`, [setValue(oNearMiss.potentialnearmiss[i].NMPID),oINCID,oNRMID, 
                setValue(oNearMiss.potentialnearmiss[i].NRMPT), setValue(oNearMiss.potentialnearmiss[i].ISDEL)]);
                console.log(result);
            }

            //witness details for near miss
            for(let i=0;i<oNearMiss.witnessdetails.length;i++){
                result = await tx.run(`CALL "prCreateUpdateWitnessDetails"(?,?,?,?,?,?,?)`, [setValue(oNearMiss.witnessdetails[i].WITID),oINCID,oNRMID, 
                    setValue(oNearMiss.witnessdetails[i].WITTP), setValue(oNearMiss.witnessdetails[i].WITNM), 
                    setValue(oNearMiss.witnessdetails[i].WITPN), setValue(oNearMiss.witnessdetails[i].WITEM)]);
                console.log(result);
            }
            }
            //official travel
            result = await tx.run(`CALL "prCreateUpdateOfficialTravel"(?,?,?,?,?,?,?,?)`, [setValue(oOfficialTravel.OFTID), oINCID, setValue(oOfficialTravel.RFTVL), setValue(oOfficialTravel.INCLC), 
            setValue(oOfficialTravel.LCDES),setValue(oOfficialTravel.LOCIN), setValue(oOfficialTravel.ACTTI), setValue(oOfficialTravel.WIRMT)]);
            console.log(result);
            
            //Incident Number Update
            let IncidentName='';
            if(oReportIncident.ISAVE == '0'){
                IncidentName = await generateIncidentNumber();
            }else{
                IncidentName = 'DRF-' + await lPad(oINCID ,5);
            }
            console.log(IncidentName);
            result = await tx.run(`CALL "prUpdateIncidentNumber"(?,?)`, [oINCID,IncidentName]);
            console.log(result);
            
            
            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            // await createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');
            returnObj={};
            if(oReportIncident.ISAVE==0){
            returnObj = {
                "Success":"Incident Created",
                "Incident Number": IncidentName,
                "Incident Id" : oINCID
            }}else{
            returnObj = {
                "Success":"Draft Created",
                "Draft Number": IncidentName,
                "Drafted Incident Id" : oINCID
            }}
            
            // await tx.commit();
            return JSON.stringify(returnObj);
        }
        }catch (error) {
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Report Incident', 'CreateIncident', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Body Part
    this.on("NtwF4uuInYgRwCMZ", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteBodyPart = oInput.DeleteBodyPart;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteBodyPart"(?,?)`,[setValue(oDeleteBodyPart.IBDID),setValue(oDeleteBodyPart.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteBodyPart.INCID),setValue(oDeleteBodyPart.INCID),'DeleteBodyPart','DeleteBodyPart',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteBodyPart.INCID), 0, 0, 'Delete BodyPart', 'Delete BodyPart', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Body Part\" , \"Incident Id\":${oDeleteBodyPart.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete BodyPart', 'DeleteBodyPart', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Draft
    this.on("QuCaPpk2zm8UrbK0", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteDraft = oInput.DeleteDraft;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteDraft"(?)`,[setValue(oDeleteDraft.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteDraft.INCID),setValue(oDeleteDraft.INCID),'DeleteDraft','DeleteDraft',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteDraft.INCID), 0, 0, 'Delete Draft', 'Delete Draft', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Draft\", \"Incident Id\":${oDeleteDraft.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Draft', 'DeleteDraft', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Injury Party
    this.on("vZD00EaYEDG4f9ey", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteInjuryParty = oInput.DeleteInjuryParty;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteInjuryParty"(?,?)`,[setValue(oDeleteInjuryParty.INJID),setValue(oDeleteInjuryParty.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteInjuryParty.INCID),setValue(oDeleteInjuryParty.INCID),'DeleteWitnessDetails','DeleteWitnessDetails',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteInjuryParty.INCID), 0, 0, 'Delete Witness Details', 'Delete Witness Details', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Injury Party\", \"Incident Id\":${oDeleteInjuryParty.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Witness Details', 'DeleteWitnessDetails', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Witness Details
    this.on("CrNynAetTbHNHqn3", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U); 
            const oDeleteWitnessDetails = oInput.DeleteWitnessDetail;
            tx = cds.transaction(req); 

            result = await tx.run(`CALL "prDeleteWitnessDetails"(?,?)`,[setValue(oDeleteWitnessDetails.WITID),setValue(oDeleteWitnessDetails.INCID)]);
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteWitnessDetails.INCID),setValue(oDeleteWitnessDetails.INCID),'DeleteWitnessDetails','DeleteWitnessDetails',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteWitnessDetails.INCID), 0, 0, 'Delete Witness Details', 'Delete Witness Details', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Witness Details\ ", \"Incident Id\":${oDeleteWitnessDetails.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Witness Details', 'DeleteWitnessDetails', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
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