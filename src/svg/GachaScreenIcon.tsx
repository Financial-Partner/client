import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image, SvgProps } from 'react-native-svg';

const GachaScreenIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={28} height={28} fill="url(#pattern0_58_81)" />
    <Defs>
      <Pattern
        id="pattern0_58_81"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_58_81" transform="scale(0.0111111)" />
      </Pattern>
      <Image
        id="image0_58_81"
        width={90}
        height={90}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtUlEQVR4nO2cy29MURzHP16tx4ZEU9TCI6JeFa9E6/EHsGNvaUfj2UjQBaGxEQmhC7ErEoLYsaDi1SI0FQtEIioqioh2aopeOclvEqT3zvTOufee3vl9kl8yaTO/8z3fOfeec373zICiKIqiKIqiKIqiKIqiKIqiKIoyMhgP1ANtQC/gRRymjYfAdqCcEmEm0BGDuX7xTDSkfiR3JGjy32anemTXO2ByLraRYtocMDgXD0gx3x0wOBdGS2rxHIvU4jkWqcVzLFJLrwPm5sJoSS1PHTA4F09IMfscMDgXDaSYScAbB0x+DUwk5cwHuhI0+R0wjxJhBnA/AZPvAdMpMcYC44C5wEGgPwJjM8ABYI60NSbpTrvAGstmG5Prku6Uqxy2aPShpDvjMgssGl2ddGdcZjTQbMHkZsml5GFLyPt1FtiaL7nyLyuAt8Mw+T1Q+18OpUAqgFu6Po5vvd2U535cFpOWksDzCUWNHpl4OqLV6FThpX1Ej5JIGs9Ro4v2xzyBOCNVsIy8nkByeI4Zbc2fU0N06iTJ4TlmtDV/vg6R6AvJ4TlmtDV/sj4dS2IXVh5gtEt6foRJ1uOTzNQf4qYywGiX9HwKk+yFT7LVxE9dgNEu6XkeJtkVn2Q7iJ/dAUa7pOdymGSNPsluEz93Aox2SY95mj9s1vsk+wlMJT4qgF8BRrukZ22YhGY2/+yT0DytjoujASa7pKdHzo6E4rRP0kxMXyGrAvoKMNoFPUVt5pYCgz6JW4ieiwWY7IIe41FNscmvB3TOzL5R0TAMk5PWY1ZoRbMYGPBpwEwKm7DPZuC3T5t3JVzRY3bQC201dCzg0zSd22OrIWBvQKf65dhvdcC5jzj1eDI5Wt3bP85z2V6QySIsVQXck803b3PsdEBPexS1FnP0tTtPw2ZGPjLM+kOFjIpMntxnh3jvuQT1fABmERHLgW8FTErm8m0FdsnpoUr55Mvkda38rzXPZiQXN3xGjvnbzQT0GA+WETFL5PiVF1Nck19FCLqtXYpRT7cMuFiYDTyKuEODwPECT+mb00wnAtb8tqI9yttF0EhqClj6FRMfgQ0hNG2U99rWMyD37USPni2Sy9vGaOqTyWtyEXqmyADos3RVXbW5TrZBjTyw9CtEeQHxEtgPTLP8zS9TtnwVQk+P1C6K3lZHialgrZN6timEd4rwrCyZuuTnflpkXbwyYj3mzMUqaeu8tN0lWrKirVO0NkqpM3QVTlEURVEURVEURVEURVEURVEURcESfwBTRk0Mw/yonwAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default GachaScreenIcon;
