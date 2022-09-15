import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  baseUrl: String = environment.baseUrl;
  
  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
      private service: CategoriaService, 
      private route: ActivatedRoute, 
      private router: Router
    ) { }

  ngOnInit(): void {
    //pegando o id da url e setando no objeto Categoria
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;    
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta; //ASSIM TAMBÉM DEU CERTO MAS O COM O VALDIR CEZAR DEU RUIM      
      //this.categoria.nome = resposta.nome;
      //this.categoria.descricao = resposta.descricao;      
    });
  }
  
  update(): void {
      this.service.update(this.categoria).subscribe((resposta) => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria atualizada com sucesso');
    }, err => {
      this.service.mensagem('Validar se todos os campos estão preenchidos corretamente!');
    })
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}