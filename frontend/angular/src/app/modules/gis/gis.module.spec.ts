import { GisModule } from './gis.module';

describe('GisModule', () => {
  let gisModule: GisModule;

  beforeEach(() => {
    gisModule = new GisModule();
  });

  it('should create an instance', () => {
    expect(gisModule).toBeTruthy();
  });
});
