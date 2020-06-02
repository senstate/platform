import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupHolderComponent } from './group-holder/group-holder.component';



@NgModule({
    declarations: [GroupHolderComponent],
    exports: [
        GroupHolderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
