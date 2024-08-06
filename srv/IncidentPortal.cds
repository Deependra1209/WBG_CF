using INC as INC from '../db/schema';

service IncidentPortal {
//_____________________________________________GET SERVICES__________________________________________//
    /// Master Data
    entity fhvk18eozejqoqwx as select from INC.M.MASTERDATA;
    entity qmngmnlkewbx66gj as select from INC.M.EMPLOYEEDATA;
    entity utslio54f6rd7ao6 as select from INC.M.NATUREOFINJURY;
    entity qdo8e8lgmi551pam as select from INC.M.BODYPART;
    entity enk15dcko1kr9nrd as select from INC.M.BODYPARTSIDE;
    entity qlqdpkzfp5h0445r as select from INC.M.FISHBONEANALYSIS;
    entity sh4knedt1ub8k7ll as select from INC.M.SCATANALYSIS;
    entity edfzoqj64srugvmp as select from INC.M.SESSIONUSERDT;

    //Landing Page
    entity zkkoitsf308swxps as select from INC.OHS.LANDINGPAGE;
    entity tomadceqkxui6bzm as select from INC.OHS.SUMMARY;
    entity aVzaQhemhAbKVwcj as select from INC.OHS.PREINVESTIGATION;
    entity nkKEGKKXXKqyHYCQ as select from INC.OHS.LINKEDINCIDENTS;
    entity D3N62mR0E3aS0DBh as select from INC.OHS.CHAINOFEVENT;
    entity uWYn7PAq9G1D04f5 as select from INC.OHS.INVESTIGATIONDETAILS;
    entity ZYYN8sO9L6uSEBa7 as select from INC.OHS.INVESTIGATIONTEAM;
    entity EAVfBn19inj24Bwf as select from INC.OHS.INVESTIGATIONFISHBONE;
    entity QVBybUrUCna0N8O3 as select from INC.OHS.LESSONSLEARNED;
    entity Xcink8GKBUpQGmzh as select from INC.OHS.CORRECTIVEACTION;
    entity YzTD4CGRwMPdd4l7 as select from INC.OHS.REPORTSIGNOFF;
    entity aKJwsXTBT9VgL7Rn as select from INC.OHS.FOLLOWUP;
    entity V3MCsbtg9exCq9nI as select from INC.OHS.FOLLOWUPSENDTO;

    //Report Incident Tab
    entity ej4myIFssTTENpBx as select from INC.OHS.INCIDENTDETAILS;
    entity eB3ibjbxMW91mbu3 as select from INC.OHS.INCIDENTTYPE;
    entity nqmQ5UC5aiROiHcK as select from INC.OHS.DETAILSOFINJURED;
    entity ukScpfBdScYR84uD as select from INC.OHS.WITNESSDETAILS;
    entity nUT60M6qpspbeamk as select from INC.OHS.PERSONALINJURYILLNESS;
    entity DSos331u23yZ0q5M as select from INC.OHS.INJUREDBODYPARTNATURE;
    entity SlkEXP0XEoD6XjjN as select from INC.OHS.ENVIRONMENTAL;
    entity CRlWwVKdHNbgyfOh as select from INC.OHS.RELEASEDTO;
    entity k0yLHMoBmtokiWKj as select from INC.OHS.FIREEXPLOSION;
    entity ujmmBYDGQm66KYk8 as select from INC.OHS.TRANSPORTATION;
    entity ednR3uyOZz8oD0x8 as select from INC.OHS.OFFICIALTRAVELMISSION;
    entity V6fow9z08djkjCga as select from INC.OHS.ATTACHMENTS;
    entity SmfVsZV35secM59i as select from INC.OHS.NEARMISS;
    entity xcltsfVMnAPjYN3m as select from INC.OHS.TYPEOFNEARMISS;
    entity Dm7vUlq05pVQXyuG as select from INC.OHS.POTENTIALNEARMISS;

//__________________________________________________POST SERVICES____________________________________________________//
    ////Delete Body Part
    action NtwF4uuInYgRwCMZ(XkXwXp4nCf5azs0U: String) returns String;

    //Delete Injury Party
    action vZD00EaYEDG4f9ey(XkXwXp4nCf5azs0U: String) returns String;
    
    //Delete Witness Details
    action CrNynAetTbHNHqn3(XkXwXp4nCf5azs0U: String) returns String;

    //Update Report Incident
    action i1YrIhR4FiW0Wkg2(XkXwXp4nCf5azs0U  : String) returns String;

    // Pre-Investigation
    action yv56xquyxyprnk1j(XkXwXp4nCf5azs0U  : String) returns String;

    // Investigation
    action w5uxxfmohlmuk1ag(XkXwXp4nCf5azs0U  : String) returns String;

    // Investigation - Report Sign off
    action as2srlphvuf5juj6(XkXwXp4nCf5azs0U  : String) returns String;

    // Follow up
    action vrvzops9ly3tyiui(XkXwXp4nCf5azs0U  : String) returns String;

    // Delete Investigation Team
    action xksfxrsnnvml2pzk(XkXwXp4nCf5azs0U  : String) returns String;

    // Delete Chain of Events
    function eddl7wz9zoatww19(XkXwXp4nCf5azs0U  : String) returns String;

    // Delete Corrective Action
    function d2hhhqmepsgh7g3i(XkXwXp4nCf5azs0U  : String) returns String;

    // Delete Lesson Learn
    function i5j7kek2aqkevyca(XkXwXp4nCf5azs0U  : String) returns String;


    
} 