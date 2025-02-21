import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.scss',
})
export class MovieEditComponent implements OnInit {
  movie$!: Observable<Movie | undefined>;
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.movie$ = this.movieService.getMovie(
      this.activatedRoute.snapshot.params['id'],
    );
  }
  ngOnInit(): void {}

  navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
