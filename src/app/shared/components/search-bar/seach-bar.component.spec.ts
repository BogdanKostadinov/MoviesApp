import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeachBarComponent } from './seach-bar.component';

describe('SeachBarComponent', () => {
  let component: SeachBarComponent;
  let fixture: ComponentFixture<SeachBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeachBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeachBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
