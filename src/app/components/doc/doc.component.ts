import { AuthenticationService } from './../../services/authentication.service';
import { DocsService } from 'src/app/services/docs.service';
import { DocModel } from './../../models/doc-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

  doc: DocModel = new DocModel();
  content: string | undefined = '';
  docIdParam = null;
  docTitle: string | null = '';
  createNewDoc = false;

  constructor(private route: ActivatedRoute,
    private docsService: DocsService,
    private router: Router,
    private authService: AuthenticationService) {

    this.route.params.subscribe(params => {
      if (params.id) {
        this.docIdParam = params.id;
      }
    });

  }

  ngOnInit(): void {

    if (this.docIdParam && this.docIdParam !== 'new') {
      this.fetchDocument();
    } else {
      if (this.docIdParam === 'new') {
        this.createNewDoc = true;
        this.doc = new DocModel();
        this.doc.userId = this.authService!.currentUserValue!.id;
      }
    }

  }

  fetchDocument() {

    this.docsService.fetchDoc(this.docIdParam!)
      .subscribe(
        data => {
          this.doc = data;
          this.content = this.doc.content;
          this.docTitle = this.doc.title;
        },
        error => {
          alert(`Couldn't fetch doc ${this.docIdParam}: ${error}`);
        }
      )
  }

  loadSuccesful(event: any) {
    console.log('Load succ');

  }

  onError(event: any) {
    alert(`Couldn't load doc ${this.docIdParam}: ${event}`);
  }

  saveDoc() {

    this.doc.content = this.content === '' ? undefined : this.content;
    this.doc.updatedAt = null;
    this.doc.title = this.docTitle === '' ? null : this.docTitle;

    if (this.createNewDoc) {
      this.docsService.createDoc(this.doc)
        .subscribe(
          data => {
            this.router.navigate(['/mydocs']);
          },
          error => {
            alert(`Doc couldn't be saved: ${error.message}`);
          }
        );
    } else {
      this.docsService.saveDoc(this.doc)
        .subscribe(
          data => {
            this.router.navigate(['/mydocs']);
          },
          error => {
            alert(`Doc couldn't be saved: ${error.message}`);
          }
        );
    }
  }
}
