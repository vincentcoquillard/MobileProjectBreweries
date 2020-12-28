import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreweryInfoPage } from './brewery-info.page';

describe('BreweryInfoPage', () => {
  let component: BreweryInfoPage;
  let fixture: ComponentFixture<BreweryInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BreweryInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
