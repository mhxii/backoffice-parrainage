import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css'],
  imports : [ReactiveFormsModule,MatIcon,MatTableModule,CommonModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule],
})
export class CandidatComponent implements OnInit {

  candidats: any[] = [];
  candidatForm: FormGroup;
  showForm: boolean = false;
  isEditMode: boolean = false;
  selectedCandidatId: string | null = null;

  constructor(private candidatService: CandidatService, private fb: FormBuilder) {
    this.candidatForm = this.fb.group({
      numElecteur: [''],
      email: [''],
      telephone: [''],
      partiPolitique: [''],
      slogan: [''],
      couleur1: [''],
      couleur2: [''],
      couleur3: [''],
      urlInfo: [''],
      codeSecurite: ['']
    });
  }

  ngOnInit(): void {
    this.loadCandidats();
  }

  loadCandidats() {
    this.candidatService.getCandidats().subscribe(data => {
      this.candidats = data;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditMode = false;
      this.candidatForm.reset();
    }
  }

  submitForm() {
    if (this.isEditMode && this.selectedCandidatId) {
      // Modification
      this.candidatService.modifierCandidat(this.selectedCandidatId, this.candidatForm.value).subscribe(() => {
        this.loadCandidats();
        this.toggleForm();
      });
    } else {
      // Ajout
      this.candidatService.ajouterCandidat(this.candidatForm.value).subscribe(() => {
        this.loadCandidats();
        this.toggleForm();
      });
    }
  }

  editCandidat(candidat: any) {
    this.isEditMode = true;
    this.selectedCandidatId = candidat.numElecteur;
    this.candidatForm.patchValue(candidat);
    this.showForm = true;
  }

  deleteCandidat(numElecteur: string) {
    if (confirm('Voulez-vous vraiment supprimer ce candidat ?')) {
      this.candidatService.supprimerCandidat(numElecteur).subscribe(() => {
        this.loadCandidats();
      });
    }
  }
}
