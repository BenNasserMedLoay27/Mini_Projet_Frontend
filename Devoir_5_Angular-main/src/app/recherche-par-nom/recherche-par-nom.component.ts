import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Universite } from '../model/universite.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  universites: Universite[] = [];
  searchTerm = '';

  constructor(private universiteService: UniversiteService) {}

  ngOnInit(): void {
    this.universiteService.listeUniversites().subscribe(universites => {
      this.universites = universites;
    });
  }

  get universitesFiltrees(): Universite[] {
    const terme = this.searchTerm.trim().toLocaleLowerCase();
    return this.universites.filter(universite =>
      universite.nomUniversite.toLocaleLowerCase().includes(terme)
    );
  }
}
