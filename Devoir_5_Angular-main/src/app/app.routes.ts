import { Routes } from '@angular/router';
import { UniversitesComponent } from './universites/universites.component';
import { AddUniversiteComponent } from './add-universite/add-universite.component';
import { UpdateUniversiteComponent } from './update-universite/update-universite.component';
import { RechercheParSystemeComponent } from './recherche-par-systeme/recherche-par-systeme.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';

export const routes: Routes = [
    {path: "universites", component : UniversitesComponent},
    {path: "add-universite", component : AddUniversiteComponent},
    {path: "updateUniversite/:id",  component: UpdateUniversiteComponent},
    {path: "rechercheParCategorie", component : RechercheParSystemeComponent},
    {path: "rechercheParNom", component : RechercheParNomComponent},
    {path: "", redirectTo: "universites", pathMatch: "full"}
];

