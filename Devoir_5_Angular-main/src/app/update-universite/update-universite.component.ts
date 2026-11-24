import { Component, OnInit } from '@angular/core';
import { Universite } from '../model/universite.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversiteService } from '../services/universite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Systeme } from '../model/systeme.model';

@Component({
  selector: 'app-update-universite',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-universite.component.html',
  styles: ``
})
export class UpdateUniversiteComponent implements OnInit {
  currentUniversite  = new Universite();

  systemes! : Systeme[];
 updatedSystemeId: number | null = null;

  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private universiteService: UniversiteService
) { }

ngOnInit(): void {
  const id = Number(this.activatedRoute.snapshot.params['id']);
  this.universiteService.listeSystemes().subscribe(systemes => {
    this.systemes = systemes;
    this.updatedSystemeId = this.currentUniversite.systeme?.idSysteme ?? this.systemes[0]?.idSysteme ?? null;
  });
  this.universiteService.consulterUniversite(id).subscribe(universite => {
    this.currentUniversite = universite;
    this.updatedSystemeId = universite.systeme?.idSysteme ?? this.systemes?.[0]?.idSysteme ?? null;
  });
}




updateUniversite() {
  if (this.updatedSystemeId === null) return;
  this.currentUniversite.systeme = this.systemes.find(systeme => systeme.idSysteme === this.updatedSystemeId)!;
  this.universiteService.updateUniversite(this.currentUniversite).subscribe(() => {
    this.router.navigate(['universites']);
  });
   }
 

}
