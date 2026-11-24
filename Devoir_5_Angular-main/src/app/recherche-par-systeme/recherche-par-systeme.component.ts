import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Universite } from '../model/universite.model';
import { Systeme } from '../model/systeme.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-recherche-par-systeme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-systeme.component.html',
  styles: ''
})
export class RechercheParSystemeComponent implements OnInit {
  universites: Universite[] = [];
  systemes: Systeme[] = [];
  idSysteme: number | null = null;
  private toutesLesUniversites: Universite[] = [];

  constructor(private universitesService: UniversiteService) {}

  ngOnInit(): void {
    this.universitesService.listeSystemes().subscribe(systemes => {
      this.systemes = systemes;
    });
    this.chargerUniversites();
  }

  onChange(): void {
    if (this.idSysteme === null) {
      this.chargerUniversites();
      return;
    }
    this.universitesService.listeUniversitesParSysteme(Number(this.idSysteme)).subscribe(universites => {
      this.universites = universites;
    });
  }

  private chargerUniversites(): void {
    this.universitesService.listeUniversites().subscribe(universites => {
      this.toutesLesUniversites = universites;
      this.universites = [...universites];
    });
  }
}
