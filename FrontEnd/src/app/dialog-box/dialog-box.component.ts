import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { CategoriaDTO } from 'src/models/categoria.dto';

@Component({
    selector: 'dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

    form: FormGroup;
    title:string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogBoxComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

        this.title = data.title;

        this.form = fb.group({
            nome: [data.data.nome, Validators.required],
            saldoInicial: [data.data.saldoInicial, Validators.required],
        });

    }

    ngOnInit() {

    }


    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close('close');
    }

}