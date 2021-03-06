import { Component, OnInit,OnChanges, Output,EventEmitter } from "@angular/core";
import { Enquiry } from "../_models";
import { EnquiryService } from "../_services/enquiry.service";

@Component({

    selector: `search-enquiry`,
    templateUrl: 'searchEnquiry.html',
    styleUrls: ['./searchEnquiryComponent.css']
})
export class SearchEnquiryComponent implements OnInit{

    @Output()
    notifyToAdmission:EventEmitter<Enquiry>=new EventEmitter<Enquiry>();
    //in the parent component we need to bind this custom notify event 

    currentEnquiry:Enquiry;
    
    enquires: Enquiry[];
    filterEnquires: Enquiry[];
    private _searchterm: string;
    //searchterm: string;
    

    //track all radio butoon
    selectedRadioButtonvalue: string = "Name";
    placeHolder: string = "Name";

    
    constructor(private enquiryService: EnquiryService) { }

    //getter and setter for searchTerm
    get searchTerm(): string {
        return this._searchterm;
    }
    set searchTerm(value: string) {
        this._searchterm = value;
           if(this._searchterm==''||this._searchterm==undefined){
            this.filterEnquires=[];
                          
           }else{
        
            this.filterEnquires = this.filterEnquiry(value);
           }
       // this.filterEnquires = this.filterEnquiry(value);
        // this.filterEnquires =this.enquires;
    }
    onRadionButtonselectionChanged() {

        this.placeHolder = this.selectedRadioButtonvalue;
        console.log(this.selectedRadioButtonvalue);
    }

    filterEnquiry(searchString: string) {

        
        if (this.selectedRadioButtonvalue == 'Name') {
            
            return this.enquires.filter(enquiry =>
                enquiry.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);


        } else if (this.selectedRadioButtonvalue == 'Email') {

            return this.enquires.filter(enquiry =>
                enquiry.emailAddress.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

        } else if(this.selectedRadioButtonvalue == 'MobileNumber') {
            return this.enquires.filter(enquiry =>
                enquiry.mobileNumber.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
        }
        
         //return this.enquires;

    }

    ngOnInit() {

        this.loadAllEnquiry();
        
    }


    private loadAllEnquiry() {

        this.enquiryService.getAll().subscribe((data: Enquiry[]) => {
            // Data extraction from the HTTP response is already done
            // Display the result
            this.enquires = data;
            console.log('list of enquires from database ', data);
        },
        error=>{
          throw error;
        });
    }
    
    setDetails(model:Enquiry)
    {
        this.currentEnquiry=model;
        //console.log(this.currentEnquiry);
        this.notifyToAdmission.emit(this.currentEnquiry);
    }
}