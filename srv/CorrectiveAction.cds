using INC as INC from '../db/schema';

service CorrectiveAction {
//_____________________________________________GET SERVICES__________________________________________//
    // Master Data
    entity fhvk18eozejqoqwx as select from INC.M.MASTERDATA;
    entity qmngmnlkewbx66gj as select from INC.M.EMPLOYEEDATA;
    entity edfzoqj64srugvmp as select from INC.M.SESSIONUSERDT;

    //Corrective Actions
    entity bpb8jfo8z1iase8p as select from INC.OHS.CORRECTIVEACTION;

    
//__________________________________________________POST SERVICES____________________________________________________//
    //Reassign CA
    action lmzjuz1z0jx8qd4n(XkXwXp4nCf5azs0U: String) returns String;

    //Close CA
    action c1n4m1f3gffb960r(XkXwXp4nCf5azs0U: String) returns String;
}