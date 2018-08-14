import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {CartWizardHostService, WizardEvent} from "./cartWizardHost.service";
import {CreateCartComponent} from "../create/createCart.component";
import {CartFillComponent} from "../fill/cartFill.component";
import {transition, trigger, animate, style} from "@angular/animations";
import {OrderViewComponent} from "../../orders/view/orderView.component";

@Component({
  selector: "cart-wizard",
  templateUrl: "./template.html",
  animations: [
    trigger('change', [
      transition('* => *', [
        style({ opacity: 0, transform: "translateX(50px)" }),
        animate(250, style({ opacity: 1, transform: "translateX(0)" }))
      ]),
    ])
  ]
})
export class CartWizardComponent implements OnInit {
  public component = {
    current: null,
    name: "",
    state: "hidden"
  };

  public steps = [
    {
      id: "create",
      title: "Start A New Order",
      component: CreateCartComponent
    },
    {
      id: "fill",
      title: "Select Items And Quantities",
      component: CartFillComponent
    },
    {
      id: "checkout",
      title: "Review and checkout",
      component: OrderViewComponent
    }
  ];

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  constructor(private cartWizardService:CartWizardHostService, private componentFactoryResolver:ComponentFactoryResolver) {}

  ngOnInit() {
    this.steps.forEach((step) => {
      this.cartWizardService.registerStep(step.id, step.title, step.component);
    });

    this.cartWizardService.fire("next");

    this.cartWizardService.stream()
      .filter(event => {
        return !!event;
      })
      .subscribe(this.eventListener.bind(this))
  }

  eventListener(event:WizardEvent) {
    switch(event.type) {
      case "registered":
        // this.steps.push(event.params);
        break;

      case "switched":
        this.doSwitchComponent(event.params["component"]);
        break;
    }
  }

  doSwitchComponent(component) {
    if(this.component.current) {
      this.component.state = "disappear";
      this.component.current.destroy();
    }

    let instance = this.componentFactoryResolver.resolveComponentFactory(component);

    if(!instance) {
      throw new Error("Failed to instantiate child component");
    }

    this.component.name = component.name;
    this.component.current = this.container.createComponent(instance);
  }

  getComponentState() {
    return this.component.name;
  }

  isStepActive(step) {
    return (step.component.name == this.component.name);
  }

  isStepCompleted(step) {
    let completeUntil = 0;

    this.steps.forEach((stored, index) => {
      if(stored.component.name == this.component.name) {
        completeUntil = index;
      }
    });

    for(let i=0;i<completeUntil; i++) {
      if(this.steps[i].component.name == step.component.name) {
        return true;
      }
    }

    return false;
  }
}
