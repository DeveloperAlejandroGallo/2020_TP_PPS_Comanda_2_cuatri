import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogAndSignPage } from './log-and-sign.page';

describe('LogAndSignPage', () => {
  let component: LogAndSignPage;
  let fixture: ComponentFixture<LogAndSignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogAndSignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogAndSignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
