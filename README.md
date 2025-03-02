
# Host (호스트)
- 역할:
  - Host는 외부에서 제공되는 모듈(또는 컴포넌트)을 동적으로 가져와 애플리케이션 내에서 사용합니다. 즉, 다른 독립적인 애플리케이션(Remote)에서 노출(expose)한 모듈들을 자신의 코드 내에 로드하여 실행하는 “컨테이너” 역할을 합니다.
- 특징:
  - 동적 모듈 로딩: 애플리케이션 실행 중에 Remote에서 제공된 모듈을 불러와 통합합니다.
  - 통합 사용자 경험: 여러 Remote의 모듈을 하나의 통일된 사용자 인터페이스로 구성할 수 있습니다.
  - 의존성 관리: Remote 모듈과의 의존성 충돌을 최소화하기 위해 버전 관리 및 의존성 공유를 신경 씁니다.
  - 사용 예시:
    - 대규모 애플리케이션에서 여러 팀이 독립적으로 개발한 기능(또는 페이지)을 하나의 애플리케이션에서 통합하여 제공할 때, Host는 각 팀에서 제공하는 모듈을 불러오는 역할을 합니다.

# Remote (리모트)
- 역할:
  - Remote는 자신이 가진 모듈, 컴포넌트, 또는 기능을 외부에 노출(expose)합니다. 다른 애플리케이션(Host)이 이 노출된 모듈을 가져다가 사용할 수 있도록 준비된 애플리케이션 또는 모듈 집합입니다.
- 특징:
  - 모듈 노출: 자신이 소유한 특정 모듈을 Module Federation 설정을 통해 외부에 공개합니다.
  - 독립적 배포: 각 Remote는 독립적으로 배포되고 업데이트될 수 있어, Host 애플리케이션은 Remote의 변경 사항을 동적으로 반영할 수 있습니다.
  - 자율적 개발: 각 Remote는 자신만의 개발, 테스트, 배포 사이클을 가질 수 있으며, 필요에 따라 Host와 독립적으로 관리됩니다.
  - 사용 예시:
마이크로 프론트엔드 아키텍처에서 각 팀이 독립적으로 관리하는 기능 모듈(예: 사용자 프로필, 결제 시스템, 채팅 기능 등)을 Remote로 개발하고, 이 모듈들을 Host 애플리케이션에서 동적으로 불러와 전체 사용자 경험을 구성합니다.

# 1. 빌드 타임 공유와 런타임 공유의 장단점:

## 빌드 타임 공유의 장점:

- 안정성: 빌드 타임에 모든 의존성, 라이브러리, 컴포넌트가 묶여 있기 때문에 애플리케이션은 100% 일관된 상태로 배포됨.
- 일관성: 모든 컴포넌트와 의존성이 빌드 타임에 통합되어, 애플리케이션이 실행될 때 모든 코드가 이미 최적화되고 준비됨.
- 타입스크립트 및 유닛 테스트: 타입스크립트와 유닛 테스트가 훨씬 더 용이하고 안정적임. 모든 컴포넌트가 빌드 시에 포함되므로, 빌드 과정에서 발생하는 문제를 미리 잡을 수 있음.
빌드 타임 공유의 단점:

- 동적 업데이트 부족: 빌드 타임 공유는 애플리케이션을 재배포하거나 다시 빌드하지 않으면 새로운 버전의 컴포넌트를 즉시 사용할 수 없음. 이는 동적인 변화가 필요한 애플리케이션에는 불편할 수 있음.
런타임 공유의 장점:

- 동적 업데이트: 런타임 공유는 애플리케이션이 실행 중인 상태에서 다른 애플리케이션에서 변경된 컴포넌트를 실시간으로 반영할 수 있음. 예를 들어, 한 애플리케이션에서 버튼 컴포넌트의 스타일을 변경하면, 이를 사용하는 다른 애플리케이션에서도 즉시 반영됨.
유연성: 여러 애플리케이션 간에 코드나 컴포넌트를 동적으로 공유할 수 있기 때문에, 코드 중복을 줄이고 유지보수를 쉽게 할 수 있음.
런타임 공유의 단점:

- 잠재적인 위험: 동적 공유는 다른 애플리케이션에서 변경된 코드나 컴포넌트가 실시간으로 반영되기 때문에, 의도치 않은 변경이 발생할 수 있고, 이는 런타임에서 예기치 않은 오류를 일으킬 수 있음.
타입스크립트 공유의 문제: 런타임 공유에서는 타입 정보가 공유되지 않아서, 개발자가 코드 변경을 할 때 타입 오류를 미리 확인할 수 없는 문제가 있음.

## 2. Turborepo를 사용한 모노레포 설정과 빌드 타임 공유 구현:

- Turborepo 사용:
모노레포 설정을 위해 Turborepo를 사용하여 두 개의 애플리케이션을 동일한 저장소 내에서 관리하는 방법을 설명함. 모노레포는 두 애플리케이션이 같은 코드베이스에서 관리될 수 있도록 하여, 각 애플리케이션의 의존성 관리와 코드 공유를 용이하게 함.
빌드 타임 공유:
두 애플리케이션이 같은 저장소 내에서 컴포넌트나 상태를 공유하는 방식으로 빌드 타임 공유를 구현. 예를 들어, 'UI' 폴더에 공통 UI 컴포넌트를 두고, 'store' 프로젝트에서 공유 상태를 관리함.
각 애플리케이션은 동일한 저장소 내에서 서로 다른 애플리케이션과 공유할 수 있는 방식으로 구성되며, 이는 build-time sharing 방식으로, 재배포 없이 코드를 업데이트할 수 없지만, 안정성과 일관성을 보장함.
장점: 모노레포 방식에서는 TypeScript와 유닛 테스트가 간편하고, 애플리케이션을 빌드할 때 모든 의존성이 제대로 통합되어 오류가 적게 발생함.
단점: 런타임 공유처럼 동적으로 코드를 업데이트할 수 없다는 제한이 있음.
이러한 방식은 코드베이스를 하나의 저장소에서 관리하면서, 다른 애플리케이션 간에 공유되는 컴포넌트나 상태를 간편하게 구현하는 방법을 제공하지만, 런타임에서 동적 업데이트를 적용하기 위한 추가적인 고려가 필요합니다.