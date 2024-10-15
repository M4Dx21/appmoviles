import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomepPage } from './homep.page';

describe('HomepPage', () => {
  let component: HomepPage;
  let fixture: ComponentFixture<HomepPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
