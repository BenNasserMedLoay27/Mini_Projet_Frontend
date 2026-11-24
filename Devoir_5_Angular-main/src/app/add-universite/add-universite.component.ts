import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Universite } from '../model/universite.model';
import { UniversiteService } from '../services/universite.service';
import { Systeme } from '../model/systeme.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-universite',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-universite.component.html'
})
export class AddUniversiteComponent implements OnInit {

  newUniversite = new Universite();
  message! : string;
  systemes! : Systeme[];
  newIdSysteme: number | null = null;
  newSysteme! : Systeme;


  constructor(private universiteService: UniversiteService,
              private router :Router
   ) {}



  ngOnInit() {
    this.universiteService.listeSystemes().subscribe(systemes => {
      this.systemes = systemes;
      this.newIdSysteme = this.systemes[0]?.idSysteme ?? null;
    });
  }



  addUniversite(){
    if (this.newIdSysteme === null) return;
    this.newSysteme = this.systemes.find(systeme => systeme.idSysteme === this.newIdSysteme)!;
    this.newUniversite.systeme = this.newSysteme;
    this.universiteService.ajouterUniversite(this.newUniversite).subscribe(() => {
      this.router.navigate(['universites']);
    });

  }


}
