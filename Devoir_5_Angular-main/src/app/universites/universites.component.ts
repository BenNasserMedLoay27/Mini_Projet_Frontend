import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Universite } from '../model/universite.model';
import { UniversiteService } from '../services/universite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-universites',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './universites.component.html',
  styleUrl: './universites.component.css'
})
export class UniversitesComponent implements OnInit  {
  universites: Universite[] = [];

  constructor(private universiteService: UniversiteService) {}

  ngOnInit(): void {
    this.chargerUniversites();
  }

  chargerUniversites(): void {
    this.universiteService.listeUniversites().subscribe(universites => {
      this.universites = universites;
    });
  }

  supprimerUniversite(universite: Universite): void {
    const conf = confirm('Etes-vous sûr ?');
    if (conf && universite.idUniversite !== undefined) {
      this.universiteService.supprimerUniversite(universite.idUniversite).subscribe(() => {
        this.chargerUniversites();
      });
    }
  }

}
