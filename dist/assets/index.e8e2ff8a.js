(function(){const A=document.createElement("link").relList;if(A&&A.supports&&A.supports("modulepreload"))return;for(const C of document.querySelectorAll('link[rel="modulepreload"]'))g(C);new MutationObserver(C=>{for(const B of C)if(B.type==="childList")for(const i of B.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&g(i)}).observe(document,{childList:!0,subtree:!0});function I(C){const B={};return C.integrity&&(B.integrity=C.integrity),C.referrerpolicy&&(B.referrerPolicy=C.referrerpolicy),C.crossorigin==="use-credentials"?B.credentials="include":C.crossorigin==="anonymous"?B.credentials="omit":B.credentials="same-origin",B}function g(C){if(C.ep)return;C.ep=!0;const B=I(C);fetch(C.href,B)}})();const eC=new class{coroutines=[];add(E){const A=E();A.next();const I={generator:A,state:"running"};return this.coroutines.push(I),I}run(){for(let E=this.coroutines.length-1;E>=0;E--){if(this.coroutines[E].state=="stopped")return;const{done:A}=this.coroutines[E].generator.next();A&&this.coroutines.splice(E,1)}}stop(){this.coroutines.forEach(E=>{E.state="stopped"})}resume(){this.coroutines.forEach(E=>{E.state="running"})}},sg=new class{rafHandle=0;accumulatedTime=0;currentTime=0;timeStep=1e3/60;stateName;states=new Map;get state(){return this.stateName?this.states.get(this.stateName):null}cycle=E=>{if(!this.state)return;this.rafHandle=window.requestAnimationFrame(this.cycle),this.accumulatedTime+=E-this.currentTime,this.currentTime=E;let A=!1;for(this.accumulatedTime>60&&(this.accumulatedTime=this.timeStep);this.accumulatedTime>=this.timeStep;)eC.run(),this.state.update(),A=!0,this.accumulatedTime-=this.timeStep;A&&this.state.render()};start(){this.rafHandle=window.requestAnimationFrame(this.cycle)}stop(){window.cancelAnimationFrame(this.rafHandle)}addState(E,A){this.states.set(E,A)}setState(E,A){const I=this.stateName;this.state&&this.state.unset(E),this.stateName=E,this.state?.set(I,A)}},KI={DELETEENTITY:"deleteEntity",XP:"xp",CAMERAMOVE:"cemaraMove",XPPERCENT:"xpPercent",LEVELUP:"levelUP",SKILL:"skill",PATHPOSITION:"PathPosition"};class Xt{subscribers={};subscribe(A,I){return this.subscribers[A]||(this.subscribers[A]=[]),this.subscribers[A].push(I),I}unsubscribe(A,I){if(this.subscribers[A]){const g=this.subscribers[A].indexOf(I);g!==-1&&this.subscribers[A].splice(g,1)}}publish(A,I){this.subscribers[A]&&this.subscribers[A].forEach(g=>g(I))}}const xA=new class{components=new Map;systems=[];entities=new Map;eventBus=new Xt;registerEntity(E){this.entities.set(E.id,E)}getEntityById(E){return this.entities.get(E)}getEntitiesAndComponents(E){const A=this.components.get(E.name);return A?Array.from(A.entries()):[]}registerSystem(E){this.systems.push(new E)}updateSystems(){this.systems.forEach(E=>{const I=[...this.components.get(E.target.name).keys()].map(g=>this.getEntityById(g));E.update(I.filter(g=>g))})}unRegisterSystems(){this.systems=[]}};class fg{target;static register(){xA.registerSystem(this)}constructor(A){this.target=A}}class kI{static register(){xA.components.set(this.name,new Map)}save(){return JSON.stringify(this)}destroy(){}}class cI{parentId=null;id;childrenIds=[];constructor(){this.id=window.crypto.randomUUID(),xA.registerEntity(this)}get children(){return this.childrenIds.map(A=>xA.getEntityById(A))}addChildren(A){return A.parentId=this.id,this.childrenIds.push(A.id),xA.eventBus.subscribe(KI.DELETEENTITY,I=>{this.removeChildren(I)}),A}removeChildren(A){this.childrenIds.includes(A.id)&&this.childrenIds.splice(this.childrenIds.indexOf(A.id),1)}removeComponent(A){xA.components.get(A.constructor.name)?.delete(this.id)}addComponent(A){return A.bind&&A.bind(this.id),xA.components.get(A.constructor.name)?.set(this.id,A),A}getRecursiveComponent(A){return this.getComponent(A)??(this.parent?this.parent.getRecursiveComponent(A):null)}get parent(){return this.parentId?xA.getEntityById(this.parentId):null}getComponent(A){return xA.components.get(A.name)?.get(this.id)}destroy(){xA.eventBus.publish(KI.DELETEENTITY,this);for(let A of this.children)A.destroy();xA.components.forEach(A=>{!A.has(this.id)||(A.get(this.id)?.destroy(),A.delete(this.id))}),xA.entities.delete(this.id)}}let c;const CI=new Array(32).fill(void 0);function sI(E){return CI[E]}CI.push(void 0,null,!0,!1);let $B=CI.length;function ci(E){const A=sI(E);return function(I){I<36||(CI[I]=$B,$B=I)}(E),A}function UI(E){$B===CI.length&&CI.push(CI.length+1);const A=$B;return $B=CI[A],CI[A]=E,A}function YA(E){return E==null}let oi=new Float64Array;function li(){return oi.byteLength===0&&(oi=new Float64Array(c.memory.buffer)),oi}let ei=new Int32Array;function SI(){return ei.byteLength===0&&(ei=new Int32Array(c.memory.buffer)),ei}const $t=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});$t.decode();let ti=new Uint8Array;function Aa(E,A){return $t.decode((ti.byteLength===0&&(ti=new Uint8Array(c.memory.buffer)),ti).subarray(E,E+A))}function L(E,A){if(!(E instanceof A))throw new Error(`expected instance of ${A.name}`);return E.ptr}let ai=new Float32Array;function tC(){return ai.byteLength===0&&(ai=new Float32Array(c.memory.buffer)),ai}let lI=32;function MI(E){if(lI==1)throw new Error("out of js stack");return CI[--lI]=E,lI}function he(E,A){return tC().subarray(E/4,E/4+A)}let si=new Uint32Array;function Ia(){return si.byteLength===0&&(si=new Uint32Array(c.memory.buffer)),si}let kg=0;function lC(E,A){const I=A(4*E.length);return tC().set(E,I/4),kg=E.length,I}function ce(E,A){const I=A(4*E.length);return Ia().set(E,I/4),kg=E.length,I}function eE(E,A){try{return E.apply(this,A)}catch(I){c.__wbindgen_exn_store(UI(I))}}Object.freeze({Revolute:0,0:"Revolute",Fixed:1,1:"Fixed",Prismatic:2,2:"Prismatic",Generic:3,3:"Generic"}),Object.freeze({AccelerationBased:0,0:"AccelerationBased",ForceBased:1,1:"ForceBased"});const fi=Object.freeze({X:0,0:"X",Y:1,1:"Y",AngX:2,2:"AngX"});Object.freeze({Dynamic:0,0:"Dynamic",Fixed:1,1:"Fixed",KinematicPositionBased:2,2:"KinematicPositionBased",KinematicVelocityBased:3,3:"KinematicVelocityBased"}),Object.freeze({Vertex:0,0:"Vertex",Face:1,1:"Face",Unknown:2,2:"Unknown"}),Object.freeze({Ball:0,0:"Ball",Cuboid:1,1:"Cuboid",Capsule:2,2:"Capsule",Segment:3,3:"Segment",Polyline:4,4:"Polyline",Triangle:5,5:"Triangle",TriMesh:6,6:"TriMesh",HeightField:7,7:"HeightField",Compound:8,8:"Compound",ConvexPolygon:9,9:"ConvexPolygon",RoundCuboid:10,10:"RoundCuboid",RoundTriangle:11,11:"RoundTriangle",RoundConvexPolygon:12,12:"RoundConvexPolygon",HalfSpace:13,13:"HalfSpace"});class rC{static __wrap(A){const I=Object.create(rC.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawbroadphase_free(A)}constructor(){const A=c.rawbroadphase_new();return rC.__wrap(A)}}class cB{static __wrap(A){const I=Object.create(cB.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawccdsolver_free(A)}constructor(){const A=c.rawccdsolver_new();return cB.__wrap(A)}}class CQ{static __wrap(A){const I=Object.create(CQ.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawcharactercollision_free(A)}constructor(){const A=c.rawcharactercollision_new();return CQ.__wrap(A)}handle(){return c.rawcharactercollision_handle(this.ptr)}translationApplied(){const A=c.rawcharactercollision_translationApplied(this.ptr);return CA.__wrap(A)}translationRemaining(){const A=c.rawcharactercollision_translationRemaining(this.ptr);return CA.__wrap(A)}toi(){return c.rawcharactercollision_toi(this.ptr)}worldWitness1(){const A=c.rawcharactercollision_worldWitness1(this.ptr);return CA.__wrap(A)}worldWitness2(){const A=c.rawcharactercollision_worldWitness2(this.ptr);return CA.__wrap(A)}worldNormal1(){const A=c.rawcharactercollision_worldNormal1(this.ptr);return CA.__wrap(A)}worldNormal2(){const A=c.rawcharactercollision_worldNormal2(this.ptr);return CA.__wrap(A)}}class RI{static __wrap(A){const I=Object.create(RI.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawcolliderset_free(A)}coTranslation(A){const I=c.rawcolliderset_coTranslation(this.ptr,A);return CA.__wrap(I)}coRotation(A){const I=c.rawcolliderset_coRotation(this.ptr,A);return BI.__wrap(I)}coSetTranslation(A,I,g){c.rawcolliderset_coSetTranslation(this.ptr,A,I,g)}coSetTranslationWrtParent(A,I,g){c.rawcolliderset_coSetTranslationWrtParent(this.ptr,A,I,g)}coSetRotation(A,I){c.rawcolliderset_coSetRotation(this.ptr,A,I)}coSetRotationWrtParent(A,I){c.rawcolliderset_coSetRotationWrtParent(this.ptr,A,I)}coIsSensor(A){return c.rawcolliderset_coIsSensor(this.ptr,A)!==0}coShapeType(A){return c.rawcolliderset_coShapeType(this.ptr,A)>>>0}coHalfspaceNormal(A){const I=c.rawcolliderset_coHalfspaceNormal(this.ptr,A);return I===0?void 0:CA.__wrap(I)}coHalfExtents(A){const I=c.rawcolliderset_coHalfExtents(this.ptr,A);return I===0?void 0:CA.__wrap(I)}coRadius(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coRadius(C,this.ptr,A);var I=SI()[C/4+0],g=tC()[C/4+1];return I===0?void 0:g}finally{c.__wbindgen_add_to_stack_pointer(16)}}coHalfHeight(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coHalfHeight(C,this.ptr,A);var I=SI()[C/4+0],g=tC()[C/4+1];return I===0?void 0:g}finally{c.__wbindgen_add_to_stack_pointer(16)}}coRoundRadius(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coRoundRadius(C,this.ptr,A);var I=SI()[C/4+0],g=tC()[C/4+1];return I===0?void 0:g}finally{c.__wbindgen_add_to_stack_pointer(16)}}coVertices(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coVertices(C,this.ptr,A);var I=SI()[C/4+0],g=SI()[C/4+1];let B;return I!==0&&(B=he(I,g).slice(),c.__wbindgen_free(I,4*g)),B}finally{c.__wbindgen_add_to_stack_pointer(16)}}coIndices(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coIndices(C,this.ptr,A);var I=SI()[C/4+0],g=SI()[C/4+1];let B;return I!==0&&(B=function(i,Q){return Ia().subarray(i/4,i/4+Q)}(I,g).slice(),c.__wbindgen_free(I,4*g)),B}finally{c.__wbindgen_add_to_stack_pointer(16)}}coHeightfieldHeights(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coHeightfieldHeights(C,this.ptr,A);var I=SI()[C/4+0],g=SI()[C/4+1];let B;return I!==0&&(B=he(I,g).slice(),c.__wbindgen_free(I,4*g)),B}finally{c.__wbindgen_add_to_stack_pointer(16)}}coHeightfieldScale(A){const I=c.rawcolliderset_coHeightfieldScale(this.ptr,A);return I===0?void 0:CA.__wrap(I)}coParent(A){try{const C=c.__wbindgen_add_to_stack_pointer(-16);c.rawcolliderset_coParent(C,this.ptr,A);var I=SI()[C/4+0],g=li()[C/8+1];return I===0?void 0:g}finally{c.__wbindgen_add_to_stack_pointer(16)}}coFriction(A){return c.rawcolliderset_coFriction(this.ptr,A)}coRestitution(A){return c.rawcolliderset_coRestitution(this.ptr,A)}coDensity(A){return c.rawcolliderset_coDensity(this.ptr,A)}coMass(A){return c.rawcolliderset_coMass(this.ptr,A)}coVolume(A){return c.rawcolliderset_coVolume(this.ptr,A)}coCollisionGroups(A){return c.rawcolliderset_coCollisionGroups(this.ptr,A)>>>0}coSolverGroups(A){return c.rawcolliderset_coSolverGroups(this.ptr,A)>>>0}coActiveHooks(A){return c.rawcolliderset_coActiveHooks(this.ptr,A)>>>0}coActiveCollisionTypes(A){return c.rawcolliderset_coActiveCollisionTypes(this.ptr,A)}coActiveEvents(A){return c.rawcolliderset_coActiveEvents(this.ptr,A)>>>0}coContactForceEventThreshold(A){return c.rawcolliderset_coContactForceEventThreshold(this.ptr,A)}coContainsPoint(A,I){return L(I,CA),c.rawcolliderset_coContainsPoint(this.ptr,A,I.ptr)!==0}coCastShape(A,I,g,C,B,i,Q,o){L(I,CA),L(g,TA),L(C,CA),L(B,BI),L(i,CA);const e=c.rawcolliderset_coCastShape(this.ptr,A,I.ptr,g.ptr,C.ptr,B.ptr,i.ptr,Q,o);return e===0?void 0:Hi.__wrap(e)}coCastCollider(A,I,g,C,B,i){L(I,CA),L(C,CA);const Q=c.rawcolliderset_coCastCollider(this.ptr,A,I.ptr,g,C.ptr,B,i);return Q===0?void 0:Li.__wrap(Q)}coIntersectsShape(A,I,g,C){return L(I,TA),L(g,CA),L(C,BI),c.rawcolliderset_coIntersectsShape(this.ptr,A,I.ptr,g.ptr,C.ptr)!==0}coContactShape(A,I,g,C,B){L(I,TA),L(g,CA),L(C,BI);const i=c.rawcolliderset_coContactShape(this.ptr,A,I.ptr,g.ptr,C.ptr,B);return i===0?void 0:iQ.__wrap(i)}coContactCollider(A,I,g){const C=c.rawcolliderset_coContactCollider(this.ptr,A,I,g);return C===0?void 0:iQ.__wrap(C)}coProjectPoint(A,I,g){L(I,CA);const C=c.rawcolliderset_coProjectPoint(this.ptr,A,I.ptr,g);return qi.__wrap(C)}coIntersectsRay(A,I,g,C){return L(I,CA),L(g,CA),c.rawcolliderset_coIntersectsRay(this.ptr,A,I.ptr,g.ptr,C)!==0}coCastRay(A,I,g,C,B){return L(I,CA),L(g,CA),c.rawcolliderset_coCastRay(this.ptr,A,I.ptr,g.ptr,C,B)}coCastRayAndGetNormal(A,I,g,C,B){L(I,CA),L(g,CA);const i=c.rawcolliderset_coCastRayAndGetNormal(this.ptr,A,I.ptr,g.ptr,C,B);return i===0?void 0:mi.__wrap(i)}coSetSensor(A,I){c.rawcolliderset_coSetSensor(this.ptr,A,I)}coSetRestitution(A,I){c.rawcolliderset_coSetRestitution(this.ptr,A,I)}coSetFriction(A,I){c.rawcolliderset_coSetFriction(this.ptr,A,I)}coFrictionCombineRule(A){return c.rawcolliderset_coFrictionCombineRule(this.ptr,A)>>>0}coSetFrictionCombineRule(A,I){c.rawcolliderset_coSetFrictionCombineRule(this.ptr,A,I)}coRestitutionCombineRule(A){return c.rawcolliderset_coRestitutionCombineRule(this.ptr,A)>>>0}coSetRestitutionCombineRule(A,I){c.rawcolliderset_coSetRestitutionCombineRule(this.ptr,A,I)}coSetCollisionGroups(A,I){c.rawcolliderset_coSetCollisionGroups(this.ptr,A,I)}coSetSolverGroups(A,I){c.rawcolliderset_coSetSolverGroups(this.ptr,A,I)}coSetActiveHooks(A,I){c.rawcolliderset_coSetActiveHooks(this.ptr,A,I)}coSetActiveEvents(A,I){c.rawcolliderset_coSetActiveEvents(this.ptr,A,I)}coSetActiveCollisionTypes(A,I){c.rawcolliderset_coSetActiveCollisionTypes(this.ptr,A,I)}coSetShape(A,I){L(I,TA),c.rawcolliderset_coSetShape(this.ptr,A,I.ptr)}coSetContactForceEventThreshold(A,I){c.rawcolliderset_coSetContactForceEventThreshold(this.ptr,A,I)}coSetDensity(A,I){c.rawcolliderset_coSetDensity(this.ptr,A,I)}coSetMass(A,I){c.rawcolliderset_coSetMass(this.ptr,A,I)}coSetMassProperties(A,I,g,C){L(g,CA),c.rawcolliderset_coSetMassProperties(this.ptr,A,I,g.ptr,C)}constructor(){const A=c.rawcolliderset_new();return RI.__wrap(A)}len(){return c.rawcolliderset_len(this.ptr)>>>0}contains(A){return c.rawcolliderset_contains(this.ptr,A)!==0}createCollider(A,I,g,C,B,i,Q,o,e,t,a,s,n,h,D,r,G,w,S,y,M,p){try{const N=c.__wbindgen_add_to_stack_pointer(-16);L(A,TA),L(I,CA),L(g,BI),L(i,CA),L(p,FI),c.rawcolliderset_createCollider(N,this.ptr,A.ptr,I.ptr,g.ptr,C,B,i.ptr,Q,o,e,t,a,s,n,h,D,r,G,w,S,y,M,p.ptr);var U=SI()[N/4+0],l=li()[N/8+1];return U===0?void 0:l}finally{c.__wbindgen_add_to_stack_pointer(16)}}remove(A,I,g,C){L(I,Jg),L(g,FI),c.rawcolliderset_remove(this.ptr,A,I.ptr,g.ptr,C)}isHandleValid(A){return c.rawcolliderset_contains(this.ptr,A)!==0}forEachColliderHandle(A){try{c.rawcolliderset_forEachColliderHandle(this.ptr,MI(A))}finally{CI[lI++]=void 0}}}class ho{static __wrap(A){const I=Object.create(ho.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawcontactforceevent_free(A)}collider1(){return c.rawcharactercollision_handle(this.ptr)}collider2(){return c.rawcontactforceevent_collider2(this.ptr)}total_force(){const A=c.rawcontactforceevent_total_force(this.ptr);return CA.__wrap(A)}total_force_magnitude(){return c.rawcontactforceevent_total_force_magnitude(this.ptr)}max_force_direction(){const A=c.rawcontactforceevent_max_force_direction(this.ptr);return CA.__wrap(A)}max_force_magnitude(){return c.rawcontactforceevent_max_force_magnitude(this.ptr)}}class co{static __wrap(A){const I=Object.create(co.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawcontactmanifold_free(A)}normal(){const A=c.rawcontactmanifold_normal(this.ptr);return CA.__wrap(A)}local_n1(){const A=c.rawcontactmanifold_local_n1(this.ptr);return CA.__wrap(A)}local_n2(){const A=c.rawcontactmanifold_local_n2(this.ptr);return CA.__wrap(A)}subshape1(){return c.rawcontactmanifold_subshape1(this.ptr)>>>0}subshape2(){return c.rawcontactmanifold_subshape2(this.ptr)>>>0}num_contacts(){return c.rawcontactmanifold_num_contacts(this.ptr)>>>0}contact_local_p1(A){const I=c.rawcontactmanifold_contact_local_p1(this.ptr,A);return I===0?void 0:CA.__wrap(I)}contact_local_p2(A){const I=c.rawcontactmanifold_contact_local_p2(this.ptr,A);return I===0?void 0:CA.__wrap(I)}contact_dist(A){return c.rawcontactmanifold_contact_dist(this.ptr,A)}contact_fid1(A){return c.rawcontactmanifold_contact_fid1(this.ptr,A)>>>0}contact_fid2(A){return c.rawcontactmanifold_contact_fid2(this.ptr,A)>>>0}contact_impulse(A){return c.rawcontactmanifold_contact_impulse(this.ptr,A)}contact_tangent_impulse(A){return c.rawcontactmanifold_contact_tangent_impulse(this.ptr,A)}num_solver_contacts(){return c.rawcontactmanifold_num_solver_contacts(this.ptr)>>>0}solver_contact_point(A){const I=c.rawcontactmanifold_solver_contact_point(this.ptr,A);return I===0?void 0:CA.__wrap(I)}solver_contact_dist(A){return c.rawcontactmanifold_solver_contact_dist(this.ptr,A)}solver_contact_friction(A){return c.rawcontactmanifold_solver_contact_friction(this.ptr,A)}solver_contact_restitution(A){return c.rawcontactmanifold_solver_contact_restitution(this.ptr,A)}solver_contact_tangent_velocity(A){const I=c.rawcontactmanifold_solver_contact_tangent_velocity(this.ptr,A);return CA.__wrap(I)}}class lo{static __wrap(A){const I=Object.create(lo.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawcontactpair_free(A)}collider1(){return c.rawcontactpair_collider1(this.ptr)}collider2(){return c.rawcontactpair_collider2(this.ptr)}numContactManifolds(){return c.rawcontactpair_numContactManifolds(this.ptr)>>>0}contactManifold(A){const I=c.rawcontactpair_contactManifold(this.ptr,A);return I===0?void 0:co.__wrap(I)}}class wi{static __wrap(A){const I=Object.create(wi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawdebugrenderpipeline_free(A)}constructor(){const A=c.rawdebugrenderpipeline_new();return wi.__wrap(A)}vertices(){return ci(c.rawdebugrenderpipeline_vertices(this.ptr))}colors(){return ci(c.rawdebugrenderpipeline_colors(this.ptr))}render(A,I,g,C,B){L(A,FI),L(I,RI),L(g,vg),L(C,xg),L(B,zg),c.rawdebugrenderpipeline_render(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr)}}class wo{static __wrap(A){const I=Object.create(wo.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawdeserializedworld_free(A)}takeGravity(){const A=c.rawdeserializedworld_takeGravity(this.ptr);return A===0?void 0:CA.__wrap(A)}takeIntegrationParameters(){const A=c.rawdeserializedworld_takeIntegrationParameters(this.ptr);return A===0?void 0:DC.__wrap(A)}takeIslandManager(){const A=c.rawdeserializedworld_takeIslandManager(this.ptr);return A===0?void 0:Jg.__wrap(A)}takeBroadPhase(){const A=c.rawdeserializedworld_takeBroadPhase(this.ptr);return A===0?void 0:rC.__wrap(A)}takeNarrowPhase(){const A=c.rawdeserializedworld_takeNarrowPhase(this.ptr);return A===0?void 0:zg.__wrap(A)}takeBodies(){const A=c.rawdeserializedworld_takeBodies(this.ptr);return A===0?void 0:FI.__wrap(A)}takeColliders(){const A=c.rawdeserializedworld_takeColliders(this.ptr);return A===0?void 0:RI.__wrap(A)}takeImpulseJoints(){const A=c.rawdeserializedworld_takeImpulseJoints(this.ptr);return A===0?void 0:vg.__wrap(A)}takeMultibodyJoints(){const A=c.rawdeserializedworld_takeMultibodyJoints(this.ptr);return A===0?void 0:xg.__wrap(A)}}class BQ{static __wrap(A){const I=Object.create(BQ.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_raweventqueue_free(A)}constructor(A){const I=c.raweventqueue_new(A);return BQ.__wrap(I)}drainCollisionEvents(A){try{c.raweventqueue_drainCollisionEvents(this.ptr,MI(A))}finally{CI[lI++]=void 0}}drainContactForceEvents(A){try{c.raweventqueue_drainContactForceEvents(this.ptr,MI(A))}finally{CI[lI++]=void 0}}clear(){c.raweventqueue_clear(this.ptr)}}class bg{static __wrap(A){const I=Object.create(bg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawgenericjoint_free(A)}static prismatic(A,I,g,C,B,i){L(A,CA),L(I,CA),L(g,CA);const Q=c.rawgenericjoint_prismatic(A.ptr,I.ptr,g.ptr,C,B,i);return Q===0?void 0:bg.__wrap(Q)}static fixed(A,I,g,C){L(A,CA),L(I,BI),L(g,CA),L(C,BI);const B=c.rawgenericjoint_fixed(A.ptr,I.ptr,g.ptr,C.ptr);return bg.__wrap(B)}static revolute(A,I){L(A,CA),L(I,CA);const g=c.rawgenericjoint_revolute(A.ptr,I.ptr);return g===0?void 0:bg.__wrap(g)}}class vg{static __wrap(A){const I=Object.create(vg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawimpulsejointset_free(A)}jointType(A){return c.rawimpulsejointset_jointType(this.ptr,A)>>>0}jointBodyHandle1(A){return c.rawimpulsejointset_jointBodyHandle1(this.ptr,A)}jointBodyHandle2(A){return c.rawimpulsejointset_jointBodyHandle2(this.ptr,A)}jointFrameX1(A){const I=c.rawimpulsejointset_jointFrameX1(this.ptr,A);return BI.__wrap(I)}jointFrameX2(A){const I=c.rawimpulsejointset_jointFrameX2(this.ptr,A);return BI.__wrap(I)}jointAnchor1(A){const I=c.rawimpulsejointset_jointAnchor1(this.ptr,A);return CA.__wrap(I)}jointAnchor2(A){const I=c.rawimpulsejointset_jointAnchor2(this.ptr,A);return CA.__wrap(I)}jointSetAnchor1(A,I){L(I,CA),c.rawimpulsejointset_jointSetAnchor1(this.ptr,A,I.ptr)}jointSetAnchor2(A,I){L(I,CA),c.rawimpulsejointset_jointSetAnchor2(this.ptr,A,I.ptr)}jointContactsEnabled(A){return c.rawimpulsejointset_jointContactsEnabled(this.ptr,A)!==0}jointSetContactsEnabled(A,I){c.rawimpulsejointset_jointSetContactsEnabled(this.ptr,A,I)}jointLimitsEnabled(A,I){return c.rawimpulsejointset_jointLimitsEnabled(this.ptr,A,I)!==0}jointLimitsMin(A,I){return c.rawimpulsejointset_jointLimitsMin(this.ptr,A,I)}jointLimitsMax(A,I){return c.rawimpulsejointset_jointLimitsMax(this.ptr,A,I)}jointSetLimits(A,I,g,C){c.rawimpulsejointset_jointSetLimits(this.ptr,A,I,g,C)}jointConfigureMotorModel(A,I,g){c.rawimpulsejointset_jointConfigureMotorModel(this.ptr,A,I,g)}jointConfigureMotorVelocity(A,I,g,C){c.rawimpulsejointset_jointConfigureMotorVelocity(this.ptr,A,I,g,C)}jointConfigureMotorPosition(A,I,g,C,B){c.rawimpulsejointset_jointConfigureMotorPosition(this.ptr,A,I,g,C,B)}jointConfigureMotor(A,I,g,C,B,i){c.rawimpulsejointset_jointConfigureMotor(this.ptr,A,I,g,C,B,i)}constructor(){const A=c.rawimpulsejointset_new();return vg.__wrap(A)}createJoint(A,I,g,C){return L(A,bg),c.rawimpulsejointset_createJoint(this.ptr,A.ptr,I,g,C)}remove(A,I){c.rawimpulsejointset_remove(this.ptr,A,I)}len(){return c.rawimpulsejointset_len(this.ptr)>>>0}contains(A){return c.rawimpulsejointset_contains(this.ptr,A)!==0}forEachJointHandle(A){try{c.rawimpulsejointset_forEachJointHandle(this.ptr,MI(A))}finally{CI[lI++]=void 0}}forEachJointAttachedToRigidBody(A,I){try{c.rawimpulsejointset_forEachJointAttachedToRigidBody(this.ptr,A,MI(I))}finally{CI[lI++]=void 0}}}class DC{static __wrap(A){const I=Object.create(DC.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawintegrationparameters_free(A)}constructor(){const A=c.rawintegrationparameters_new();return DC.__wrap(A)}get dt(){return c.rawintegrationparameters_dt(this.ptr)}get erp(){return c.rawintegrationparameters_erp(this.ptr)}get allowedLinearError(){return c.rawintegrationparameters_allowedLinearError(this.ptr)}get predictionDistance(){return c.rawintegrationparameters_predictionDistance(this.ptr)}get maxVelocityIterations(){return c.rawintegrationparameters_maxVelocityIterations(this.ptr)>>>0}get maxVelocityFrictionIterations(){return c.rawintegrationparameters_maxVelocityFrictionIterations(this.ptr)>>>0}get maxStabilizationIterations(){return c.rawintegrationparameters_maxStabilizationIterations(this.ptr)>>>0}get minIslandSize(){return c.rawintegrationparameters_minIslandSize(this.ptr)>>>0}get maxCcdSubsteps(){return c.rawintegrationparameters_maxCcdSubsteps(this.ptr)>>>0}set dt(A){c.rawintegrationparameters_set_dt(this.ptr,A)}set erp(A){c.rawintegrationparameters_set_erp(this.ptr,A)}set allowedLinearError(A){c.rawintegrationparameters_set_allowedLinearError(this.ptr,A)}set predictionDistance(A){c.rawintegrationparameters_set_predictionDistance(this.ptr,A)}set maxVelocityIterations(A){c.rawintegrationparameters_set_maxVelocityIterations(this.ptr,A)}set maxVelocityFrictionIterations(A){c.rawintegrationparameters_set_maxVelocityFrictionIterations(this.ptr,A)}set maxStabilizationIterations(A){c.rawintegrationparameters_set_maxStabilizationIterations(this.ptr,A)}set minIslandSize(A){c.rawintegrationparameters_set_minIslandSize(this.ptr,A)}set maxCcdSubsteps(A){c.rawintegrationparameters_set_maxCcdSubsteps(this.ptr,A)}}class Jg{static __wrap(A){const I=Object.create(Jg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawislandmanager_free(A)}constructor(){const A=c.rawislandmanager_new();return Jg.__wrap(A)}forEachActiveRigidBodyHandle(A){try{c.rawislandmanager_forEachActiveRigidBodyHandle(this.ptr,MI(A))}finally{CI[lI++]=void 0}}}class Gi{static __wrap(A){const I=Object.create(Gi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawkinematiccharactercontroller_free(A)}constructor(A){const I=c.rawkinematiccharactercontroller_new(A);return Gi.__wrap(I)}up(){const A=c.rawkinematiccharactercontroller_up(this.ptr);return CA.__wrap(A)}setUp(A){L(A,CA),c.rawkinematiccharactercontroller_setUp(this.ptr,A.ptr)}offset(){return c.rawkinematiccharactercontroller_offset(this.ptr)}setOffset(A){c.rawkinematiccharactercontroller_setOffset(this.ptr,A)}slideEnabled(){return c.rawkinematiccharactercontroller_slideEnabled(this.ptr)!==0}setSlideEnabled(A){c.rawkinematiccharactercontroller_setSlideEnabled(this.ptr,A)}autostepMaxHeight(){try{const g=c.__wbindgen_add_to_stack_pointer(-16);c.rawkinematiccharactercontroller_autostepMaxHeight(g,this.ptr);var A=SI()[g/4+0],I=tC()[g/4+1];return A===0?void 0:I}finally{c.__wbindgen_add_to_stack_pointer(16)}}autostepMinWidth(){try{const g=c.__wbindgen_add_to_stack_pointer(-16);c.rawkinematiccharactercontroller_autostepMinWidth(g,this.ptr);var A=SI()[g/4+0],I=tC()[g/4+1];return A===0?void 0:I}finally{c.__wbindgen_add_to_stack_pointer(16)}}autostepIncludesDynamicBodies(){const A=c.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.ptr);return A===16777215?void 0:A!==0}autostepEnabled(){return c.rawkinematiccharactercontroller_autostepEnabled(this.ptr)!==0}enableAutostep(A,I,g){c.rawkinematiccharactercontroller_enableAutostep(this.ptr,A,I,g)}disableAutostep(){c.rawkinematiccharactercontroller_disableAutostep(this.ptr)}maxSlopeClimbAngle(){return c.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.ptr)}setMaxSlopeClimbAngle(A){c.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.ptr,A)}minSlopeSlideAngle(){return c.rawkinematiccharactercontroller_minSlopeSlideAngle(this.ptr)}setMinSlopeSlideAngle(A){c.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.ptr,A)}snapToGroundDistance(){try{const g=c.__wbindgen_add_to_stack_pointer(-16);c.rawkinematiccharactercontroller_snapToGroundDistance(g,this.ptr);var A=SI()[g/4+0],I=tC()[g/4+1];return A===0?void 0:I}finally{c.__wbindgen_add_to_stack_pointer(16)}}enableSnapToGround(A){c.rawkinematiccharactercontroller_enableSnapToGround(this.ptr,A)}disableSnapToGround(){c.rawkinematiccharactercontroller_disableSnapToGround(this.ptr)}snapToGroundEnabled(){return c.rawkinematiccharactercontroller_snapToGroundEnabled(this.ptr)!==0}computeColliderMovement(A,I,g,C,B,i,Q,o,e,t,a){try{L(I,FI),L(g,RI),L(C,QQ),L(i,CA),c.rawkinematiccharactercontroller_computeColliderMovement(this.ptr,A,I.ptr,g.ptr,C.ptr,B,i.ptr,Q,!YA(o),YA(o)?0:o,e,!YA(t),YA(t)?0:t,MI(a))}finally{CI[lI++]=void 0}}computedMovement(){const A=c.rawkinematiccharactercontroller_computedMovement(this.ptr);return CA.__wrap(A)}computedGrounded(){return c.rawkinematiccharactercontroller_computedGrounded(this.ptr)!==0}numComputedCollisions(){return c.rawkinematiccharactercontroller_numComputedCollisions(this.ptr)>>>0}computedCollision(A,I){return L(I,CQ),c.rawkinematiccharactercontroller_computedCollision(this.ptr,A,I.ptr)!==0}}class xg{static __wrap(A){const I=Object.create(xg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawmultibodyjointset_free(A)}jointType(A){return c.rawmultibodyjointset_jointType(this.ptr,A)>>>0}jointFrameX1(A){const I=c.rawmultibodyjointset_jointFrameX1(this.ptr,A);return BI.__wrap(I)}jointFrameX2(A){const I=c.rawmultibodyjointset_jointFrameX2(this.ptr,A);return BI.__wrap(I)}jointAnchor1(A){const I=c.rawmultibodyjointset_jointAnchor1(this.ptr,A);return CA.__wrap(I)}jointAnchor2(A){const I=c.rawmultibodyjointset_jointAnchor2(this.ptr,A);return CA.__wrap(I)}jointContactsEnabled(A){return c.rawmultibodyjointset_jointContactsEnabled(this.ptr,A)!==0}jointSetContactsEnabled(A,I){c.rawmultibodyjointset_jointSetContactsEnabled(this.ptr,A,I)}jointLimitsEnabled(A,I){return c.rawmultibodyjointset_jointLimitsEnabled(this.ptr,A,I)!==0}jointLimitsMin(A,I){return c.rawmultibodyjointset_jointLimitsMin(this.ptr,A,I)}jointLimitsMax(A,I){return c.rawmultibodyjointset_jointLimitsMax(this.ptr,A,I)}constructor(){const A=c.rawmultibodyjointset_new();return xg.__wrap(A)}createJoint(A,I,g,C){return L(A,bg),c.rawmultibodyjointset_createJoint(this.ptr,A.ptr,I,g,C)}remove(A,I){c.rawmultibodyjointset_remove(this.ptr,A,I)}contains(A){return c.rawmultibodyjointset_contains(this.ptr,A)!==0}forEachJointHandle(A){try{c.rawmultibodyjointset_forEachJointHandle(this.ptr,MI(A))}finally{CI[lI++]=void 0}}forEachJointAttachedToRigidBody(A,I){try{c.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.ptr,A,MI(I))}finally{CI[lI++]=void 0}}}class zg{static __wrap(A){const I=Object.create(zg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawnarrowphase_free(A)}constructor(){const A=c.rawnarrowphase_new();return zg.__wrap(A)}contacts_with(A,I){c.rawnarrowphase_contacts_with(this.ptr,A,UI(I))}contact_pair(A,I){const g=c.rawnarrowphase_contact_pair(this.ptr,A,I);return g===0?void 0:lo.__wrap(g)}intersections_with(A,I){c.rawnarrowphase_intersections_with(this.ptr,A,UI(I))}intersection_pair(A,I){return c.rawnarrowphase_intersection_pair(this.ptr,A,I)!==0}}class Si{static __wrap(A){const I=Object.create(Si.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawphysicspipeline_free(A)}constructor(){const A=c.rawphysicspipeline_new();return Si.__wrap(A)}step(A,I,g,C,B,i,Q,o,e,t){L(A,CA),L(I,DC),L(g,Jg),L(C,rC),L(B,zg),L(i,FI),L(Q,RI),L(o,vg),L(e,xg),L(t,cB),c.rawphysicspipeline_step(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i.ptr,Q.ptr,o.ptr,e.ptr,t.ptr)}stepWithEvents(A,I,g,C,B,i,Q,o,e,t,a,s,n,h){L(A,CA),L(I,DC),L(g,Jg),L(C,rC),L(B,zg),L(i,FI),L(Q,RI),L(o,vg),L(e,xg),L(t,cB),L(a,BQ),c.rawphysicspipeline_stepWithEvents(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i.ptr,Q.ptr,o.ptr,e.ptr,t.ptr,a.ptr,UI(s),UI(n),UI(h))}}class di{static __wrap(A){const I=Object.create(di.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawpointcolliderprojection_free(A)}colliderHandle(){return c.rawcharactercollision_handle(this.ptr)}point(){const A=c.rawpointcolliderprojection_point(this.ptr);return CA.__wrap(A)}isInside(){return c.rawpointcolliderprojection_isInside(this.ptr)!==0}featureType(){return c.rawpointcolliderprojection_featureType(this.ptr)>>>0}featureId(){try{const g=c.__wbindgen_add_to_stack_pointer(-16);c.rawpointcolliderprojection_featureId(g,this.ptr);var A=SI()[g/4+0],I=SI()[g/4+1];return A===0?void 0:I>>>0}finally{c.__wbindgen_add_to_stack_pointer(16)}}}class qi{static __wrap(A){const I=Object.create(qi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawpointprojection_free(A)}point(){const A=c.rawkinematiccharactercontroller_up(this.ptr);return CA.__wrap(A)}isInside(){return c.rawpointprojection_isInside(this.ptr)!==0}}class QQ{static __wrap(A){const I=Object.create(QQ.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawquerypipeline_free(A)}constructor(){const A=c.rawquerypipeline_new();return QQ.__wrap(A)}update(A,I,g){L(A,Jg),L(I,FI),L(g,RI),c.rawquerypipeline_update(this.ptr,A.ptr,I.ptr,g.ptr)}castRay(A,I,g,C,B,i,Q,o,e,t,a){try{L(A,FI),L(I,RI),L(g,CA),L(C,CA);const s=c.rawquerypipeline_castRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,i,Q,!YA(o),YA(o)?0:o,!YA(e),YA(e)?0:e,!YA(t),YA(t)?0:t,MI(a));return s===0?void 0:Go.__wrap(s)}finally{CI[lI++]=void 0}}castRayAndGetNormal(A,I,g,C,B,i,Q,o,e,t,a){try{L(A,FI),L(I,RI),L(g,CA),L(C,CA);const s=c.rawquerypipeline_castRayAndGetNormal(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,i,Q,!YA(o),YA(o)?0:o,!YA(e),YA(e)?0:e,!YA(t),YA(t)?0:t,MI(a));return s===0?void 0:Yi.__wrap(s)}finally{CI[lI++]=void 0}}intersectionsWithRay(A,I,g,C,B,i,Q,o,e,t,a,s){try{L(A,FI),L(I,RI),L(g,CA),L(C,CA),c.rawquerypipeline_intersectionsWithRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,i,MI(Q),o,!YA(e),YA(e)?0:e,!YA(t),YA(t)?0:t,!YA(a),YA(a)?0:a,MI(s))}finally{CI[lI++]=void 0,CI[lI++]=void 0}}intersectionWithShape(A,I,g,C,B,i,Q,o,e,t){try{const n=c.__wbindgen_add_to_stack_pointer(-16);L(A,FI),L(I,RI),L(g,CA),L(C,BI),L(B,TA),c.rawquerypipeline_intersectionWithShape(n,this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i,!YA(Q),YA(Q)?0:Q,!YA(o),YA(o)?0:o,!YA(e),YA(e)?0:e,MI(t));var a=SI()[n/4+0],s=li()[n/8+1];return a===0?void 0:s}finally{c.__wbindgen_add_to_stack_pointer(16),CI[lI++]=void 0}}projectPoint(A,I,g,C,B,i,Q,o,e){try{L(A,FI),L(I,RI),L(g,CA);const t=c.rawquerypipeline_projectPoint(this.ptr,A.ptr,I.ptr,g.ptr,C,B,!YA(i),YA(i)?0:i,!YA(Q),YA(Q)?0:Q,!YA(o),YA(o)?0:o,MI(e));return t===0?void 0:di.__wrap(t)}finally{CI[lI++]=void 0}}projectPointAndGetFeature(A,I,g,C,B,i,Q,o){try{L(A,FI),L(I,RI),L(g,CA);const e=c.rawquerypipeline_projectPointAndGetFeature(this.ptr,A.ptr,I.ptr,g.ptr,C,!YA(B),YA(B)?0:B,!YA(i),YA(i)?0:i,!YA(Q),YA(Q)?0:Q,MI(o));return e===0?void 0:di.__wrap(e)}finally{CI[lI++]=void 0}}intersectionsWithPoint(A,I,g,C,B,i,Q,o,e){try{L(A,FI),L(I,RI),L(g,CA),c.rawquerypipeline_intersectionsWithPoint(this.ptr,A.ptr,I.ptr,g.ptr,MI(C),B,!YA(i),YA(i)?0:i,!YA(Q),YA(Q)?0:Q,!YA(o),YA(o)?0:o,MI(e))}finally{CI[lI++]=void 0,CI[lI++]=void 0}}castShape(A,I,g,C,B,i,Q,o,e,t,a,s,n){try{L(A,FI),L(I,RI),L(g,CA),L(C,BI),L(B,CA),L(i,TA);const h=c.rawquerypipeline_castShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i.ptr,Q,o,e,!YA(t),YA(t)?0:t,!YA(a),YA(a)?0:a,!YA(s),YA(s)?0:s,MI(n));return h===0?void 0:Li.__wrap(h)}finally{CI[lI++]=void 0}}intersectionsWithShape(A,I,g,C,B,i,Q,o,e,t,a){try{L(A,FI),L(I,RI),L(g,CA),L(C,BI),L(B,TA),c.rawquerypipeline_intersectionsWithShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,MI(i),Q,!YA(o),YA(o)?0:o,!YA(e),YA(e)?0:e,!YA(t),YA(t)?0:t,MI(a))}finally{CI[lI++]=void 0,CI[lI++]=void 0}}collidersWithAabbIntersectingAabb(A,I,g){try{L(A,CA),L(I,CA),c.rawquerypipeline_collidersWithAabbIntersectingAabb(this.ptr,A.ptr,I.ptr,MI(g))}finally{CI[lI++]=void 0}}}class Yi{static __wrap(A){const I=Object.create(Yi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawraycolliderintersection_free(A)}colliderHandle(){return c.rawcharactercollision_handle(this.ptr)}normal(){const A=c.rawraycolliderintersection_normal(this.ptr);return CA.__wrap(A)}toi(){return c.rawraycolliderintersection_toi(this.ptr)}featureType(){return c.rawpointcolliderprojection_featureType(this.ptr)>>>0}featureId(){try{const g=c.__wbindgen_add_to_stack_pointer(-16);c.rawpointcolliderprojection_featureId(g,this.ptr);var A=SI()[g/4+0],I=SI()[g/4+1];return A===0?void 0:I>>>0}finally{c.__wbindgen_add_to_stack_pointer(16)}}}class Go{static __wrap(A){const I=Object.create(Go.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawraycollidertoi_free(A)}colliderHandle(){return c.rawcharactercollision_handle(this.ptr)}toi(){return c.rawraycolliderintersection_toi(this.ptr)}}class mi{static __wrap(A){const I=Object.create(mi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawrayintersection_free(A)}normal(){const A=c.rawrayintersection_normal(this.ptr);return CA.__wrap(A)}toi(){return c.rawintegrationparameters_dt(this.ptr)}featureType(){return c.rawrayintersection_featureType(this.ptr)>>>0}featureId(){try{const g=c.__wbindgen_add_to_stack_pointer(-16);c.rawrayintersection_featureId(g,this.ptr);var A=SI()[g/4+0],I=SI()[g/4+1];return A===0?void 0:I>>>0}finally{c.__wbindgen_add_to_stack_pointer(16)}}}class FI{static __wrap(A){const I=Object.create(FI.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawrigidbodyset_free(A)}rbTranslation(A){const I=c.rawrigidbodyset_rbTranslation(this.ptr,A);return CA.__wrap(I)}rbRotation(A){const I=c.rawrigidbodyset_rbRotation(this.ptr,A);return BI.__wrap(I)}rbSleep(A){c.rawrigidbodyset_rbSleep(this.ptr,A)}rbIsSleeping(A){return c.rawrigidbodyset_rbIsSleeping(this.ptr,A)!==0}rbIsMoving(A){return c.rawrigidbodyset_rbIsMoving(this.ptr,A)!==0}rbNextTranslation(A){const I=c.rawrigidbodyset_rbNextTranslation(this.ptr,A);return CA.__wrap(I)}rbNextRotation(A){const I=c.rawrigidbodyset_rbNextRotation(this.ptr,A);return BI.__wrap(I)}rbSetTranslation(A,I,g,C){c.rawrigidbodyset_rbSetTranslation(this.ptr,A,I,g,C)}rbSetRotation(A,I,g){c.rawrigidbodyset_rbSetRotation(this.ptr,A,I,g)}rbSetLinvel(A,I,g){L(I,CA),c.rawrigidbodyset_rbSetLinvel(this.ptr,A,I.ptr,g)}rbSetAngvel(A,I,g){c.rawrigidbodyset_rbSetAngvel(this.ptr,A,I,g)}rbSetNextKinematicTranslation(A,I,g){c.rawrigidbodyset_rbSetNextKinematicTranslation(this.ptr,A,I,g)}rbSetNextKinematicRotation(A,I){c.rawrigidbodyset_rbSetNextKinematicRotation(this.ptr,A,I)}rbRecomputeMassPropertiesFromColliders(A,I){L(I,RI),c.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.ptr,A,I.ptr)}rbSetAdditionalMass(A,I,g){c.rawrigidbodyset_rbSetAdditionalMass(this.ptr,A,I,g)}rbSetAdditionalMassProperties(A,I,g,C,B){L(g,CA),c.rawrigidbodyset_rbSetAdditionalMassProperties(this.ptr,A,I,g.ptr,C,B)}rbLinvel(A){const I=c.rawrigidbodyset_rbLinvel(this.ptr,A);return CA.__wrap(I)}rbAngvel(A){return c.rawrigidbodyset_rbAngvel(this.ptr,A)}rbLockTranslations(A,I,g){c.rawrigidbodyset_rbLockTranslations(this.ptr,A,I,g)}rbSetEnabledTranslations(A,I,g,C){c.rawrigidbodyset_rbSetEnabledTranslations(this.ptr,A,I,g,C)}rbLockRotations(A,I,g){c.rawrigidbodyset_rbLockRotations(this.ptr,A,I,g)}rbDominanceGroup(A){return c.rawrigidbodyset_rbDominanceGroup(this.ptr,A)}rbSetDominanceGroup(A,I){c.rawrigidbodyset_rbSetDominanceGroup(this.ptr,A,I)}rbEnableCcd(A,I){c.rawrigidbodyset_rbEnableCcd(this.ptr,A,I)}rbMass(A){return c.rawrigidbodyset_rbMass(this.ptr,A)}rbWakeUp(A){c.rawrigidbodyset_rbWakeUp(this.ptr,A)}rbIsCcdEnabled(A){return c.rawrigidbodyset_rbIsCcdEnabled(this.ptr,A)!==0}rbNumColliders(A){return c.rawrigidbodyset_rbNumColliders(this.ptr,A)>>>0}rbCollider(A,I){return c.rawrigidbodyset_rbCollider(this.ptr,A,I)}rbBodyType(A){return c.rawrigidbodyset_rbBodyType(this.ptr,A)>>>0}rbSetBodyType(A,I){c.rawrigidbodyset_rbSetBodyType(this.ptr,A,I)}rbIsFixed(A){return c.rawrigidbodyset_rbIsFixed(this.ptr,A)!==0}rbIsKinematic(A){return c.rawrigidbodyset_rbIsKinematic(this.ptr,A)!==0}rbIsDynamic(A){return c.rawrigidbodyset_rbIsDynamic(this.ptr,A)!==0}rbLinearDamping(A){return c.rawrigidbodyset_rbLinearDamping(this.ptr,A)}rbAngularDamping(A){return c.rawrigidbodyset_rbAngularDamping(this.ptr,A)}rbSetLinearDamping(A,I){c.rawrigidbodyset_rbSetLinearDamping(this.ptr,A,I)}rbSetAngularDamping(A,I){c.rawrigidbodyset_rbSetAngularDamping(this.ptr,A,I)}rbGravityScale(A){return c.rawrigidbodyset_rbGravityScale(this.ptr,A)}rbSetGravityScale(A,I,g){c.rawrigidbodyset_rbSetGravityScale(this.ptr,A,I,g)}rbResetForces(A,I){c.rawrigidbodyset_rbResetForces(this.ptr,A,I)}rbResetTorques(A,I){c.rawrigidbodyset_rbResetTorques(this.ptr,A,I)}rbAddForce(A,I,g){L(I,CA),c.rawrigidbodyset_rbAddForce(this.ptr,A,I.ptr,g)}rbApplyImpulse(A,I,g){L(I,CA),c.rawrigidbodyset_rbApplyImpulse(this.ptr,A,I.ptr,g)}rbAddTorque(A,I,g){c.rawrigidbodyset_rbAddTorque(this.ptr,A,I,g)}rbApplyTorqueImpulse(A,I,g){c.rawrigidbodyset_rbApplyTorqueImpulse(this.ptr,A,I,g)}rbAddForceAtPoint(A,I,g,C){L(I,CA),L(g,CA),c.rawrigidbodyset_rbAddForceAtPoint(this.ptr,A,I.ptr,g.ptr,C)}rbApplyImpulseAtPoint(A,I,g,C){L(I,CA),L(g,CA),c.rawrigidbodyset_rbApplyImpulseAtPoint(this.ptr,A,I.ptr,g.ptr,C)}rbUserData(A){return c.rawrigidbodyset_rbUserData(this.ptr,A)>>>0}rbSetUserData(A,I){c.rawrigidbodyset_rbSetUserData(this.ptr,A,I)}constructor(){const A=c.rawrigidbodyset_new();return FI.__wrap(A)}createRigidBody(A,I,g,C,B,i,Q,o,e,t,a,s,n,h,D,r,G,w,S){return L(A,CA),L(I,BI),L(i,CA),L(Q,CA),c.rawrigidbodyset_createRigidBody(this.ptr,A.ptr,I.ptr,g,C,B,i.ptr,Q.ptr,o,e,t,a,s,n,h,D,r,G,w,S)}remove(A,I,g,C,B){L(I,Jg),L(g,RI),L(C,vg),L(B,xg),c.rawrigidbodyset_remove(this.ptr,A,I.ptr,g.ptr,C.ptr,B.ptr)}len(){return c.rawrigidbodyset_len(this.ptr)>>>0}contains(A){return c.rawrigidbodyset_contains(this.ptr,A)!==0}forEachRigidBodyHandle(A){try{c.rawrigidbodyset_forEachRigidBodyHandle(this.ptr,MI(A))}finally{CI[lI++]=void 0}}}class BI{static __wrap(A){const I=Object.create(BI.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawrotation_free(A)}static identity(){const A=c.rawrotation_identity();return BI.__wrap(A)}static fromAngle(A){const I=c.rawrotation_fromAngle(A);return BI.__wrap(I)}get im(){return c.rawrotation_im(this.ptr)}get re(){return c.rawintegrationparameters_dt(this.ptr)}get angle(){return c.rawrotation_angle(this.ptr)}}class yi{static __wrap(A){const I=Object.create(yi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawserializationpipeline_free(A)}constructor(){const A=c.rawserializationpipeline_new();return yi.__wrap(A)}serializeAll(A,I,g,C,B,i,Q,o,e){return L(A,CA),L(I,DC),L(g,Jg),L(C,rC),L(B,zg),L(i,FI),L(Q,RI),L(o,vg),L(e,xg),ci(c.rawserializationpipeline_serializeAll(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i.ptr,Q.ptr,o.ptr,e.ptr))}deserializeAll(A){const I=c.rawserializationpipeline_deserializeAll(this.ptr,UI(A));return I===0?void 0:wo.__wrap(I)}}class TA{static __wrap(A){const I=Object.create(TA.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawshape_free(A)}static cuboid(A,I){const g=c.rawshape_cuboid(A,I);return TA.__wrap(g)}static roundCuboid(A,I,g){const C=c.rawshape_roundCuboid(A,I,g);return TA.__wrap(C)}static ball(A){const I=c.rawshape_ball(A);return TA.__wrap(I)}static halfspace(A){L(A,CA);const I=c.rawshape_halfspace(A.ptr);return TA.__wrap(I)}static capsule(A,I){const g=c.rawshape_capsule(A,I);return TA.__wrap(g)}static polyline(A,I){const g=lC(A,c.__wbindgen_malloc),C=kg,B=ce(I,c.__wbindgen_malloc),i=kg,Q=c.rawshape_polyline(g,C,B,i);return TA.__wrap(Q)}static trimesh(A,I){const g=lC(A,c.__wbindgen_malloc),C=kg,B=ce(I,c.__wbindgen_malloc),i=kg,Q=c.rawshape_trimesh(g,C,B,i);return TA.__wrap(Q)}static heightfield(A,I){const g=lC(A,c.__wbindgen_malloc),C=kg;L(I,CA);const B=c.rawshape_heightfield(g,C,I.ptr);return TA.__wrap(B)}static segment(A,I){L(A,CA),L(I,CA);const g=c.rawshape_segment(A.ptr,I.ptr);return TA.__wrap(g)}static triangle(A,I,g){L(A,CA),L(I,CA),L(g,CA);const C=c.rawshape_triangle(A.ptr,I.ptr,g.ptr);return TA.__wrap(C)}static roundTriangle(A,I,g,C){L(A,CA),L(I,CA),L(g,CA);const B=c.rawshape_roundTriangle(A.ptr,I.ptr,g.ptr,C);return TA.__wrap(B)}static convexHull(A){const I=lC(A,c.__wbindgen_malloc),g=kg,C=c.rawshape_convexHull(I,g);return C===0?void 0:TA.__wrap(C)}static roundConvexHull(A,I){const g=lC(A,c.__wbindgen_malloc),C=kg,B=c.rawshape_roundConvexHull(g,C,I);return B===0?void 0:TA.__wrap(B)}static convexPolyline(A){const I=lC(A,c.__wbindgen_malloc),g=kg,C=c.rawshape_convexPolyline(I,g);return C===0?void 0:TA.__wrap(C)}static roundConvexPolyline(A,I){const g=lC(A,c.__wbindgen_malloc),C=kg,B=c.rawshape_roundConvexPolyline(g,C,I);return B===0?void 0:TA.__wrap(B)}castShape(A,I,g,C,B,i,Q,o,e){L(A,CA),L(I,BI),L(g,CA),L(C,TA),L(B,CA),L(i,BI),L(Q,CA);const t=c.rawshape_castShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i.ptr,Q.ptr,o,e);return t===0?void 0:Hi.__wrap(t)}intersectsShape(A,I,g,C,B){return L(A,CA),L(I,BI),L(g,TA),L(C,CA),L(B,BI),c.rawshape_intersectsShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr)!==0}contactShape(A,I,g,C,B,i){L(A,CA),L(I,BI),L(g,TA),L(C,CA),L(B,BI);const Q=c.rawshape_contactShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,i);return Q===0?void 0:iQ.__wrap(Q)}containsPoint(A,I,g){return L(A,CA),L(I,BI),L(g,CA),c.rawshape_containsPoint(this.ptr,A.ptr,I.ptr,g.ptr)!==0}projectPoint(A,I,g,C){L(A,CA),L(I,BI),L(g,CA);const B=c.rawshape_projectPoint(this.ptr,A.ptr,I.ptr,g.ptr,C);return qi.__wrap(B)}intersectsRay(A,I,g,C,B){return L(A,CA),L(I,BI),L(g,CA),L(C,CA),c.rawshape_intersectsRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B)!==0}castRay(A,I,g,C,B,i){return L(A,CA),L(I,BI),L(g,CA),L(C,CA),c.rawshape_castRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,i)}castRayAndGetNormal(A,I,g,C,B,i){L(A,CA),L(I,BI),L(g,CA),L(C,CA);const Q=c.rawshape_castRayAndGetNormal(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,i);return Q===0?void 0:mi.__wrap(Q)}}class Li{static __wrap(A){const I=Object.create(Li.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawshapecollidertoi_free(A)}colliderHandle(){return c.rawcharactercollision_handle(this.ptr)}toi(){return c.rawraycolliderintersection_toi(this.ptr)}witness1(){const A=c.rawraycolliderintersection_normal(this.ptr);return CA.__wrap(A)}witness2(){const A=c.rawshapecollidertoi_witness2(this.ptr);return CA.__wrap(A)}normal1(){const A=c.rawcontactforceevent_max_force_direction(this.ptr);return CA.__wrap(A)}normal2(){const A=c.rawshapecollidertoi_normal2(this.ptr);return CA.__wrap(A)}}class iQ{static __wrap(A){const I=Object.create(iQ.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawshapecontact_free(A)}distance(){return c.rawintegrationparameters_predictionDistance(this.ptr)}point1(){const A=c.rawkinematiccharactercontroller_up(this.ptr);return CA.__wrap(A)}point2(){const A=c.rawshapecontact_point2(this.ptr);return CA.__wrap(A)}normal1(){const A=c.rawshapecontact_normal1(this.ptr);return CA.__wrap(A)}normal2(){const A=c.rawshapecontact_normal2(this.ptr);return CA.__wrap(A)}}class Hi{static __wrap(A){const I=Object.create(Hi.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawshapetoi_free(A)}toi(){return c.rawintegrationparameters_dt(this.ptr)}witness1(){const A=c.rawrayintersection_normal(this.ptr);return CA.__wrap(A)}witness2(){const A=c.rawshapetoi_witness2(this.ptr);return CA.__wrap(A)}normal1(){const A=c.rawshapetoi_normal1(this.ptr);return CA.__wrap(A)}normal2(){const A=c.rawshapetoi_normal2(this.ptr);return CA.__wrap(A)}}class CA{static __wrap(A){const I=Object.create(CA.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();c.__wbg_rawvector_free(A)}static zero(){const A=c.rawvector_zero();return CA.__wrap(A)}constructor(A,I){const g=c.rawvector_new(A,I);return CA.__wrap(g)}get x(){return c.rawintegrationparameters_dt(this.ptr)}set x(A){c.rawintegrationparameters_set_dt(this.ptr,A)}get y(){return c.rawrotation_im(this.ptr)}set y(A){c.rawvector_set_y(this.ptr,A)}xy(){const A=c.rawvector_xy(this.ptr);return CA.__wrap(A)}yx(){const A=c.rawvector_yx(this.ptr);return CA.__wrap(A)}}async function ga(E){E===void 0&&(E=new URL("rapier_wasm2d_bg.wasm","<deleted>"));const A=function(){const C={wbg:{}};return C.wbg.__wbindgen_object_drop_ref=function(B){ci(B)},C.wbg.__wbindgen_number_new=function(B){return UI(B)},C.wbg.__wbindgen_number_get=function(B,i){const Q=sI(i),o=typeof Q=="number"?Q:void 0;li()[B/8+1]=YA(o)?0:o,SI()[B/4+0]=!YA(o)},C.wbg.__wbindgen_boolean_get=function(B){const i=sI(B);return typeof i=="boolean"?i?1:0:2},C.wbg.__wbindgen_is_function=function(B){return typeof sI(B)=="function"},C.wbg.__wbg_rawraycolliderintersection_new=function(B){return UI(Yi.__wrap(B))},C.wbg.__wbg_rawcontactforceevent_new=function(B){return UI(ho.__wrap(B))},C.wbg.__wbg_call_168da88779e35f61=function(){return eE(function(B,i,Q){return UI(sI(B).call(sI(i),sI(Q)))},arguments)},C.wbg.__wbg_call_3999bee59e9f7719=function(){return eE(function(B,i,Q,o){return UI(sI(B).call(sI(i),sI(Q),sI(o)))},arguments)},C.wbg.__wbg_call_e1f72c051cdab859=function(){return eE(function(B,i,Q,o,e){return UI(sI(B).call(sI(i),sI(Q),sI(o),sI(e)))},arguments)},C.wbg.__wbg_bind_10dfe70e95d2a480=function(B,i,Q,o){return UI(sI(B).bind(sI(i),sI(Q),sI(o)))},C.wbg.__wbg_buffer_3f3d764d4747d564=function(B){return UI(sI(B).buffer)},C.wbg.__wbg_newwithbyteoffsetandlength_d9aa266703cb98be=function(B,i,Q){return UI(new Uint8Array(sI(B),i>>>0,Q>>>0))},C.wbg.__wbg_new_8c3f0052272a457a=function(B){return UI(new Uint8Array(sI(B)))},C.wbg.__wbg_set_83db9690f9353e79=function(B,i,Q){sI(B).set(sI(i),Q>>>0)},C.wbg.__wbg_length_9e1ae1900cb0fbd5=function(B){return sI(B).length},C.wbg.__wbg_newwithbyteoffsetandlength_be22e5fcf4f69ab4=function(B,i,Q){return UI(new Float32Array(sI(B),i>>>0,Q>>>0))},C.wbg.__wbg_set_0e0314cf6675c1b9=function(B,i,Q){sI(B).set(sI(i),Q>>>0)},C.wbg.__wbg_length_9a2deed95d22668d=function(B){return sI(B).length},C.wbg.__wbg_newwithlength_a7168e4a1e8f5e12=function(B){return UI(new Float32Array(B>>>0))},C.wbg.__wbindgen_throw=function(B,i){throw new Error(Aa(B,i))},C.wbg.__wbindgen_memory=function(){return UI(c.memory)},C}();(typeof E=="string"||typeof Request=="function"&&E instanceof Request||typeof URL=="function"&&E instanceof URL)&&(E=fetch(E));const{instance:I,module:g}=await async function(C,B){if(typeof Response=="function"&&C instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(C,B)}catch(Q){if(C.headers.get("Content-Type")=="application/wasm")throw Q;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",Q)}const i=await C.arrayBuffer();return await WebAssembly.instantiate(i,B)}{const i=await WebAssembly.instantiate(C,B);return i instanceof WebAssembly.Instance?{instance:i,module:C}:i}}(await E,A);return function(C,B){return c=C.exports,ga.__wbindgen_wasm_module=B,ai=new Float32Array,oi=new Float64Array,ei=new Int32Array,si=new Uint32Array,ti=new Uint8Array,c}(I,g)}class So{constructor(A,I){this.x=A,this.y=I}}class AA{static new(A,I){return new So(A,I)}static zeros(){return AA.new(0,0)}static fromRaw(A){if(!A)return null;let I=AA.new(A.x,A.y);return A.free(),I}static intoRaw(A){return new CA(A.x,A.y)}static copy(A,I){A.x=I.x,A.y=I.y}}class hI{static identity(){return 0}static fromRaw(A){if(!A)return null;let I=A.angle;return A.free(),I}static intoRaw(A){return BI.fromAngle(A)}}var Rg,zI,ZE,EQ,lB,DI,Mi,RC,zE,ki,XE,$E;(function(E){E[E.Dynamic=0]="Dynamic",E[E.Fixed=1]="Fixed",E[E.KinematicPositionBased=2]="KinematicPositionBased",E[E.KinematicVelocityBased=3]="KinematicVelocityBased"})(Rg||(Rg={}));class Ao{constructor(A,I,g){this.rawSet=A,this.colliderSet=I,this.handle=g}finalizeDeserialization(A){this.colliderSet=A}isValid(){return this.rawSet.contains(this.handle)}lockTranslations(A,I){return this.rawSet.rbLockTranslations(this.handle,A,I)}lockRotations(A,I){return this.rawSet.rbLockRotations(this.handle,A,I)}setEnabledTranslations(A,I,g){return this.rawSet.rbSetEnabledTranslations(this.handle,A,I,g)}restrictTranslations(A,I,g){this.setEnabledTranslations(A,A,g)}dominanceGroup(){return this.rawSet.rbDominanceGroup(this.handle)}setDominanceGroup(A){this.rawSet.rbSetDominanceGroup(this.handle,A)}enableCcd(A){this.rawSet.rbEnableCcd(this.handle,A)}translation(){let A=this.rawSet.rbTranslation(this.handle);return AA.fromRaw(A)}rotation(){let A=this.rawSet.rbRotation(this.handle);return hI.fromRaw(A)}nextTranslation(){let A=this.rawSet.rbNextTranslation(this.handle);return AA.fromRaw(A)}nextRotation(){let A=this.rawSet.rbNextRotation(this.handle);return hI.fromRaw(A)}setTranslation(A,I){this.rawSet.rbSetTranslation(this.handle,A.x,A.y,I)}setLinvel(A,I){let g=AA.intoRaw(A);this.rawSet.rbSetLinvel(this.handle,g,I),g.free()}gravityScale(){return this.rawSet.rbGravityScale(this.handle)}setGravityScale(A,I){this.rawSet.rbSetGravityScale(this.handle,A,I)}setRotation(A,I){this.rawSet.rbSetRotation(this.handle,A,I)}setAngvel(A,I){this.rawSet.rbSetAngvel(this.handle,A,I)}setNextKinematicTranslation(A){this.rawSet.rbSetNextKinematicTranslation(this.handle,A.x,A.y)}setNextKinematicRotation(A){this.rawSet.rbSetNextKinematicRotation(this.handle,A)}linvel(){return AA.fromRaw(this.rawSet.rbLinvel(this.handle))}angvel(){return this.rawSet.rbAngvel(this.handle)}mass(){return this.rawSet.rbMass(this.handle)}sleep(){this.rawSet.rbSleep(this.handle)}wakeUp(){this.rawSet.rbWakeUp(this.handle)}isCcdEnabled(){return this.rawSet.rbIsCcdEnabled(this.handle)}numColliders(){return this.rawSet.rbNumColliders(this.handle)}collider(A){return this.colliderSet.get(this.rawSet.rbCollider(this.handle,A))}bodyType(){return this.rawSet.rbBodyType(this.handle)}setBodyType(A){return this.rawSet.rbSetBodyType(this.handle,A)}isSleeping(){return this.rawSet.rbIsSleeping(this.handle)}isMoving(){return this.rawSet.rbIsMoving(this.handle)}isFixed(){return this.rawSet.rbIsFixed(this.handle)}isKinematic(){return this.rawSet.rbIsKinematic(this.handle)}isDynamic(){return this.rawSet.rbIsDynamic(this.handle)}linearDamping(){return this.rawSet.rbLinearDamping(this.handle)}angularDamping(){return this.rawSet.rbAngularDamping(this.handle)}setLinearDamping(A){this.rawSet.rbSetLinearDamping(this.handle,A)}recomputeMassPropertiesFromColliders(){this.rawSet.rbRecomputeMassPropertiesFromColliders(this.handle,this.colliderSet.raw)}setAdditionalMass(A,I){this.rawSet.rbSetAdditionalMass(this.handle,A,I)}setAdditionalMassProperties(A,I,g,C){let B=AA.intoRaw(I);this.rawSet.rbSetAdditionalMassProperties(this.handle,A,B,g,C),B.free()}setAngularDamping(A){this.rawSet.rbSetAngularDamping(this.handle,A)}resetForces(A){this.rawSet.rbResetForces(this.handle,A)}resetTorques(A){this.rawSet.rbResetTorques(this.handle,A)}addForce(A,I){const g=AA.intoRaw(A);this.rawSet.rbAddForce(this.handle,g,I),g.free()}applyImpulse(A,I){const g=AA.intoRaw(A);this.rawSet.rbApplyImpulse(this.handle,g,I),g.free()}addTorque(A,I){this.rawSet.rbAddTorque(this.handle,A,I)}applyTorqueImpulse(A,I){this.rawSet.rbApplyTorqueImpulse(this.handle,A,I)}addForceAtPoint(A,I,g){const C=AA.intoRaw(A),B=AA.intoRaw(I);this.rawSet.rbAddForceAtPoint(this.handle,C,B,g),C.free(),B.free()}applyImpulseAtPoint(A,I,g){const C=AA.intoRaw(A),B=AA.intoRaw(I);this.rawSet.rbApplyImpulseAtPoint(this.handle,C,B,g),C.free(),B.free()}}class Fg{constructor(A){this.status=A,this.translation=AA.zeros(),this.rotation=hI.identity(),this.gravityScale=1,this.linvel=AA.zeros(),this.mass=0,this.massOnly=!1,this.centerOfMass=AA.zeros(),this.translationsEnabledX=!0,this.translationsEnabledY=!0,this.angvel=0,this.principalAngularInertia=0,this.rotationsEnabled=!0,this.linearDamping=0,this.angularDamping=0,this.canSleep=!0,this.sleeping=!1,this.ccdEnabled=!1,this.dominanceGroup=0}static dynamic(){return new Fg(Rg.Dynamic)}static kinematicPositionBased(){return new Fg(Rg.KinematicPositionBased)}static kinematicVelocityBased(){return new Fg(Rg.KinematicVelocityBased)}static fixed(){return new Fg(Rg.Fixed)}static newDynamic(){return new Fg(Rg.Dynamic)}static newKinematicPositionBased(){return new Fg(Rg.KinematicPositionBased)}static newKinematicVelocityBased(){return new Fg(Rg.KinematicVelocityBased)}static newStatic(){return new Fg(Rg.Fixed)}setDominanceGroup(A){return this.dominanceGroup=A,this}setTranslation(A,I){if(typeof A!="number"||typeof I!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:A,y:I},this}setRotation(A){return this.rotation=A,this}setGravityScale(A){return this.gravityScale=A,this}setAdditionalMass(A){return this.mass=A,this.massOnly=!0,this}setLinvel(A,I){if(typeof A!="number"||typeof I!="number")throw TypeError("The linvel components must be numbers.");return this.linvel={x:A,y:I},this}setAngvel(A){return this.angvel=A,this}setAdditionalMassProperties(A,I,g){return this.mass=A,AA.copy(this.centerOfMass,I),this.principalAngularInertia=g,this.massOnly=!1,this}enabledTranslations(A,I){return this.translationsEnabledX=A,this.translationsEnabledY=I,this}restrictTranslations(A,I){return this.enabledTranslations(A,I)}lockTranslations(){return this.restrictTranslations(!1,!1)}lockRotations(){return this.rotationsEnabled=!1,this}setLinearDamping(A){return this.linearDamping=A,this}setAngularDamping(A){return this.angularDamping=A,this}setCanSleep(A){return this.canSleep=A,this}setSleeping(A){return this.sleeping=A,this}setCcdEnabled(A){return this.ccdEnabled=A,this}setUserData(A){return this.userData=A,this}}class bi{constructor(){this.fconv=new Float64Array(1),this.uconv=new Uint32Array(this.fconv.buffer),this.data=new Array,this.size=0}set(A,I){let g=this.index(A);for(;this.data.length<=g;)this.data.push(null);this.data[g]==null&&(this.size+=1),this.data[g]=I}len(){return this.size}delete(A){let I=this.index(A);I<this.data.length&&(this.data[I]!=null&&(this.size-=1),this.data[I]=null)}clear(){this.data=new Array}get(A){let I=this.index(A);return I<this.data.length?this.data[I]:null}forEach(A){for(const I of this.data)I!=null&&A(I)}getAll(){return this.data.filter(A=>A!=null)}index(A){return this.fconv[0]=A,this.uconv[0]}}class Ca{constructor(A){this.raw=A||new FI,this.map=new bi,A&&A.forEachRigidBodyHandle(I=>{this.map.set(I,new Ao(A,null,I))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}finalizeDeserialization(A){this.map.forEach(I=>I.finalizeDeserialization(A))}createRigidBody(A,I){let g=AA.intoRaw(I.translation),C=hI.intoRaw(I.rotation),B=AA.intoRaw(I.linvel),i=AA.intoRaw(I.centerOfMass),Q=this.raw.createRigidBody(g,C,I.gravityScale,I.mass,I.massOnly,i,B,I.angvel,I.principalAngularInertia,I.translationsEnabledX,I.translationsEnabledY,I.rotationsEnabled,I.linearDamping,I.angularDamping,I.status,I.canSleep,I.sleeping,I.ccdEnabled,I.dominanceGroup);g.free(),C.free(),B.free(),i.free();const o=new Ao(this.raw,A,Q);return o.userData=I.userData,this.map.set(Q,o),o}remove(A,I,g,C,B){for(let i=0;i<this.raw.rbNumColliders(A);i+=1)g.unmap(this.raw.rbCollider(A,i));C.forEachJointHandleAttachedToRigidBody(A,i=>C.unmap(i)),B.forEachJointHandleAttachedToRigidBody(A,i=>B.unmap(i)),this.raw.remove(A,I.raw,g.raw,C.raw,B.raw),this.map.delete(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}get(A){return this.map.get(A)}forEach(A){this.map.forEach(A)}forEachActiveRigidBody(A,I){A.forEachActiveRigidBodyHandle(g=>{I(this.get(g))})}getAll(){return this.map.getAll()}}class Ba{constructor(A){this.raw=A||new DC}free(){this.raw.free(),this.raw=void 0}get dt(){return this.raw.dt}get erp(){return this.raw.erp}get allowedLinearError(){return this.raw.allowedLinearError}get predictionDistance(){return this.raw.predictionDistance}get maxVelocityIterations(){return this.raw.maxVelocityIterations}get maxVelocityFrictionIterations(){return this.raw.maxVelocityFrictionIterations}get maxStabilizationIterations(){return this.raw.maxStabilizationIterations}get minIslandSize(){return this.raw.minIslandSize}get maxCcdSubsteps(){return this.raw.maxCcdSubsteps}set dt(A){this.raw.dt=A}set erp(A){this.raw.erp=A}set allowedLinearError(A){this.raw.allowedLinearError=A}set predictionDistance(A){this.raw.predictionDistance=A}set maxVelocityIterations(A){this.raw.maxVelocityIterations=A}set maxVelocityFrictionIterations(A){this.raw.maxVelocityFrictionIterations=A}set maxStabilizationIterations(A){this.raw.maxStabilizationIterations=A}set minIslandSize(A){this.raw.minIslandSize=A}set maxCcdSubsteps(A){this.raw.maxCcdSubsteps=A}}(function(E){E[E.Revolute=0]="Revolute",E[E.Fixed=1]="Fixed",E[E.Prismatic=2]="Prismatic"})(zI||(zI={})),function(E){E[E.AccelerationBased=0]="AccelerationBased",E[E.ForceBased=1]="ForceBased"}(ZE||(ZE={}));class uC{constructor(A,I,g){this.rawSet=A,this.bodySet=I,this.handle=g}static newTyped(A,I,g){switch(A.jointType(g)){case zI.Revolute:return new Ea(A,I,g);case zI.Prismatic:return new ia(A,I,g);case zI.Fixed:return new Qa(A,I,g);default:return new uC(A,I,g)}}finalizeDeserialization(A){this.bodySet=A}isValid(){return this.rawSet.contains(this.handle)}body1(){return this.bodySet.get(this.rawSet.jointBodyHandle1(this.handle))}body2(){return this.bodySet.get(this.rawSet.jointBodyHandle2(this.handle))}type(){return this.rawSet.jointType(this.handle)}anchor1(){return AA.fromRaw(this.rawSet.jointAnchor1(this.handle))}anchor2(){return AA.fromRaw(this.rawSet.jointAnchor2(this.handle))}setAnchor1(A){const I=AA.intoRaw(A);this.rawSet.jointSetAnchor1(this.handle,I),I.free()}setAnchor2(A){const I=AA.intoRaw(A);this.rawSet.jointSetAnchor2(this.handle,I),I.free()}setContactsEnabled(A){this.rawSet.jointSetContactsEnabled(this.handle,A)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}}class yo extends uC{limitsEnabled(){return this.rawSet.jointLimitsEnabled(this.handle,this.rawAxis())}limitsMin(){return this.rawSet.jointLimitsMin(this.handle,this.rawAxis())}limitsMax(){return this.rawSet.jointLimitsMax(this.handle,this.rawAxis())}setLimits(A,I){this.rawSet.jointSetLimits(this.handle,this.rawAxis(),A,I)}configureMotorModel(A){this.rawSet.jointConfigureMotorModel(this.handle,this.rawAxis(),A)}configureMotorVelocity(A,I){this.rawSet.jointConfigureMotorVelocity(this.handle,this.rawAxis(),A,I)}configureMotorPosition(A,I,g){this.rawSet.jointConfigureMotorPosition(this.handle,this.rawAxis(),A,I,g)}configureMotor(A,I,g,C){this.rawSet.jointConfigureMotor(this.handle,this.rawAxis(),A,I,g,C)}}class Qa extends uC{}class ia extends yo{rawAxis(){return fi.X}}class Ea extends yo{rawAxis(){return fi.AngX}}class NC{constructor(){}static fixed(A,I,g,C){let B=new NC;return B.anchor1=A,B.anchor2=g,B.frame1=I,B.frame2=C,B.jointType=zI.Fixed,B}static revolute(A,I){let g=new NC;return g.anchor1=A,g.anchor2=I,g.jointType=zI.Revolute,g}static prismatic(A,I,g){let C=new NC;return C.anchor1=A,C.anchor2=I,C.axis=g,C.jointType=zI.Prismatic,C}intoRaw(){let A,I,g=AA.intoRaw(this.anchor1),C=AA.intoRaw(this.anchor2),B=!1,i=0,Q=0;switch(this.jointType){case zI.Fixed:let o=hI.intoRaw(this.frame1),e=hI.intoRaw(this.frame2);I=bg.fixed(g,o,C,e),o.free(),e.free();break;case zI.Prismatic:A=AA.intoRaw(this.axis),this.limitsEnabled&&(B=!0,i=this.limits[0],Q=this.limits[1]),I=bg.prismatic(g,C,A,B,i,Q),A.free();break;case zI.Revolute:I=bg.revolute(g,C)}return g.free(),C.free(),I}}class oa{constructor(A){this.raw=A||new vg,this.map=new bi,A&&A.forEachJointHandle(I=>{this.map.set(I,uC.newTyped(A,null,I))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}finalizeDeserialization(A){this.map.forEach(I=>I.finalizeDeserialization(A))}createJoint(A,I,g,C,B){const i=I.intoRaw(),Q=this.raw.createJoint(i,g,C,B);i.free();let o=uC.newTyped(this.raw,A,Q);return this.map.set(Q,o),o}remove(A,I){this.raw.remove(A,I),this.unmap(A)}forEachJointHandleAttachedToRigidBody(A,I){this.raw.forEachJointAttachedToRigidBody(A,I)}unmap(A){this.map.delete(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}get(A){return this.map.get(A)}forEach(A){this.map.forEach(A)}getAll(){return this.map.getAll()}}class fC{constructor(A,I){this.rawSet=A,this.handle=I}static newTyped(A,I){switch(A.jointType(I)){case zI.Revolute:return new aa(A,I);case zI.Prismatic:return new ta(A,I);case zI.Fixed:return new ea(A,I);default:return new fC(A,I)}}isValid(){return this.rawSet.contains(this.handle)}setContactsEnabled(A){this.rawSet.jointSetContactsEnabled(this.handle,A)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}}class Mo extends fC{}class ea extends fC{}class ta extends Mo{rawAxis(){return fi.X}}class aa extends Mo{rawAxis(){return fi.AngX}}class sa{constructor(A){this.raw=A||new xg,this.map=new bi,A&&A.forEachJointHandle(I=>{this.map.set(I,fC.newTyped(this.raw,I))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}createJoint(A,I,g,C){const B=A.intoRaw(),i=this.raw.createJoint(B,I,g,C);B.free();let Q=fC.newTyped(this.raw,i);return this.map.set(i,Q),Q}remove(A,I){this.raw.remove(A,I),this.map.delete(A)}unmap(A){this.map.delete(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}get(A){return this.map.get(A)}forEach(A){this.map.forEach(A)}forEachJointHandleAttachedToRigidBody(A,I){this.raw.forEachJointAttachedToRigidBody(A,I)}getAll(){return this.map.getAll()}}(function(E){E[E.Average=0]="Average",E[E.Min=1]="Min",E[E.Multiply=2]="Multiply",E[E.Max=3]="Max"})(EQ||(EQ={}));class na{constructor(A){this.raw=A||new cB}free(){this.raw.free(),this.raw=void 0}}class ra{constructor(A){this.raw=A||new Jg}free(){this.raw.free(),this.raw=void 0}forEachActiveRigidBodyHandle(A){this.raw.forEachActiveRigidBodyHandle(A)}}class Da{constructor(A){this.raw=A||new rC}free(){this.raw.free(),this.raw=void 0}}class ha{constructor(A){this.raw=A||new zg,this.tempManifold=new ca(null)}free(){this.raw.free(),this.raw=void 0}contactsWith(A,I){this.raw.contacts_with(A,I)}intersectionsWith(A,I){this.raw.intersections_with(A,I)}contactPair(A,I,g){const C=this.raw.contact_pair(A,I);if(C){const B=C.collider1()!=A;let i;for(i=0;i<C.numContactManifolds();++i)this.tempManifold.raw=C.contactManifold(i),this.tempManifold.raw&&g(this.tempManifold,B),this.tempManifold.free();C.free()}}intersectionPair(A,I){return this.raw.intersection_pair(A,I)}}class ca{constructor(A){this.raw=A}free(){this.raw.free(),this.raw=void 0}normal(){return AA.fromRaw(this.raw.normal())}localNormal1(){return AA.fromRaw(this.raw.local_n1())}localNormal2(){return AA.fromRaw(this.raw.local_n2())}subshape1(){return this.raw.subshape1()}subshape2(){return this.raw.subshape2()}numContacts(){return this.raw.num_contacts()}localContactPoint1(A){return AA.fromRaw(this.raw.contact_local_p1(A))}localContactPoint2(A){return AA.fromRaw(this.raw.contact_local_p2(A))}contactDist(A){return this.raw.contact_dist(A)}contactFid1(A){return this.raw.contact_fid1(A)}contactFid2(A){return this.raw.contact_fid2(A)}contactImpulse(A){return this.raw.contact_impulse(A)}contactTangentImpulse(A){return this.raw.contact_tangent_impulse(A)}numSolverContacts(){return this.raw.num_solver_contacts()}solverContactPoint(A){return AA.fromRaw(this.raw.solver_contact_point(A))}solverContactDist(A){return this.raw.solver_contact_dist(A)}solverContactFriction(A){return this.raw.solver_contact_friction(A)}solverContactRestitution(A){return this.raw.solver_contact_restitution(A)}solverContactTangentVelocity(A){return AA.fromRaw(this.raw.solver_contact_tangent_velocity(A))}}class wB{constructor(A,I,g,C,B){this.distance=A,this.point1=I,this.point2=g,this.normal1=C,this.normal2=B}static fromRaw(A){if(!A)return null;const I=new wB(A.distance(),AA.fromRaw(A.point1()),AA.fromRaw(A.point2()),AA.fromRaw(A.normal1()),AA.fromRaw(A.normal2()));return A.free(),I}}(function(E){E[E.Vertex=0]="Vertex",E[E.Face=1]="Face",E[E.Unknown=2]="Unknown"})(lB||(lB={}));class hQ{constructor(A,I){this.point=A,this.isInside=I}static fromRaw(A){if(!A)return null;const I=new hQ(AA.fromRaw(A.point()),A.isInside());return A.free(),I}}class oQ{constructor(A,I,g,C,B){this.featureType=lB.Unknown,this.featureId=void 0,this.collider=A,this.point=I,this.isInside=g,B!==void 0&&(this.featureId=B),C!==void 0&&(this.featureType=C)}static fromRaw(A,I){if(!I)return null;const g=new oQ(A.get(I.colliderHandle()),AA.fromRaw(I.point()),I.isInside(),I.featureType(),I.featureId());return I.free(),g}}class a0{constructor(A,I){this.origin=A,this.dir=I}pointAt(A){return{x:this.origin.x+this.dir.x*A,y:this.origin.y+this.dir.y*A}}}class cQ{constructor(A,I,g,C){this.featureType=lB.Unknown,this.featureId=void 0,this.toi=A,this.normal=I,C!==void 0&&(this.featureId=C),g!==void 0&&(this.featureType=g)}static fromRaw(A){if(!A)return null;const I=new cQ(A.toi(),AA.fromRaw(A.normal()),A.featureType(),A.featureId());return A.free(),I}}class eQ{constructor(A,I,g,C,B){this.featureType=lB.Unknown,this.featureId=void 0,this.collider=A,this.toi=I,this.normal=g,B!==void 0&&(this.featureId=B),C!==void 0&&(this.featureType=C)}static fromRaw(A,I){if(!I)return null;const g=new eQ(A.get(I.colliderHandle()),I.toi(),AA.fromRaw(I.normal()),I.featureType(),I.featureId());return I.free(),g}}class vi{constructor(A,I){this.collider=A,this.toi=I}static fromRaw(A,I){if(!I)return null;const g=new vi(A.get(I.colliderHandle()),I.toi());return I.free(),g}}class RB{constructor(A,I,g,C,B){this.toi=A,this.witness1=I,this.witness2=g,this.normal1=C,this.normal2=B}static fromRaw(A,I){if(!I)return null;const g=new RB(I.toi(),AA.fromRaw(I.witness1()),AA.fromRaw(I.witness2()),AA.fromRaw(I.normal1()),AA.fromRaw(I.normal2()));return I.free(),g}}class lQ extends RB{constructor(A,I,g,C,B,i){super(I,g,C,B,i),this.collider=A}static fromRaw(A,I){if(!I)return null;const g=new lQ(A.get(I.colliderHandle()),I.toi(),AA.fromRaw(I.witness1()),AA.fromRaw(I.witness2()),AA.fromRaw(I.normal1()),AA.fromRaw(I.normal2()));return I.free(),g}}class $I{static fromRaw(A,I){const g=A.coShapeType(I);let C,B,i,Q,o,e,t;switch(g){case DI.Ball:return new ko(A.coRadius(I));case DI.Cuboid:return C=A.coHalfExtents(I),new Fo(C.x,C.y);case DI.RoundCuboid:return C=A.coHalfExtents(I),B=A.coRoundRadius(I),new po(C.x,C.y,B);case DI.Capsule:return o=A.coHalfHeight(I),e=A.coRadius(I),new No(o,e);case DI.Segment:return i=A.coVertices(I),new Uo(AA.new(i[0],i[1]),AA.new(i[2],i[3]));case DI.Polyline:return i=A.coVertices(I),Q=A.coIndices(I),new uo(i,Q);case DI.Triangle:return i=A.coVertices(I),new Ko(AA.new(i[0],i[1]),AA.new(i[2],i[3]),AA.new(i[4],i[5]));case DI.RoundTriangle:return i=A.coVertices(I),B=A.coRoundRadius(I),new Jo(AA.new(i[0],i[1]),AA.new(i[2],i[3]),AA.new(i[4],i[5]),B);case DI.HalfSpace:return t=AA.fromRaw(A.coHalfspaceNormal(I)),new Ro(t);case DI.TriMesh:return i=A.coVertices(I),Q=A.coIndices(I),new fo(i,Q);case DI.HeightField:const a=A.coHeightfieldScale(I),s=A.coHeightfieldHeights(I);return new qo(s,a);case DI.ConvexPolygon:return i=A.coVertices(I),new Ri(i,!1);case DI.RoundConvexPolygon:return i=A.coVertices(I),B=A.coRoundRadius(I),new Fi(i,B,!1);default:throw new Error("unknown shape type: "+g)}}castShape(A,I,g,C,B,i,Q,o,e){let t=AA.intoRaw(A),a=hI.intoRaw(I),s=AA.intoRaw(g),n=AA.intoRaw(B),h=hI.intoRaw(i),D=AA.intoRaw(Q),r=this.intoRaw(),G=C.intoRaw(),w=RB.fromRaw(null,r.castShape(t,a,s,G,n,h,D,o,e));return t.free(),a.free(),s.free(),n.free(),h.free(),D.free(),r.free(),G.free(),w}intersectsShape(A,I,g,C,B){let i=AA.intoRaw(A),Q=hI.intoRaw(I),o=AA.intoRaw(C),e=hI.intoRaw(B),t=this.intoRaw(),a=g.intoRaw(),s=t.intersectsShape(i,Q,a,o,e);return i.free(),Q.free(),o.free(),e.free(),t.free(),a.free(),s}contactShape(A,I,g,C,B,i){let Q=AA.intoRaw(A),o=hI.intoRaw(I),e=AA.intoRaw(C),t=hI.intoRaw(B),a=this.intoRaw(),s=g.intoRaw(),n=wB.fromRaw(a.contactShape(Q,o,s,e,t,i));return Q.free(),o.free(),e.free(),t.free(),a.free(),s.free(),n}containsPoint(A,I,g){let C=AA.intoRaw(A),B=hI.intoRaw(I),i=AA.intoRaw(g),Q=this.intoRaw(),o=Q.containsPoint(C,B,i);return C.free(),B.free(),i.free(),Q.free(),o}projectPoint(A,I,g,C){let B=AA.intoRaw(A),i=hI.intoRaw(I),Q=AA.intoRaw(g),o=this.intoRaw(),e=hQ.fromRaw(o.projectPoint(B,i,Q,C));return B.free(),i.free(),Q.free(),o.free(),e}intersectsRay(A,I,g,C){let B=AA.intoRaw(I),i=hI.intoRaw(g),Q=AA.intoRaw(A.origin),o=AA.intoRaw(A.dir),e=this.intoRaw(),t=e.intersectsRay(B,i,Q,o,C);return B.free(),i.free(),Q.free(),o.free(),e.free(),t}castRay(A,I,g,C,B){let i=AA.intoRaw(I),Q=hI.intoRaw(g),o=AA.intoRaw(A.origin),e=AA.intoRaw(A.dir),t=this.intoRaw(),a=t.castRay(i,Q,o,e,C,B);return i.free(),Q.free(),o.free(),e.free(),t.free(),a}castRayAndGetNormal(A,I,g,C,B){let i=AA.intoRaw(I),Q=hI.intoRaw(g),o=AA.intoRaw(A.origin),e=AA.intoRaw(A.dir),t=this.intoRaw(),a=cQ.fromRaw(t.castRayAndGetNormal(i,Q,o,e,C,B));return i.free(),Q.free(),o.free(),e.free(),t.free(),a}}(function(E){E[E.Ball=0]="Ball",E[E.Cuboid=1]="Cuboid",E[E.Capsule=2]="Capsule",E[E.Segment=3]="Segment",E[E.Polyline=4]="Polyline",E[E.Triangle=5]="Triangle",E[E.TriMesh=6]="TriMesh",E[E.HeightField=7]="HeightField",E[E.ConvexPolygon=9]="ConvexPolygon",E[E.RoundCuboid=10]="RoundCuboid",E[E.RoundTriangle=11]="RoundTriangle",E[E.RoundConvexPolygon=12]="RoundConvexPolygon",E[E.HalfSpace=13]="HalfSpace"})(DI||(DI={}));class ko extends $I{constructor(A){super(),this.type=DI.Ball,this.radius=A}intoRaw(){return TA.ball(this.radius)}}class Ro extends $I{constructor(A){super(),this.type=DI.HalfSpace,this.normal=A}intoRaw(){let A=AA.intoRaw(this.normal),I=TA.halfspace(A);return A.free(),I}}class Fo extends $I{constructor(A,I){super(),this.type=DI.Cuboid,this.halfExtents=AA.new(A,I)}intoRaw(){return TA.cuboid(this.halfExtents.x,this.halfExtents.y)}}class po extends $I{constructor(A,I,g){super(),this.type=DI.RoundCuboid,this.halfExtents=AA.new(A,I),this.borderRadius=g}intoRaw(){return TA.roundCuboid(this.halfExtents.x,this.halfExtents.y,this.borderRadius)}}class No extends $I{constructor(A,I){super(),this.type=DI.Capsule,this.halfHeight=A,this.radius=I}intoRaw(){return TA.capsule(this.halfHeight,this.radius)}}class Uo extends $I{constructor(A,I){super(),this.type=DI.Segment,this.a=A,this.b=I}intoRaw(){let A=AA.intoRaw(this.a),I=AA.intoRaw(this.b),g=TA.segment(A,I);return A.free(),I.free(),g}}class Ko extends $I{constructor(A,I,g){super(),this.type=DI.Triangle,this.a=A,this.b=I,this.c=g}intoRaw(){let A=AA.intoRaw(this.a),I=AA.intoRaw(this.b),g=AA.intoRaw(this.c),C=TA.triangle(A,I,g);return A.free(),I.free(),g.free(),C}}class Jo extends $I{constructor(A,I,g,C){super(),this.type=DI.RoundTriangle,this.a=A,this.b=I,this.c=g,this.borderRadius=C}intoRaw(){let A=AA.intoRaw(this.a),I=AA.intoRaw(this.b),g=AA.intoRaw(this.c),C=TA.roundTriangle(A,I,g,this.borderRadius);return A.free(),I.free(),g.free(),C}}class uo extends $I{constructor(A,I){super(),this.type=DI.Polyline,this.vertices=A,this.indices=I??new Uint32Array(0)}intoRaw(){return TA.polyline(this.vertices,this.indices)}}class fo extends $I{constructor(A,I){super(),this.type=DI.TriMesh,this.vertices=A,this.indices=I}intoRaw(){return TA.trimesh(this.vertices,this.indices)}}class Ri extends $I{constructor(A,I){super(),this.type=DI.ConvexPolygon,this.vertices=A,this.skipConvexHullComputation=!!I}intoRaw(){return this.skipConvexHullComputation?TA.convexPolyline(this.vertices):TA.convexHull(this.vertices)}}class Fi extends $I{constructor(A,I,g){super(),this.type=DI.RoundConvexPolygon,this.vertices=A,this.borderRadius=I,this.skipConvexHullComputation=!!g}intoRaw(){return this.skipConvexHullComputation?TA.roundConvexPolyline(this.vertices,this.borderRadius):TA.roundConvexHull(this.vertices,this.borderRadius)}}class qo extends $I{constructor(A,I){super(),this.type=DI.HeightField,this.heights=A,this.scale=I}intoRaw(){let A=AA.intoRaw(this.scale),I=TA.heightfield(this.heights,A);return A.free(),I}}(function(E){E[E.DYNAMIC_DYNAMIC=1]="DYNAMIC_DYNAMIC",E[E.DYNAMIC_KINEMATIC=12]="DYNAMIC_KINEMATIC",E[E.DYNAMIC_FIXED=2]="DYNAMIC_FIXED",E[E.KINEMATIC_KINEMATIC=52224]="KINEMATIC_KINEMATIC",E[E.KINEMATIC_FIXED=8704]="KINEMATIC_FIXED",E[E.FIXED_FIXED=32]="FIXED_FIXED",E[E.DEFAULT=15]="DEFAULT",E[E.ALL=60943]="ALL"})(Mi||(Mi={}));class Io{constructor(A,I,g,C){this.colliderSet=A,this.handle=I,this._parent=g,this._shape=C}finalizeDeserialization(A){this.handle!=null&&(this._parent=A.get(this.colliderSet.raw.coParent(this.handle)))}ensureShapeIsCached(){this._shape||(this._shape=$I.fromRaw(this.colliderSet.raw,this.handle))}get shape(){return this.ensureShapeIsCached(),this._shape}isValid(){return this.colliderSet.raw.contains(this.handle)}translation(){return AA.fromRaw(this.colliderSet.raw.coTranslation(this.handle))}rotation(){return hI.fromRaw(this.colliderSet.raw.coRotation(this.handle))}isSensor(){return this.colliderSet.raw.coIsSensor(this.handle)}setSensor(A){this.colliderSet.raw.coSetSensor(this.handle,A)}setShape(A){let I=A.intoRaw();this.colliderSet.raw.coSetShape(this.handle,I),I.free(),this._shape=A}setRestitution(A){this.colliderSet.raw.coSetRestitution(this.handle,A)}setFriction(A){this.colliderSet.raw.coSetFriction(this.handle,A)}frictionCombineRule(){return this.colliderSet.raw.coFrictionCombineRule(this.handle)}setFrictionCombineRule(A){this.colliderSet.raw.coSetFrictionCombineRule(this.handle,A)}restitutionCombineRule(){return this.colliderSet.raw.coRestitutionCombineRule(this.handle)}setRestitutionCombineRule(A){this.colliderSet.raw.coSetRestitutionCombineRule(this.handle,A)}setCollisionGroups(A){this.colliderSet.raw.coSetCollisionGroups(this.handle,A)}setSolverGroups(A){this.colliderSet.raw.coSetSolverGroups(this.handle,A)}activeHooks(){return this.colliderSet.raw.coActiveHooks(this.handle)}setActiveHooks(A){this.colliderSet.raw.coSetActiveHooks(this.handle,A)}activeEvents(){return this.colliderSet.raw.coActiveEvents(this.handle)}setActiveEvents(A){this.colliderSet.raw.coSetActiveEvents(this.handle,A)}activeCollisionTypes(){return this.colliderSet.raw.coActiveCollisionTypes(this.handle)}setContactForceEventThreshold(A){return this.colliderSet.raw.coSetContactForceEventThreshold(this.handle,A)}contactForceEventThreshold(){return this.colliderSet.raw.coContactForceEventThreshold(this.handle)}setActiveCollisionTypes(A){this.colliderSet.raw.coSetActiveCollisionTypes(this.handle,A)}setDensity(A){this.colliderSet.raw.coSetDensity(this.handle,A)}setMass(A){this.colliderSet.raw.coSetMass(this.handle,A)}setMassProperties(A,I,g){let C=AA.intoRaw(I);this.colliderSet.raw.coSetMassProperties(this.handle,A,C,g),C.free()}setTranslation(A){this.colliderSet.raw.coSetTranslation(this.handle,A.x,A.y)}setTranslationWrtParent(A){this.colliderSet.raw.coSetTranslationWrtParent(this.handle,A.x,A.y)}setRotation(A){this.colliderSet.raw.coSetRotation(this.handle,A)}setRotationWrtParent(A){this.colliderSet.raw.coSetRotationWrtParent(this.handle,A)}shapeType(){return this.colliderSet.raw.coShapeType(this.handle)}halfExtents(){return AA.fromRaw(this.colliderSet.raw.coHalfExtents(this.handle))}radius(){return this.colliderSet.raw.coRadius(this.handle)}roundRadius(){return this.colliderSet.raw.coRoundRadius(this.handle)}halfHeight(){return this.colliderSet.raw.coHalfHeight(this.handle)}vertices(){return this.colliderSet.raw.coVertices(this.handle)}indices(){return this.colliderSet.raw.coIndices(this.handle)}heightfieldHeights(){return this.colliderSet.raw.coHeightfieldHeights(this.handle)}heightfieldScale(){let A=this.colliderSet.raw.coHeightfieldScale(this.handle);return AA.fromRaw(A)}parent(){return this._parent}friction(){return this.colliderSet.raw.coFriction(this.handle)}restitution(){return this.colliderSet.raw.coRestitution(this.handle)}density(){return this.colliderSet.raw.coDensity(this.handle)}mass(){return this.colliderSet.raw.coMass(this.handle)}volume(){return this.colliderSet.raw.coVolume(this.handle)}collisionGroups(){return this.colliderSet.raw.coCollisionGroups(this.handle)}solverGroups(){return this.colliderSet.raw.coSolverGroups(this.handle)}containsPoint(A){let I=AA.intoRaw(A),g=this.colliderSet.raw.coContainsPoint(this.handle,I);return I.free(),g}projectPoint(A,I){let g=AA.intoRaw(A),C=hQ.fromRaw(this.colliderSet.raw.coProjectPoint(this.handle,g,I));return g.free(),C}intersectsRay(A,I){let g=AA.intoRaw(A.origin),C=AA.intoRaw(A.dir),B=this.colliderSet.raw.coIntersectsRay(this.handle,g,C,I);return g.free(),C.free(),B}castShape(A,I,g,C,B,i,Q){let o=AA.intoRaw(A),e=AA.intoRaw(g),t=hI.intoRaw(C),a=AA.intoRaw(B),s=I.intoRaw(),n=RB.fromRaw(this.colliderSet,this.colliderSet.raw.coCastShape(this.handle,o,s,e,t,a,i,Q));return o.free(),e.free(),t.free(),a.free(),s.free(),n}castCollider(A,I,g,C,B){let i=AA.intoRaw(A),Q=AA.intoRaw(g),o=lQ.fromRaw(this.colliderSet,this.colliderSet.raw.coCastCollider(this.handle,i,I.handle,Q,C,B));return i.free(),Q.free(),o}intersectsShape(A,I,g){let C=AA.intoRaw(I),B=hI.intoRaw(g),i=A.intoRaw(),Q=this.colliderSet.raw.coIntersectsShape(this.handle,i,C,B);return C.free(),B.free(),i.free(),Q}contactShape(A,I,g,C){let B=AA.intoRaw(I),i=hI.intoRaw(g),Q=A.intoRaw(),o=wB.fromRaw(this.colliderSet.raw.coContactShape(this.handle,Q,B,i,C));return B.free(),i.free(),Q.free(),o}contactCollider(A,I){return wB.fromRaw(this.colliderSet.raw.coContactCollider(this.handle,A.handle,I))}castRay(A,I,g){let C=AA.intoRaw(A.origin),B=AA.intoRaw(A.dir),i=this.colliderSet.raw.coCastRay(this.handle,C,B,I,g);return C.free(),B.free(),i}castRayAndGetNormal(A,I,g){let C=AA.intoRaw(A.origin),B=AA.intoRaw(A.dir),i=cQ.fromRaw(this.colliderSet.raw.coCastRayAndGetNormal(this.handle,C,B,I,g));return C.free(),B.free(),i}}(function(E){E[E.Density=0]="Density",E[E.Mass=1]="Mass",E[E.MassProps=2]="MassProps"})(RC||(RC={}));class HI{constructor(A){this.shape=A,this.massPropsMode=RC.Density,this.density=1,this.friction=.5,this.restitution=0,this.rotation=hI.identity(),this.translation=AA.zeros(),this.isSensor=!1,this.collisionGroups=4294967295,this.solverGroups=4294967295,this.frictionCombineRule=EQ.Average,this.restitutionCombineRule=EQ.Average,this.activeCollisionTypes=Mi.DEFAULT,this.activeEvents=0,this.activeHooks=0,this.mass=0,this.centerOfMass=AA.zeros(),this.contactForceEventThreshold=0,this.principalAngularInertia=0,this.rotationsEnabled=!0}static ball(A){const I=new ko(A);return new HI(I)}static capsule(A,I){const g=new No(A,I);return new HI(g)}static segment(A,I){const g=new Uo(A,I);return new HI(g)}static triangle(A,I,g){const C=new Ko(A,I,g);return new HI(C)}static roundTriangle(A,I,g,C){const B=new Jo(A,I,g,C);return new HI(B)}static polyline(A,I){const g=new uo(A,I);return new HI(g)}static trimesh(A,I){const g=new fo(A,I);return new HI(g)}static cuboid(A,I){const g=new Fo(A,I);return new HI(g)}static roundCuboid(A,I,g){const C=new po(A,I,g);return new HI(C)}static halfspace(A){const I=new Ro(A);return new HI(I)}static heightfield(A,I){const g=new qo(A,I);return new HI(g)}static convexHull(A){const I=new Ri(A,!1);return new HI(I)}static convexPolyline(A){const I=new Ri(A,!0);return new HI(I)}static roundConvexHull(A,I){const g=new Fi(A,I,!1);return new HI(g)}static roundConvexPolyline(A,I){const g=new Fi(A,I,!0);return new HI(g)}setTranslation(A,I){if(typeof A!="number"||typeof I!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:A,y:I},this}setRotation(A){return this.rotation=A,this}setSensor(A){return this.isSensor=A,this}setDensity(A){return this.massPropsMode=RC.Density,this.density=A,this}setMass(A){return this.massPropsMode=RC.Mass,this.mass=A,this}setMassProperties(A,I,g){return this.massPropsMode=RC.MassProps,this.mass=A,AA.copy(this.centerOfMass,I),this.principalAngularInertia=g,this}setRestitution(A){return this.restitution=A,this}setFriction(A){return this.friction=A,this}setFrictionCombineRule(A){return this.frictionCombineRule=A,this}setRestitutionCombineRule(A){return this.restitutionCombineRule=A,this}setCollisionGroups(A){return this.collisionGroups=A,this}setSolverGroups(A){return this.solverGroups=A,this}setActiveHooks(A){return this.activeHooks=A,this}setActiveEvents(A){return this.activeEvents=A,this}setActiveCollisionTypes(A){return this.activeCollisionTypes=A,this}setContactForceEventThreshold(A){return this.contactForceEventThreshold=A,this}}class la{constructor(A){this.raw=A||new RI,this.map=new bi,A&&A.forEachColliderHandle(I=>{this.map.set(I,new Io(this,I,null))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}castClosure(A){return I=>A?A(this.get(I)):void 0}finalizeDeserialization(A){this.map.forEach(I=>I.finalizeDeserialization(A))}createCollider(A,I,g){let C=g!=null&&g!=null;if(C&&isNaN(g))throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");let B=I.shape.intoRaw(),i=AA.intoRaw(I.translation),Q=hI.intoRaw(I.rotation),o=AA.intoRaw(I.centerOfMass),e=this.raw.createCollider(B,i,Q,I.massPropsMode,I.mass,o,I.principalAngularInertia,I.density,I.friction,I.restitution,I.frictionCombineRule,I.restitutionCombineRule,I.isSensor,I.collisionGroups,I.solverGroups,I.activeCollisionTypes,I.activeHooks,I.activeEvents,I.contactForceEventThreshold,C,C?g:0,A.raw);B.free(),i.free(),Q.free(),o.free();let t=C?A.get(g):null,a=new Io(this,e,t,I.shape);return this.map.set(e,a),a}remove(A,I,g,C){this.raw.remove(A,I.raw,g.raw,C),this.unmap(A)}unmap(A){this.map.delete(A)}get(A){return this.map.get(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}forEach(A){this.map.forEach(A)}getAll(){return this.map.getAll()}}class wa{constructor(A){this.raw=A||new Si}free(){this.raw.free(),this.raw=void 0}step(A,I,g,C,B,i,Q,o,e,t,a,s){let n=AA.intoRaw(A);a?this.raw.stepWithEvents(n,I.raw,g.raw,C.raw,B.raw,i.raw,Q.raw,o.raw,e.raw,t.raw,a.raw,s,s?s.filterContactPair:null,s?s.filterIntersectionPair:null):this.raw.step(n,I.raw,g.raw,C.raw,B.raw,i.raw,Q.raw,o.raw,e.raw,t.raw),n.free()}}(function(E){E[E.EXCLUDE_FIXED=1]="EXCLUDE_FIXED",E[E.EXCLUDE_KINEMATIC=2]="EXCLUDE_KINEMATIC",E[E.EXCLUDE_DYNAMIC=4]="EXCLUDE_DYNAMIC",E[E.EXCLUDE_SENSORS=8]="EXCLUDE_SENSORS",E[E.EXCLUDE_SOLIDS=16]="EXCLUDE_SOLIDS",E[E.ONLY_DYNAMIC=3]="ONLY_DYNAMIC",E[E.ONLY_KINEMATIC=5]="ONLY_KINEMATIC",E[E.ONLY_FIXED=6]="ONLY_FIXED"})(zE||(zE={}));class Ga{constructor(A){this.raw=A||new QQ}free(){this.raw.free(),this.raw=void 0}update(A,I,g){this.raw.update(A.raw,I.raw,g.raw)}castRay(A,I,g,C,B,i,Q,o,e,t){let a=AA.intoRaw(g.origin),s=AA.intoRaw(g.dir),n=vi.fromRaw(I,this.raw.castRay(A.raw,I.raw,a,s,C,B,i,Q,o,e,t));return a.free(),s.free(),n}castRayAndGetNormal(A,I,g,C,B,i,Q,o,e,t){let a=AA.intoRaw(g.origin),s=AA.intoRaw(g.dir),n=eQ.fromRaw(I,this.raw.castRayAndGetNormal(A.raw,I.raw,a,s,C,B,i,Q,o,e,t));return a.free(),s.free(),n}intersectionsWithRay(A,I,g,C,B,i,Q,o,e,t,a){let s=AA.intoRaw(g.origin),n=AA.intoRaw(g.dir);this.raw.intersectionsWithRay(A.raw,I.raw,s,n,C,B,h=>i(eQ.fromRaw(I,h)),Q,o,e,t,a),s.free(),n.free()}intersectionWithShape(A,I,g,C,B,i,Q,o,e,t){let a=AA.intoRaw(g),s=hI.intoRaw(C),n=B.intoRaw(),h=this.raw.intersectionWithShape(A.raw,I.raw,a,s,n,i,Q,o,e,t);return a.free(),s.free(),n.free(),h}projectPoint(A,I,g,C,B,i,Q,o,e){let t=AA.intoRaw(g),a=oQ.fromRaw(I,this.raw.projectPoint(A.raw,I.raw,t,C,B,i,Q,o,e));return t.free(),a}projectPointAndGetFeature(A,I,g,C,B,i,Q,o){let e=AA.intoRaw(g),t=oQ.fromRaw(I,this.raw.projectPointAndGetFeature(A.raw,I.raw,e,C,B,i,Q,o));return e.free(),t}intersectionsWithPoint(A,I,g,C,B,i,Q,o,e){let t=AA.intoRaw(g);this.raw.intersectionsWithPoint(A.raw,I.raw,t,C,B,i,Q,o,e),t.free()}castShape(A,I,g,C,B,i,Q,o,e,t,a,s,n){let h=AA.intoRaw(g),D=hI.intoRaw(C),r=AA.intoRaw(B),G=i.intoRaw(),w=lQ.fromRaw(I,this.raw.castShape(A.raw,I.raw,h,D,r,G,Q,o,e,t,a,s,n));return h.free(),D.free(),r.free(),G.free(),w}intersectionsWithShape(A,I,g,C,B,i,Q,o,e,t,a){let s=AA.intoRaw(g),n=hI.intoRaw(C),h=B.intoRaw();this.raw.intersectionsWithShape(A.raw,I.raw,s,n,h,i,Q,o,e,t,a),s.free(),n.free(),h.free()}collidersWithAabbIntersectingAabb(A,I,g){let C=AA.intoRaw(A),B=AA.intoRaw(I);this.raw.collidersWithAabbIntersectingAabb(C,B,g),C.free(),B.free()}}class go{constructor(A){this.raw=A||new yi}free(){this.raw.free(),this.raw=void 0}serializeAll(A,I,g,C,B,i,Q,o,e){let t=AA.intoRaw(A);const a=this.raw.serializeAll(t,I.raw,g.raw,C.raw,B.raw,i.raw,Q.raw,o.raw,e.raw);return t.free(),a}deserializeAll(A){return wQ.fromRaw(this.raw.deserializeAll(A))}}class Sa{constructor(A,I){this.vertices=A,this.colors=I}}class da{constructor(A){this.raw=A||new wi}free(){this.raw.free(),this.raw=void 0,this.vertices=void 0,this.colors=void 0}render(A,I,g,C,B){this.raw.render(A.raw,I.raw,g.raw,C.raw,B.raw),this.vertices=this.raw.vertices(),this.colors=this.raw.colors()}}class ya{}class Ma{constructor(A,I,g,C,B){this.params=I,this.bodies=g,this.colliders=C,this.queries=B,this.raw=new Gi(A),this.rawCharacterCollision=new CQ,this._applyImpulsesToDynamicBodies=!1,this._characterMass=null}free(){this.raw&&(this.raw.free(),this.rawCharacterCollision.free()),this.raw=void 0,this.rawCharacterCollision=void 0}up(){return this.raw.up()}setUp(A){let I=AA.intoRaw(A);return this.raw.setUp(I)}applyImpulsesToDynamicBodies(){return this._applyImpulsesToDynamicBodies}setApplyImpulsesToDynamicBodies(A){this._applyImpulsesToDynamicBodies=A}characterMass(){return this._characterMass}setCharacterMass(A){this._characterMass=A}offset(){return this.raw.offset()}setOffset(A){this.raw.setOffset(A)}slideEnabled(){return this.raw.slideEnabled()}setSlideEnabled(A){this.raw.setSlideEnabled(A)}autostepMaxHeight(){return this.raw.autostepMaxHeight()}autostepMinWidth(){return this.raw.autostepMinWidth()}autostepIncludesDynamicBodies(){return this.raw.autostepIncludesDynamicBodies()}autostepEnabled(){return this.raw.autostepEnabled()}enableAutostep(A,I,g){this.raw.enableAutostep(A,I,g)}disableAutostep(){return this.raw.disableAutostep()}maxSlopeClimbAngle(){return this.raw.maxSlopeClimbAngle()}setMaxSlopeClimbAngle(A){this.raw.setMaxSlopeClimbAngle(A)}minSlopeSlideAngle(){return this.raw.minSlopeSlideAngle()}setMinSlopeSlideAngle(A){this.raw.setMinSlopeSlideAngle(A)}snapToGroundDistance(){return this.raw.snapToGroundDistance()}enableSnapToGround(A){this.raw.enableSnapToGround(A)}disableSnapToGround(){this.raw.disableSnapToGround()}snapToGroundEnabled(){return this.raw.snapToGroundEnabled()}computeColliderMovement(A,I,g,C,B){let i=AA.intoRaw(I);this.raw.computeColliderMovement(this.params.dt,this.bodies.raw,this.colliders.raw,this.queries.raw,A.handle,i,this._applyImpulsesToDynamicBodies,this._characterMass,g,C,this.colliders.castClosure(B)),i.free()}computedMovement(){return AA.fromRaw(this.raw.computedMovement())}computedGrounded(){return this.raw.computedGrounded()}numComputedCollisions(){return this.raw.numComputedCollisions()}computedCollision(A,I){if(!this.raw.computedCollision(A,this.rawCharacterCollision))return null;{let g=this.rawCharacterCollision;(I=I??new ya).translationApplied=AA.fromRaw(g.translationApplied()),I.translationRemaining=AA.fromRaw(g.translationRemaining()),I.toi=g.toi(),I.witness1=AA.fromRaw(g.worldWitness1()),I.witness2=AA.fromRaw(g.worldWitness2()),I.normal1=AA.fromRaw(g.worldNormal1()),I.normal2=AA.fromRaw(g.worldNormal2())}}}class wQ{constructor(A,I,g,C,B,i,Q,o,e,t,a,s,n,h){this.gravity=A,this.integrationParameters=new Ba(I),this.islands=new ra(g),this.broadPhase=new Da(C),this.narrowPhase=new ha(B),this.bodies=new Ca(i),this.colliders=new la(Q),this.impulseJoints=new oa(o),this.multibodyJoints=new sa(e),this.ccdSolver=new na(t),this.queryPipeline=new Ga(a),this.physicsPipeline=new wa(s),this.serializationPipeline=new go(n),this.debugRenderPipeline=new da(h),this.characterControllers=new Set,this.impulseJoints.finalizeDeserialization(this.bodies),this.bodies.finalizeDeserialization(this.colliders),this.colliders.finalizeDeserialization(this.bodies)}free(){this.integrationParameters.free(),this.islands.free(),this.broadPhase.free(),this.narrowPhase.free(),this.bodies.free(),this.colliders.free(),this.impulseJoints.free(),this.multibodyJoints.free(),this.ccdSolver.free(),this.queryPipeline.free(),this.physicsPipeline.free(),this.serializationPipeline.free(),this.debugRenderPipeline.free(),this.characterControllers.forEach(A=>A.free()),this.integrationParameters=void 0,this.islands=void 0,this.broadPhase=void 0,this.narrowPhase=void 0,this.bodies=void 0,this.colliders=void 0,this.ccdSolver=void 0,this.impulseJoints=void 0,this.multibodyJoints=void 0,this.queryPipeline=void 0,this.physicsPipeline=void 0,this.serializationPipeline=void 0,this.debugRenderPipeline=void 0,this.characterControllers=void 0}static fromRaw(A){return A?new wQ(AA.fromRaw(A.takeGravity()),A.takeIntegrationParameters(),A.takeIslandManager(),A.takeBroadPhase(),A.takeNarrowPhase(),A.takeBodies(),A.takeColliders(),A.takeImpulseJoints(),A.takeMultibodyJoints()):null}takeSnapshot(){return this.serializationPipeline.serializeAll(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}static restoreSnapshot(A){return new go().deserializeAll(A)}debugRender(){return this.debugRenderPipeline.render(this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints,this.narrowPhase),new Sa(this.debugRenderPipeline.vertices,this.debugRenderPipeline.colors)}step(A,I){this.physicsPipeline.step(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints,this.ccdSolver,A,I),this.queryPipeline.update(this.islands,this.bodies,this.colliders)}get timestep(){return this.integrationParameters.dt}set timestep(A){this.integrationParameters.dt=A}get maxVelocityIterations(){return this.integrationParameters.maxVelocityIterations}set maxVelocityIterations(A){this.integrationParameters.maxVelocityIterations=A}get maxVelocityFrictionIterations(){return this.integrationParameters.maxVelocityFrictionIterations}set maxVelocityFrictionIterations(A){this.integrationParameters.maxVelocityFrictionIterations=A}get maxStabilizationIterations(){return this.integrationParameters.maxStabilizationIterations}set maxStabilizationIterations(A){this.integrationParameters.maxStabilizationIterations=A}createRigidBody(A){return this.bodies.createRigidBody(this.colliders,A)}createCharacterController(A){let I=new Ma(A,this.integrationParameters,this.bodies,this.colliders,this.queryPipeline);return this.characterControllers.add(I),I}removeCharacterController(A){this.characterControllers.delete(A),A.free()}createCollider(A,I){let g=I?I.handle:void 0;return this.colliders.createCollider(this.bodies,A,g)}createImpulseJoint(A,I,g,C){return this.impulseJoints.createJoint(this.bodies,A,I.handle,g.handle,C)}createMultibodyJoint(A,I,g,C){return this.multibodyJoints.createJoint(A,I.handle,g.handle,C)}getRigidBody(A){return this.bodies.get(A)}getCollider(A){return this.colliders.get(A)}getImpulseJoint(A){return this.impulseJoints.get(A)}getMultibodyJoint(A){return this.multibodyJoints.get(A)}removeRigidBody(A){this.bodies&&this.bodies.remove(A.handle,this.islands,this.colliders,this.impulseJoints,this.multibodyJoints)}removeCollider(A,I){this.colliders&&this.colliders.remove(A.handle,this.islands,this.bodies,I)}removeImpulseJoint(A,I){this.impulseJoints&&this.impulseJoints.remove(A.handle,I)}removeMultibodyJoint(A,I){this.impulseJoints&&this.multibodyJoints.remove(A.handle,I)}forEachCollider(A){this.colliders.forEach(A)}forEachRigidBody(A){this.bodies.forEach(A)}forEachActiveRigidBody(A){this.bodies.forEachActiveRigidBody(this.islands,A)}castRay(A,I,g,C,B,i,Q,o){return this.queryPipeline.castRay(this.bodies,this.colliders,A,I,g,C,B,i?i.handle:null,Q?Q.handle:null,this.colliders.castClosure(o))}castRayAndGetNormal(A,I,g,C,B,i,Q,o){return this.queryPipeline.castRayAndGetNormal(this.bodies,this.colliders,A,I,g,C,B,i?i.handle:null,Q?Q.handle:null,this.colliders.castClosure(o))}intersectionsWithRay(A,I,g,C,B,i,Q,o,e){this.queryPipeline.intersectionsWithRay(this.bodies,this.colliders,A,I,g,C,B,i,Q?Q.handle:null,o?o.handle:null,this.colliders.castClosure(e))}intersectionWithShape(A,I,g,C,B,i,Q,o){let e=this.queryPipeline.intersectionWithShape(this.bodies,this.colliders,A,I,g,C,B,i?i.handle:null,Q?Q.handle:null,this.colliders.castClosure(o));return e!=null?this.colliders.get(e):null}projectPoint(A,I,g,C,B,i,Q){return this.queryPipeline.projectPoint(this.bodies,this.colliders,A,I,g,C,B?B.handle:null,i?i.handle:null,this.colliders.castClosure(Q))}projectPointAndGetFeature(A,I,g,C,B,i){return this.queryPipeline.projectPointAndGetFeature(this.bodies,this.colliders,A,I,g,C?C.handle:null,B?B.handle:null,this.colliders.castClosure(i))}intersectionsWithPoint(A,I,g,C,B,i,Q){this.queryPipeline.intersectionsWithPoint(this.bodies,this.colliders,A,this.colliders.castClosure(I),g,C,B?B.handle:null,i?i.handle:null,this.colliders.castClosure(Q))}castShape(A,I,g,C,B,i,Q,o,e,t,a){return this.queryPipeline.castShape(this.bodies,this.colliders,A,I,g,C,B,i,Q,o,e?e.handle:null,t?t.handle:null,this.colliders.castClosure(a))}intersectionsWithShape(A,I,g,C,B,i,Q,o,e){this.queryPipeline.intersectionsWithShape(this.bodies,this.colliders,A,I,g,this.colliders.castClosure(C),B,i,Q?Q.handle:null,o?o.handle:null,this.colliders.castClosure(e))}collidersWithAabbIntersectingAabb(A,I,g){this.queryPipeline.collidersWithAabbIntersectingAabb(A,I,this.colliders.castClosure(g))}contactsWith(A,I){this.narrowPhase.contactsWith(A.handle,this.colliders.castClosure(I))}intersectionsWith(A,I){this.narrowPhase.intersectionsWith(A.handle,this.colliders.castClosure(I))}contactPair(A,I,g){this.narrowPhase.contactPair(A.handle,I.handle,g)}intersectionPair(A,I){return this.narrowPhase.intersectionPair(A.handle,I.handle)}}(function(E){E[E.COLLISION_EVENTS=1]="COLLISION_EVENTS",E[E.CONTACT_FORCE_EVENTS=2]="CONTACT_FORCE_EVENTS"})(ki||(ki={}));class ka{free(){this.raw.free(),this.raw=void 0}collider1(){return this.raw.collider1()}collider2(){return this.raw.collider2()}totalForce(){return AA.fromRaw(this.raw.total_force())}totalForceMagnitude(){return this.raw.total_force_magnitude()}maxForceDirection(){return AA.fromRaw(this.raw.max_force_direction())}maxForceMagnitude(){return this.raw.max_force_magnitude()}}class s0{constructor(A,I){this.raw=I||new BQ(A)}free(){this.raw.free(),this.raw=void 0}drainCollisionEvents(A){this.raw.drainCollisionEvents(A)}drainContactForceEvents(A){let I=new ka;this.raw.drainContactForceEvents(g=>{I.raw=g,A(I),I.free()})}clear(){this.raw.clear()}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yo="148",S0=0,we=1,d0=2,Ra=1,y0=2,zB=3,hC=0,ag=1,GQ=2,HQ=3,aC=0,rB=1,Ge=2,Se=3,de=4,M0=5,tB=100,k0=101,R0=102,ye=103,Me=104,F0=200,p0=201,N0=202,U0=203,Fa=204,pa=205,K0=206,J0=207,u0=208,f0=209,q0=210,Y0=0,m0=1,L0=2,Co=3,H0=4,b0=5,v0=6,x0=7,mo=0,T0=1,O0=2,Zg=0,P0=1,W0=2,j0=3,_0=4,V0=5,Na=300,GB=301,SB=302,Bo=303,Qo=304,xi=306,tQ=1e3,pg=1001,io=1002,xI=1003,ke=1004,aE=1005,gg=1006,Z0=1007,aQ=1008,qC=1009,z0=1010,X0=1011,Ua=1012,$0=1013,FC=1014,pC=1015,sQ=1016,Ah=1017,Ih=1018,DB=1020,gh=1021,Ch=1022,Ng=1023,Bh=1024,Qh=1025,UC=1026,dB=1027,ih=1028,Eh=1029,oh=1030,eh=1031,th=1033,sE=33776,nE=33777,rE=33778,DE=33779,Re=35840,Fe=35841,pe=35842,Ne=35843,ah=36196,Ue=37492,Ke=37496,Je=37808,ue=37809,fe=37810,qe=37811,Ye=37812,me=37813,Le=37814,He=37815,be=37816,ve=37817,xe=37818,Te=37819,Oe=37820,Pe=37821,We=36492,YC=3e3,GI=3001,sh=3200,Ka=3201,Ja=0,nh=1,mg="srgb",nQ="srgb-linear",hE=7680,rh=519,je=35044,_e="300 es",Eo=1035;class FB{addEventListener(A,I){this._listeners===void 0&&(this._listeners={});const g=this._listeners;g[A]===void 0&&(g[A]=[]),g[A].indexOf(I)===-1&&g[A].push(I)}hasEventListener(A,I){if(this._listeners===void 0)return!1;const g=this._listeners;return g[A]!==void 0&&g[A].indexOf(I)!==-1}removeEventListener(A,I){if(this._listeners===void 0)return;const C=this._listeners[A];if(C!==void 0){const B=C.indexOf(I);B!==-1&&C.splice(B,1)}}dispatchEvent(A){if(this._listeners===void 0)return;const g=this._listeners[A.type];if(g!==void 0){A.target=this;const C=g.slice(0);for(let B=0,i=C.length;B<i;B++)C[B].call(this,A);A.target=null}}}const PI=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cE=Math.PI/180,Ve=180/Math.PI;function SQ(){const E=Math.random()*4294967295|0,A=Math.random()*4294967295|0,I=Math.random()*4294967295|0,g=Math.random()*4294967295|0;return(PI[E&255]+PI[E>>8&255]+PI[E>>16&255]+PI[E>>24&255]+"-"+PI[A&255]+PI[A>>8&255]+"-"+PI[A>>16&15|64]+PI[A>>24&255]+"-"+PI[I&63|128]+PI[I>>8&255]+"-"+PI[I>>16&255]+PI[I>>24&255]+PI[g&255]+PI[g>>8&255]+PI[g>>16&255]+PI[g>>24&255]).toLowerCase()}function tg(E,A,I){return Math.max(A,Math.min(I,E))}function Dh(E,A){return(E%A+A)%A}function lE(E,A,I){return(1-I)*E+I*A}function Ze(E){return(E&E-1)===0&&E!==0}function oo(E){return Math.pow(2,Math.floor(Math.log(E)/Math.LN2))}function bQ(E,A){switch(A.constructor){case Float32Array:return E;case Uint16Array:return E/65535;case Uint8Array:return E/255;case Int16Array:return Math.max(E/32767,-1);case Int8Array:return Math.max(E/127,-1);default:throw new Error("Invalid component type.")}}function Eg(E,A){switch(A.constructor){case Float32Array:return E;case Uint16Array:return Math.round(E*65535);case Uint8Array:return Math.round(E*255);case Int16Array:return Math.round(E*32767);case Int8Array:return Math.round(E*127);default:throw new Error("Invalid component type.")}}class gI{constructor(A=0,I=0){gI.prototype.isVector2=!0,this.x=A,this.y=I}get width(){return this.x}set width(A){this.x=A}get height(){return this.y}set height(A){this.y=A}set(A,I){return this.x=A,this.y=I,this}setScalar(A){return this.x=A,this.y=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setComponent(A,I){switch(A){case 0:this.x=I;break;case 1:this.y=I;break;default:throw new Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y)}copy(A){return this.x=A.x,this.y=A.y,this}add(A){return this.x+=A.x,this.y+=A.y,this}addScalar(A){return this.x+=A,this.y+=A,this}addVectors(A,I){return this.x=A.x+I.x,this.y=A.y+I.y,this}addScaledVector(A,I){return this.x+=A.x*I,this.y+=A.y*I,this}sub(A){return this.x-=A.x,this.y-=A.y,this}subScalar(A){return this.x-=A,this.y-=A,this}subVectors(A,I){return this.x=A.x-I.x,this.y=A.y-I.y,this}multiply(A){return this.x*=A.x,this.y*=A.y,this}multiplyScalar(A){return this.x*=A,this.y*=A,this}divide(A){return this.x/=A.x,this.y/=A.y,this}divideScalar(A){return this.multiplyScalar(1/A)}applyMatrix3(A){const I=this.x,g=this.y,C=A.elements;return this.x=C[0]*I+C[3]*g+C[6],this.y=C[1]*I+C[4]*g+C[7],this}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this}clamp(A,I){return this.x=Math.max(A.x,Math.min(I.x,this.x)),this.y=Math.max(A.y,Math.min(I.y,this.y)),this}clampScalar(A,I){return this.x=Math.max(A,Math.min(I,this.x)),this.y=Math.max(A,Math.min(I,this.y)),this}clampLength(A,I){const g=this.length();return this.divideScalar(g||1).multiplyScalar(Math.max(A,Math.min(I,g)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(A){return this.x*A.x+this.y*A.y}cross(A){return this.x*A.y-this.y*A.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(A){return Math.sqrt(this.distanceToSquared(A))}distanceToSquared(A){const I=this.x-A.x,g=this.y-A.y;return I*I+g*g}manhattanDistanceTo(A){return Math.abs(this.x-A.x)+Math.abs(this.y-A.y)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,I){return this.x+=(A.x-this.x)*I,this.y+=(A.y-this.y)*I,this}lerpVectors(A,I,g){return this.x=A.x+(I.x-A.x)*g,this.y=A.y+(I.y-A.y)*g,this}equals(A){return A.x===this.x&&A.y===this.y}fromArray(A,I=0){return this.x=A[I],this.y=A[I+1],this}toArray(A=[],I=0){return A[I]=this.x,A[I+1]=this.y,A}fromBufferAttribute(A,I){return this.x=A.getX(I),this.y=A.getY(I),this}rotateAround(A,I){const g=Math.cos(I),C=Math.sin(I),B=this.x-A.x,i=this.y-A.y;return this.x=B*g-i*C+A.x,this.y=B*C+i*g+A.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Cg{constructor(){Cg.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(A,I,g,C,B,i,Q,o,e){const t=this.elements;return t[0]=A,t[1]=C,t[2]=Q,t[3]=I,t[4]=B,t[5]=o,t[6]=g,t[7]=i,t[8]=e,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(A){const I=this.elements,g=A.elements;return I[0]=g[0],I[1]=g[1],I[2]=g[2],I[3]=g[3],I[4]=g[4],I[5]=g[5],I[6]=g[6],I[7]=g[7],I[8]=g[8],this}extractBasis(A,I,g){return A.setFromMatrix3Column(this,0),I.setFromMatrix3Column(this,1),g.setFromMatrix3Column(this,2),this}setFromMatrix4(A){const I=A.elements;return this.set(I[0],I[4],I[8],I[1],I[5],I[9],I[2],I[6],I[10]),this}multiply(A){return this.multiplyMatrices(this,A)}premultiply(A){return this.multiplyMatrices(A,this)}multiplyMatrices(A,I){const g=A.elements,C=I.elements,B=this.elements,i=g[0],Q=g[3],o=g[6],e=g[1],t=g[4],a=g[7],s=g[2],n=g[5],h=g[8],D=C[0],r=C[3],G=C[6],w=C[1],S=C[4],y=C[7],M=C[2],p=C[5],U=C[8];return B[0]=i*D+Q*w+o*M,B[3]=i*r+Q*S+o*p,B[6]=i*G+Q*y+o*U,B[1]=e*D+t*w+a*M,B[4]=e*r+t*S+a*p,B[7]=e*G+t*y+a*U,B[2]=s*D+n*w+h*M,B[5]=s*r+n*S+h*p,B[8]=s*G+n*y+h*U,this}multiplyScalar(A){const I=this.elements;return I[0]*=A,I[3]*=A,I[6]*=A,I[1]*=A,I[4]*=A,I[7]*=A,I[2]*=A,I[5]*=A,I[8]*=A,this}determinant(){const A=this.elements,I=A[0],g=A[1],C=A[2],B=A[3],i=A[4],Q=A[5],o=A[6],e=A[7],t=A[8];return I*i*t-I*Q*e-g*B*t+g*Q*o+C*B*e-C*i*o}invert(){const A=this.elements,I=A[0],g=A[1],C=A[2],B=A[3],i=A[4],Q=A[5],o=A[6],e=A[7],t=A[8],a=t*i-Q*e,s=Q*o-t*B,n=e*B-i*o,h=I*a+g*s+C*n;if(h===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/h;return A[0]=a*D,A[1]=(C*e-t*g)*D,A[2]=(Q*g-C*i)*D,A[3]=s*D,A[4]=(t*I-C*o)*D,A[5]=(C*B-Q*I)*D,A[6]=n*D,A[7]=(g*o-e*I)*D,A[8]=(i*I-g*B)*D,this}transpose(){let A;const I=this.elements;return A=I[1],I[1]=I[3],I[3]=A,A=I[2],I[2]=I[6],I[6]=A,A=I[5],I[5]=I[7],I[7]=A,this}getNormalMatrix(A){return this.setFromMatrix4(A).invert().transpose()}transposeIntoArray(A){const I=this.elements;return A[0]=I[0],A[1]=I[3],A[2]=I[6],A[3]=I[1],A[4]=I[4],A[5]=I[7],A[6]=I[2],A[7]=I[5],A[8]=I[8],this}setUvTransform(A,I,g,C,B,i,Q){const o=Math.cos(B),e=Math.sin(B);return this.set(g*o,g*e,-g*(o*i+e*Q)+i+A,-C*e,C*o,-C*(-e*i+o*Q)+Q+I,0,0,1),this}scale(A,I){return this.premultiply(wE.makeScale(A,I)),this}rotate(A){return this.premultiply(wE.makeRotation(-A)),this}translate(A,I){return this.premultiply(wE.makeTranslation(A,I)),this}makeTranslation(A,I){return this.set(1,0,A,0,1,I,0,0,1),this}makeRotation(A){const I=Math.cos(A),g=Math.sin(A);return this.set(I,-g,0,g,I,0,0,0,1),this}makeScale(A,I){return this.set(A,0,0,0,I,0,0,0,1),this}equals(A){const I=this.elements,g=A.elements;for(let C=0;C<9;C++)if(I[C]!==g[C])return!1;return!0}fromArray(A,I=0){for(let g=0;g<9;g++)this.elements[g]=A[g+I];return this}toArray(A=[],I=0){const g=this.elements;return A[I]=g[0],A[I+1]=g[1],A[I+2]=g[2],A[I+3]=g[3],A[I+4]=g[4],A[I+5]=g[5],A[I+6]=g[6],A[I+7]=g[7],A[I+8]=g[8],A}clone(){return new this.constructor().fromArray(this.elements)}}const wE=new Cg;function ua(E){for(let A=E.length-1;A>=0;--A)if(E[A]>=65535)return!0;return!1}function pi(E){return document.createElementNS("http://www.w3.org/1999/xhtml",E)}function KC(E){return E<.04045?E*.0773993808:Math.pow(E*.9478672986+.0521327014,2.4)}function ni(E){return E<.0031308?E*12.92:1.055*Math.pow(E,.41666)-.055}const GE={[mg]:{[nQ]:KC},[nQ]:{[mg]:ni}},VI={legacyMode:!0,get workingColorSpace(){return nQ},set workingColorSpace(E){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(E,A,I){if(this.legacyMode||A===I||!A||!I)return E;if(GE[A]&&GE[A][I]!==void 0){const g=GE[A][I];return E.r=g(E.r),E.g=g(E.g),E.b=g(E.b),E}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(E,A){return this.convert(E,this.workingColorSpace,A)},toWorkingColorSpace:function(E,A){return this.convert(E,A,this.workingColorSpace)}},fa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},uI={r:0,g:0,b:0},dg={h:0,s:0,l:0},vQ={h:0,s:0,l:0};function SE(E,A,I){return I<0&&(I+=1),I>1&&(I-=1),I<1/6?E+(A-E)*6*I:I<1/2?A:I<2/3?E+(A-E)*6*(2/3-I):E}function xQ(E,A){return A.r=E.r,A.g=E.g,A.b=E.b,A}class II{constructor(A,I,g){return this.isColor=!0,this.r=1,this.g=1,this.b=1,I===void 0&&g===void 0?this.set(A):this.setRGB(A,I,g)}set(A){return A&&A.isColor?this.copy(A):typeof A=="number"?this.setHex(A):typeof A=="string"&&this.setStyle(A),this}setScalar(A){return this.r=A,this.g=A,this.b=A,this}setHex(A,I=mg){return A=Math.floor(A),this.r=(A>>16&255)/255,this.g=(A>>8&255)/255,this.b=(A&255)/255,VI.toWorkingColorSpace(this,I),this}setRGB(A,I,g,C=VI.workingColorSpace){return this.r=A,this.g=I,this.b=g,VI.toWorkingColorSpace(this,C),this}setHSL(A,I,g,C=VI.workingColorSpace){if(A=Dh(A,1),I=tg(I,0,1),g=tg(g,0,1),I===0)this.r=this.g=this.b=g;else{const B=g<=.5?g*(1+I):g+I-g*I,i=2*g-B;this.r=SE(i,B,A+1/3),this.g=SE(i,B,A),this.b=SE(i,B,A-1/3)}return VI.toWorkingColorSpace(this,C),this}setStyle(A,I=mg){function g(B){B!==void 0&&parseFloat(B)<1&&console.warn("THREE.Color: Alpha component of "+A+" will be ignored.")}let C;if(C=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(A)){let B;const i=C[1],Q=C[2];switch(i){case"rgb":case"rgba":if(B=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Q))return this.r=Math.min(255,parseInt(B[1],10))/255,this.g=Math.min(255,parseInt(B[2],10))/255,this.b=Math.min(255,parseInt(B[3],10))/255,VI.toWorkingColorSpace(this,I),g(B[4]),this;if(B=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Q))return this.r=Math.min(100,parseInt(B[1],10))/100,this.g=Math.min(100,parseInt(B[2],10))/100,this.b=Math.min(100,parseInt(B[3],10))/100,VI.toWorkingColorSpace(this,I),g(B[4]),this;break;case"hsl":case"hsla":if(B=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Q)){const o=parseFloat(B[1])/360,e=parseFloat(B[2])/100,t=parseFloat(B[3])/100;return g(B[4]),this.setHSL(o,e,t,I)}break}}else if(C=/^\#([A-Fa-f\d]+)$/.exec(A)){const B=C[1],i=B.length;if(i===3)return this.r=parseInt(B.charAt(0)+B.charAt(0),16)/255,this.g=parseInt(B.charAt(1)+B.charAt(1),16)/255,this.b=parseInt(B.charAt(2)+B.charAt(2),16)/255,VI.toWorkingColorSpace(this,I),this;if(i===6)return this.r=parseInt(B.charAt(0)+B.charAt(1),16)/255,this.g=parseInt(B.charAt(2)+B.charAt(3),16)/255,this.b=parseInt(B.charAt(4)+B.charAt(5),16)/255,VI.toWorkingColorSpace(this,I),this}return A&&A.length>0?this.setColorName(A,I):this}setColorName(A,I=mg){const g=fa[A.toLowerCase()];return g!==void 0?this.setHex(g,I):console.warn("THREE.Color: Unknown color "+A),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(A){return this.r=A.r,this.g=A.g,this.b=A.b,this}copySRGBToLinear(A){return this.r=KC(A.r),this.g=KC(A.g),this.b=KC(A.b),this}copyLinearToSRGB(A){return this.r=ni(A.r),this.g=ni(A.g),this.b=ni(A.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(A=mg){return VI.fromWorkingColorSpace(xQ(this,uI),A),tg(uI.r*255,0,255)<<16^tg(uI.g*255,0,255)<<8^tg(uI.b*255,0,255)<<0}getHexString(A=mg){return("000000"+this.getHex(A).toString(16)).slice(-6)}getHSL(A,I=VI.workingColorSpace){VI.fromWorkingColorSpace(xQ(this,uI),I);const g=uI.r,C=uI.g,B=uI.b,i=Math.max(g,C,B),Q=Math.min(g,C,B);let o,e;const t=(Q+i)/2;if(Q===i)o=0,e=0;else{const a=i-Q;switch(e=t<=.5?a/(i+Q):a/(2-i-Q),i){case g:o=(C-B)/a+(C<B?6:0);break;case C:o=(B-g)/a+2;break;case B:o=(g-C)/a+4;break}o/=6}return A.h=o,A.s=e,A.l=t,A}getRGB(A,I=VI.workingColorSpace){return VI.fromWorkingColorSpace(xQ(this,uI),I),A.r=uI.r,A.g=uI.g,A.b=uI.b,A}getStyle(A=mg){return VI.fromWorkingColorSpace(xQ(this,uI),A),A!==mg?`color(${A} ${uI.r} ${uI.g} ${uI.b})`:`rgb(${uI.r*255|0},${uI.g*255|0},${uI.b*255|0})`}offsetHSL(A,I,g){return this.getHSL(dg),dg.h+=A,dg.s+=I,dg.l+=g,this.setHSL(dg.h,dg.s,dg.l),this}add(A){return this.r+=A.r,this.g+=A.g,this.b+=A.b,this}addColors(A,I){return this.r=A.r+I.r,this.g=A.g+I.g,this.b=A.b+I.b,this}addScalar(A){return this.r+=A,this.g+=A,this.b+=A,this}sub(A){return this.r=Math.max(0,this.r-A.r),this.g=Math.max(0,this.g-A.g),this.b=Math.max(0,this.b-A.b),this}multiply(A){return this.r*=A.r,this.g*=A.g,this.b*=A.b,this}multiplyScalar(A){return this.r*=A,this.g*=A,this.b*=A,this}lerp(A,I){return this.r+=(A.r-this.r)*I,this.g+=(A.g-this.g)*I,this.b+=(A.b-this.b)*I,this}lerpColors(A,I,g){return this.r=A.r+(I.r-A.r)*g,this.g=A.g+(I.g-A.g)*g,this.b=A.b+(I.b-A.b)*g,this}lerpHSL(A,I){this.getHSL(dg),A.getHSL(vQ);const g=lE(dg.h,vQ.h,I),C=lE(dg.s,vQ.s,I),B=lE(dg.l,vQ.l,I);return this.setHSL(g,C,B),this}equals(A){return A.r===this.r&&A.g===this.g&&A.b===this.b}fromArray(A,I=0){return this.r=A[I],this.g=A[I+1],this.b=A[I+2],this}toArray(A=[],I=0){return A[I]=this.r,A[I+1]=this.g,A[I+2]=this.b,A}fromBufferAttribute(A,I){return this.r=A.getX(I),this.g=A.getY(I),this.b=A.getZ(I),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}II.NAMES=fa;let VC;class qa{static getDataURL(A){if(/^data:/i.test(A.src)||typeof HTMLCanvasElement>"u")return A.src;let I;if(A instanceof HTMLCanvasElement)I=A;else{VC===void 0&&(VC=pi("canvas")),VC.width=A.width,VC.height=A.height;const g=VC.getContext("2d");A instanceof ImageData?g.putImageData(A,0,0):g.drawImage(A,0,0,A.width,A.height),I=VC}return I.width>2048||I.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",A),I.toDataURL("image/jpeg",.6)):I.toDataURL("image/png")}static sRGBToLinear(A){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const I=pi("canvas");I.width=A.width,I.height=A.height;const g=I.getContext("2d");g.drawImage(A,0,0,A.width,A.height);const C=g.getImageData(0,0,A.width,A.height),B=C.data;for(let i=0;i<B.length;i++)B[i]=KC(B[i]/255)*255;return g.putImageData(C,0,0),I}else if(A.data){const I=A.data.slice(0);for(let g=0;g<I.length;g++)I instanceof Uint8Array||I instanceof Uint8ClampedArray?I[g]=Math.floor(KC(I[g]/255)*255):I[g]=KC(I[g]);return{data:I,width:A.width,height:A.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),A}}class Ya{constructor(A=null){this.isSource=!0,this.uuid=SQ(),this.data=A,this.version=0}set needsUpdate(A){A===!0&&this.version++}toJSON(A){const I=A===void 0||typeof A=="string";if(!I&&A.images[this.uuid]!==void 0)return A.images[this.uuid];const g={uuid:this.uuid,url:""},C=this.data;if(C!==null){let B;if(Array.isArray(C)){B=[];for(let i=0,Q=C.length;i<Q;i++)C[i].isDataTexture?B.push(dE(C[i].image)):B.push(dE(C[i]))}else B=dE(C);g.url=B}return I||(A.images[this.uuid]=g),g}}function dE(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap?qa.getDataURL(E):E.data?{data:Array.from(E.data),width:E.width,height:E.height,type:E.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let hh=0;class XI extends FB{constructor(A=XI.DEFAULT_IMAGE,I=XI.DEFAULT_MAPPING,g=pg,C=pg,B=gg,i=aQ,Q=Ng,o=qC,e=XI.DEFAULT_ANISOTROPY,t=YC){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=SQ(),this.name="",this.source=new Ya(A),this.mipmaps=[],this.mapping=I,this.wrapS=g,this.wrapT=C,this.magFilter=B,this.minFilter=i,this.anisotropy=e,this.format=Q,this.internalFormat=null,this.type=o,this.offset=new gI(0,0),this.repeat=new gI(1,1),this.center=new gI(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Cg,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=t,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(A){this.source.data=A}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(A){return this.name=A.name,this.source=A.source,this.mipmaps=A.mipmaps.slice(0),this.mapping=A.mapping,this.wrapS=A.wrapS,this.wrapT=A.wrapT,this.magFilter=A.magFilter,this.minFilter=A.minFilter,this.anisotropy=A.anisotropy,this.format=A.format,this.internalFormat=A.internalFormat,this.type=A.type,this.offset.copy(A.offset),this.repeat.copy(A.repeat),this.center.copy(A.center),this.rotation=A.rotation,this.matrixAutoUpdate=A.matrixAutoUpdate,this.matrix.copy(A.matrix),this.generateMipmaps=A.generateMipmaps,this.premultiplyAlpha=A.premultiplyAlpha,this.flipY=A.flipY,this.unpackAlignment=A.unpackAlignment,this.encoding=A.encoding,this.userData=JSON.parse(JSON.stringify(A.userData)),this.needsUpdate=!0,this}toJSON(A){const I=A===void 0||typeof A=="string";if(!I&&A.textures[this.uuid]!==void 0)return A.textures[this.uuid];const g={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(A).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(g.userData=this.userData),I||(A.textures[this.uuid]=g),g}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(A){if(this.mapping!==Na)return A;if(A.applyMatrix3(this.matrix),A.x<0||A.x>1)switch(this.wrapS){case tQ:A.x=A.x-Math.floor(A.x);break;case pg:A.x=A.x<0?0:1;break;case io:Math.abs(Math.floor(A.x)%2)===1?A.x=Math.ceil(A.x)-A.x:A.x=A.x-Math.floor(A.x);break}if(A.y<0||A.y>1)switch(this.wrapT){case tQ:A.y=A.y-Math.floor(A.y);break;case pg:A.y=A.y<0?0:1;break;case io:Math.abs(Math.floor(A.y)%2)===1?A.y=Math.ceil(A.y)-A.y:A.y=A.y-Math.floor(A.y);break}return this.flipY&&(A.y=1-A.y),A}set needsUpdate(A){A===!0&&(this.version++,this.source.needsUpdate=!0)}}XI.DEFAULT_IMAGE=null;XI.DEFAULT_MAPPING=Na;XI.DEFAULT_ANISOTROPY=1;class wI{constructor(A=0,I=0,g=0,C=1){wI.prototype.isVector4=!0,this.x=A,this.y=I,this.z=g,this.w=C}get width(){return this.z}set width(A){this.z=A}get height(){return this.w}set height(A){this.w=A}set(A,I,g,C){return this.x=A,this.y=I,this.z=g,this.w=C,this}setScalar(A){return this.x=A,this.y=A,this.z=A,this.w=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setZ(A){return this.z=A,this}setW(A){return this.w=A,this}setComponent(A,I){switch(A){case 0:this.x=I;break;case 1:this.y=I;break;case 2:this.z=I;break;case 3:this.w=I;break;default:throw new Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(A){return this.x=A.x,this.y=A.y,this.z=A.z,this.w=A.w!==void 0?A.w:1,this}add(A){return this.x+=A.x,this.y+=A.y,this.z+=A.z,this.w+=A.w,this}addScalar(A){return this.x+=A,this.y+=A,this.z+=A,this.w+=A,this}addVectors(A,I){return this.x=A.x+I.x,this.y=A.y+I.y,this.z=A.z+I.z,this.w=A.w+I.w,this}addScaledVector(A,I){return this.x+=A.x*I,this.y+=A.y*I,this.z+=A.z*I,this.w+=A.w*I,this}sub(A){return this.x-=A.x,this.y-=A.y,this.z-=A.z,this.w-=A.w,this}subScalar(A){return this.x-=A,this.y-=A,this.z-=A,this.w-=A,this}subVectors(A,I){return this.x=A.x-I.x,this.y=A.y-I.y,this.z=A.z-I.z,this.w=A.w-I.w,this}multiply(A){return this.x*=A.x,this.y*=A.y,this.z*=A.z,this.w*=A.w,this}multiplyScalar(A){return this.x*=A,this.y*=A,this.z*=A,this.w*=A,this}applyMatrix4(A){const I=this.x,g=this.y,C=this.z,B=this.w,i=A.elements;return this.x=i[0]*I+i[4]*g+i[8]*C+i[12]*B,this.y=i[1]*I+i[5]*g+i[9]*C+i[13]*B,this.z=i[2]*I+i[6]*g+i[10]*C+i[14]*B,this.w=i[3]*I+i[7]*g+i[11]*C+i[15]*B,this}divideScalar(A){return this.multiplyScalar(1/A)}setAxisAngleFromQuaternion(A){this.w=2*Math.acos(A.w);const I=Math.sqrt(1-A.w*A.w);return I<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=A.x/I,this.y=A.y/I,this.z=A.z/I),this}setAxisAngleFromRotationMatrix(A){let I,g,C,B;const o=A.elements,e=o[0],t=o[4],a=o[8],s=o[1],n=o[5],h=o[9],D=o[2],r=o[6],G=o[10];if(Math.abs(t-s)<.01&&Math.abs(a-D)<.01&&Math.abs(h-r)<.01){if(Math.abs(t+s)<.1&&Math.abs(a+D)<.1&&Math.abs(h+r)<.1&&Math.abs(e+n+G-3)<.1)return this.set(1,0,0,0),this;I=Math.PI;const S=(e+1)/2,y=(n+1)/2,M=(G+1)/2,p=(t+s)/4,U=(a+D)/4,l=(h+r)/4;return S>y&&S>M?S<.01?(g=0,C=.707106781,B=.707106781):(g=Math.sqrt(S),C=p/g,B=U/g):y>M?y<.01?(g=.707106781,C=0,B=.707106781):(C=Math.sqrt(y),g=p/C,B=l/C):M<.01?(g=.707106781,C=.707106781,B=0):(B=Math.sqrt(M),g=U/B,C=l/B),this.set(g,C,B,I),this}let w=Math.sqrt((r-h)*(r-h)+(a-D)*(a-D)+(s-t)*(s-t));return Math.abs(w)<.001&&(w=1),this.x=(r-h)/w,this.y=(a-D)/w,this.z=(s-t)/w,this.w=Math.acos((e+n+G-1)/2),this}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this.z=Math.min(this.z,A.z),this.w=Math.min(this.w,A.w),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this.z=Math.max(this.z,A.z),this.w=Math.max(this.w,A.w),this}clamp(A,I){return this.x=Math.max(A.x,Math.min(I.x,this.x)),this.y=Math.max(A.y,Math.min(I.y,this.y)),this.z=Math.max(A.z,Math.min(I.z,this.z)),this.w=Math.max(A.w,Math.min(I.w,this.w)),this}clampScalar(A,I){return this.x=Math.max(A,Math.min(I,this.x)),this.y=Math.max(A,Math.min(I,this.y)),this.z=Math.max(A,Math.min(I,this.z)),this.w=Math.max(A,Math.min(I,this.w)),this}clampLength(A,I){const g=this.length();return this.divideScalar(g||1).multiplyScalar(Math.max(A,Math.min(I,g)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(A){return this.x*A.x+this.y*A.y+this.z*A.z+this.w*A.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,I){return this.x+=(A.x-this.x)*I,this.y+=(A.y-this.y)*I,this.z+=(A.z-this.z)*I,this.w+=(A.w-this.w)*I,this}lerpVectors(A,I,g){return this.x=A.x+(I.x-A.x)*g,this.y=A.y+(I.y-A.y)*g,this.z=A.z+(I.z-A.z)*g,this.w=A.w+(I.w-A.w)*g,this}equals(A){return A.x===this.x&&A.y===this.y&&A.z===this.z&&A.w===this.w}fromArray(A,I=0){return this.x=A[I],this.y=A[I+1],this.z=A[I+2],this.w=A[I+3],this}toArray(A=[],I=0){return A[I]=this.x,A[I+1]=this.y,A[I+2]=this.z,A[I+3]=this.w,A}fromBufferAttribute(A,I){return this.x=A.getX(I),this.y=A.getY(I),this.z=A.getZ(I),this.w=A.getW(I),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mC extends FB{constructor(A=1,I=1,g={}){super(),this.isWebGLRenderTarget=!0,this.width=A,this.height=I,this.depth=1,this.scissor=new wI(0,0,A,I),this.scissorTest=!1,this.viewport=new wI(0,0,A,I);const C={width:A,height:I,depth:1};this.texture=new XI(C,g.mapping,g.wrapS,g.wrapT,g.magFilter,g.minFilter,g.format,g.type,g.anisotropy,g.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=g.generateMipmaps!==void 0?g.generateMipmaps:!1,this.texture.internalFormat=g.internalFormat!==void 0?g.internalFormat:null,this.texture.minFilter=g.minFilter!==void 0?g.minFilter:gg,this.depthBuffer=g.depthBuffer!==void 0?g.depthBuffer:!0,this.stencilBuffer=g.stencilBuffer!==void 0?g.stencilBuffer:!1,this.depthTexture=g.depthTexture!==void 0?g.depthTexture:null,this.samples=g.samples!==void 0?g.samples:0}setSize(A,I,g=1){(this.width!==A||this.height!==I||this.depth!==g)&&(this.width=A,this.height=I,this.depth=g,this.texture.image.width=A,this.texture.image.height=I,this.texture.image.depth=g,this.dispose()),this.viewport.set(0,0,A,I),this.scissor.set(0,0,A,I)}clone(){return new this.constructor().copy(this)}copy(A){this.width=A.width,this.height=A.height,this.depth=A.depth,this.viewport.copy(A.viewport),this.texture=A.texture.clone(),this.texture.isRenderTargetTexture=!0;const I=Object.assign({},A.texture.image);return this.texture.source=new Ya(I),this.depthBuffer=A.depthBuffer,this.stencilBuffer=A.stencilBuffer,A.depthTexture!==null&&(this.depthTexture=A.depthTexture.clone()),this.samples=A.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ma extends XI{constructor(A=null,I=1,g=1,C=1){super(null),this.isDataArrayTexture=!0,this.image={data:A,width:I,height:g,depth:C},this.magFilter=xI,this.minFilter=xI,this.wrapR=pg,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ch extends XI{constructor(A=null,I=1,g=1,C=1){super(null),this.isData3DTexture=!0,this.image={data:A,width:I,height:g,depth:C},this.magFilter=xI,this.minFilter=xI,this.wrapR=pg,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dQ{constructor(A=0,I=0,g=0,C=1){this.isQuaternion=!0,this._x=A,this._y=I,this._z=g,this._w=C}static slerpFlat(A,I,g,C,B,i,Q){let o=g[C+0],e=g[C+1],t=g[C+2],a=g[C+3];const s=B[i+0],n=B[i+1],h=B[i+2],D=B[i+3];if(Q===0){A[I+0]=o,A[I+1]=e,A[I+2]=t,A[I+3]=a;return}if(Q===1){A[I+0]=s,A[I+1]=n,A[I+2]=h,A[I+3]=D;return}if(a!==D||o!==s||e!==n||t!==h){let r=1-Q;const G=o*s+e*n+t*h+a*D,w=G>=0?1:-1,S=1-G*G;if(S>Number.EPSILON){const M=Math.sqrt(S),p=Math.atan2(M,G*w);r=Math.sin(r*p)/M,Q=Math.sin(Q*p)/M}const y=Q*w;if(o=o*r+s*y,e=e*r+n*y,t=t*r+h*y,a=a*r+D*y,r===1-Q){const M=1/Math.sqrt(o*o+e*e+t*t+a*a);o*=M,e*=M,t*=M,a*=M}}A[I]=o,A[I+1]=e,A[I+2]=t,A[I+3]=a}static multiplyQuaternionsFlat(A,I,g,C,B,i){const Q=g[C],o=g[C+1],e=g[C+2],t=g[C+3],a=B[i],s=B[i+1],n=B[i+2],h=B[i+3];return A[I]=Q*h+t*a+o*n-e*s,A[I+1]=o*h+t*s+e*a-Q*n,A[I+2]=e*h+t*n+Q*s-o*a,A[I+3]=t*h-Q*a-o*s-e*n,A}get x(){return this._x}set x(A){this._x=A,this._onChangeCallback()}get y(){return this._y}set y(A){this._y=A,this._onChangeCallback()}get z(){return this._z}set z(A){this._z=A,this._onChangeCallback()}get w(){return this._w}set w(A){this._w=A,this._onChangeCallback()}set(A,I,g,C){return this._x=A,this._y=I,this._z=g,this._w=C,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(A){return this._x=A.x,this._y=A.y,this._z=A.z,this._w=A.w,this._onChangeCallback(),this}setFromEuler(A,I){const g=A._x,C=A._y,B=A._z,i=A._order,Q=Math.cos,o=Math.sin,e=Q(g/2),t=Q(C/2),a=Q(B/2),s=o(g/2),n=o(C/2),h=o(B/2);switch(i){case"XYZ":this._x=s*t*a+e*n*h,this._y=e*n*a-s*t*h,this._z=e*t*h+s*n*a,this._w=e*t*a-s*n*h;break;case"YXZ":this._x=s*t*a+e*n*h,this._y=e*n*a-s*t*h,this._z=e*t*h-s*n*a,this._w=e*t*a+s*n*h;break;case"ZXY":this._x=s*t*a-e*n*h,this._y=e*n*a+s*t*h,this._z=e*t*h+s*n*a,this._w=e*t*a-s*n*h;break;case"ZYX":this._x=s*t*a-e*n*h,this._y=e*n*a+s*t*h,this._z=e*t*h-s*n*a,this._w=e*t*a+s*n*h;break;case"YZX":this._x=s*t*a+e*n*h,this._y=e*n*a+s*t*h,this._z=e*t*h-s*n*a,this._w=e*t*a-s*n*h;break;case"XZY":this._x=s*t*a-e*n*h,this._y=e*n*a-s*t*h,this._z=e*t*h+s*n*a,this._w=e*t*a+s*n*h;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+i)}return I!==!1&&this._onChangeCallback(),this}setFromAxisAngle(A,I){const g=I/2,C=Math.sin(g);return this._x=A.x*C,this._y=A.y*C,this._z=A.z*C,this._w=Math.cos(g),this._onChangeCallback(),this}setFromRotationMatrix(A){const I=A.elements,g=I[0],C=I[4],B=I[8],i=I[1],Q=I[5],o=I[9],e=I[2],t=I[6],a=I[10],s=g+Q+a;if(s>0){const n=.5/Math.sqrt(s+1);this._w=.25/n,this._x=(t-o)*n,this._y=(B-e)*n,this._z=(i-C)*n}else if(g>Q&&g>a){const n=2*Math.sqrt(1+g-Q-a);this._w=(t-o)/n,this._x=.25*n,this._y=(C+i)/n,this._z=(B+e)/n}else if(Q>a){const n=2*Math.sqrt(1+Q-g-a);this._w=(B-e)/n,this._x=(C+i)/n,this._y=.25*n,this._z=(o+t)/n}else{const n=2*Math.sqrt(1+a-g-Q);this._w=(i-C)/n,this._x=(B+e)/n,this._y=(o+t)/n,this._z=.25*n}return this._onChangeCallback(),this}setFromUnitVectors(A,I){let g=A.dot(I)+1;return g<Number.EPSILON?(g=0,Math.abs(A.x)>Math.abs(A.z)?(this._x=-A.y,this._y=A.x,this._z=0,this._w=g):(this._x=0,this._y=-A.z,this._z=A.y,this._w=g)):(this._x=A.y*I.z-A.z*I.y,this._y=A.z*I.x-A.x*I.z,this._z=A.x*I.y-A.y*I.x,this._w=g),this.normalize()}angleTo(A){return 2*Math.acos(Math.abs(tg(this.dot(A),-1,1)))}rotateTowards(A,I){const g=this.angleTo(A);if(g===0)return this;const C=Math.min(1,I/g);return this.slerp(A,C),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(A){return this._x*A._x+this._y*A._y+this._z*A._z+this._w*A._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let A=this.length();return A===0?(this._x=0,this._y=0,this._z=0,this._w=1):(A=1/A,this._x=this._x*A,this._y=this._y*A,this._z=this._z*A,this._w=this._w*A),this._onChangeCallback(),this}multiply(A){return this.multiplyQuaternions(this,A)}premultiply(A){return this.multiplyQuaternions(A,this)}multiplyQuaternions(A,I){const g=A._x,C=A._y,B=A._z,i=A._w,Q=I._x,o=I._y,e=I._z,t=I._w;return this._x=g*t+i*Q+C*e-B*o,this._y=C*t+i*o+B*Q-g*e,this._z=B*t+i*e+g*o-C*Q,this._w=i*t-g*Q-C*o-B*e,this._onChangeCallback(),this}slerp(A,I){if(I===0)return this;if(I===1)return this.copy(A);const g=this._x,C=this._y,B=this._z,i=this._w;let Q=i*A._w+g*A._x+C*A._y+B*A._z;if(Q<0?(this._w=-A._w,this._x=-A._x,this._y=-A._y,this._z=-A._z,Q=-Q):this.copy(A),Q>=1)return this._w=i,this._x=g,this._y=C,this._z=B,this;const o=1-Q*Q;if(o<=Number.EPSILON){const n=1-I;return this._w=n*i+I*this._w,this._x=n*g+I*this._x,this._y=n*C+I*this._y,this._z=n*B+I*this._z,this.normalize(),this._onChangeCallback(),this}const e=Math.sqrt(o),t=Math.atan2(e,Q),a=Math.sin((1-I)*t)/e,s=Math.sin(I*t)/e;return this._w=i*a+this._w*s,this._x=g*a+this._x*s,this._y=C*a+this._y*s,this._z=B*a+this._z*s,this._onChangeCallback(),this}slerpQuaternions(A,I,g){return this.copy(A).slerp(I,g)}random(){const A=Math.random(),I=Math.sqrt(1-A),g=Math.sqrt(A),C=2*Math.PI*Math.random(),B=2*Math.PI*Math.random();return this.set(I*Math.cos(C),g*Math.sin(B),g*Math.cos(B),I*Math.sin(C))}equals(A){return A._x===this._x&&A._y===this._y&&A._z===this._z&&A._w===this._w}fromArray(A,I=0){return this._x=A[I],this._y=A[I+1],this._z=A[I+2],this._w=A[I+3],this._onChangeCallback(),this}toArray(A=[],I=0){return A[I]=this._x,A[I+1]=this._y,A[I+2]=this._z,A[I+3]=this._w,A}fromBufferAttribute(A,I){return this._x=A.getX(I),this._y=A.getY(I),this._z=A.getZ(I),this._w=A.getW(I),this}_onChange(A){return this._onChangeCallback=A,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(A=0,I=0,g=0){V.prototype.isVector3=!0,this.x=A,this.y=I,this.z=g}set(A,I,g){return g===void 0&&(g=this.z),this.x=A,this.y=I,this.z=g,this}setScalar(A){return this.x=A,this.y=A,this.z=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setZ(A){return this.z=A,this}setComponent(A,I){switch(A){case 0:this.x=I;break;case 1:this.y=I;break;case 2:this.z=I;break;default:throw new Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(A){return this.x=A.x,this.y=A.y,this.z=A.z,this}add(A){return this.x+=A.x,this.y+=A.y,this.z+=A.z,this}addScalar(A){return this.x+=A,this.y+=A,this.z+=A,this}addVectors(A,I){return this.x=A.x+I.x,this.y=A.y+I.y,this.z=A.z+I.z,this}addScaledVector(A,I){return this.x+=A.x*I,this.y+=A.y*I,this.z+=A.z*I,this}sub(A){return this.x-=A.x,this.y-=A.y,this.z-=A.z,this}subScalar(A){return this.x-=A,this.y-=A,this.z-=A,this}subVectors(A,I){return this.x=A.x-I.x,this.y=A.y-I.y,this.z=A.z-I.z,this}multiply(A){return this.x*=A.x,this.y*=A.y,this.z*=A.z,this}multiplyScalar(A){return this.x*=A,this.y*=A,this.z*=A,this}multiplyVectors(A,I){return this.x=A.x*I.x,this.y=A.y*I.y,this.z=A.z*I.z,this}applyEuler(A){return this.applyQuaternion(ze.setFromEuler(A))}applyAxisAngle(A,I){return this.applyQuaternion(ze.setFromAxisAngle(A,I))}applyMatrix3(A){const I=this.x,g=this.y,C=this.z,B=A.elements;return this.x=B[0]*I+B[3]*g+B[6]*C,this.y=B[1]*I+B[4]*g+B[7]*C,this.z=B[2]*I+B[5]*g+B[8]*C,this}applyNormalMatrix(A){return this.applyMatrix3(A).normalize()}applyMatrix4(A){const I=this.x,g=this.y,C=this.z,B=A.elements,i=1/(B[3]*I+B[7]*g+B[11]*C+B[15]);return this.x=(B[0]*I+B[4]*g+B[8]*C+B[12])*i,this.y=(B[1]*I+B[5]*g+B[9]*C+B[13])*i,this.z=(B[2]*I+B[6]*g+B[10]*C+B[14])*i,this}applyQuaternion(A){const I=this.x,g=this.y,C=this.z,B=A.x,i=A.y,Q=A.z,o=A.w,e=o*I+i*C-Q*g,t=o*g+Q*I-B*C,a=o*C+B*g-i*I,s=-B*I-i*g-Q*C;return this.x=e*o+s*-B+t*-Q-a*-i,this.y=t*o+s*-i+a*-B-e*-Q,this.z=a*o+s*-Q+e*-i-t*-B,this}project(A){return this.applyMatrix4(A.matrixWorldInverse).applyMatrix4(A.projectionMatrix)}unproject(A){return this.applyMatrix4(A.projectionMatrixInverse).applyMatrix4(A.matrixWorld)}transformDirection(A){const I=this.x,g=this.y,C=this.z,B=A.elements;return this.x=B[0]*I+B[4]*g+B[8]*C,this.y=B[1]*I+B[5]*g+B[9]*C,this.z=B[2]*I+B[6]*g+B[10]*C,this.normalize()}divide(A){return this.x/=A.x,this.y/=A.y,this.z/=A.z,this}divideScalar(A){return this.multiplyScalar(1/A)}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this.z=Math.min(this.z,A.z),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this.z=Math.max(this.z,A.z),this}clamp(A,I){return this.x=Math.max(A.x,Math.min(I.x,this.x)),this.y=Math.max(A.y,Math.min(I.y,this.y)),this.z=Math.max(A.z,Math.min(I.z,this.z)),this}clampScalar(A,I){return this.x=Math.max(A,Math.min(I,this.x)),this.y=Math.max(A,Math.min(I,this.y)),this.z=Math.max(A,Math.min(I,this.z)),this}clampLength(A,I){const g=this.length();return this.divideScalar(g||1).multiplyScalar(Math.max(A,Math.min(I,g)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(A){return this.x*A.x+this.y*A.y+this.z*A.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,I){return this.x+=(A.x-this.x)*I,this.y+=(A.y-this.y)*I,this.z+=(A.z-this.z)*I,this}lerpVectors(A,I,g){return this.x=A.x+(I.x-A.x)*g,this.y=A.y+(I.y-A.y)*g,this.z=A.z+(I.z-A.z)*g,this}cross(A){return this.crossVectors(this,A)}crossVectors(A,I){const g=A.x,C=A.y,B=A.z,i=I.x,Q=I.y,o=I.z;return this.x=C*o-B*Q,this.y=B*i-g*o,this.z=g*Q-C*i,this}projectOnVector(A){const I=A.lengthSq();if(I===0)return this.set(0,0,0);const g=A.dot(this)/I;return this.copy(A).multiplyScalar(g)}projectOnPlane(A){return yE.copy(this).projectOnVector(A),this.sub(yE)}reflect(A){return this.sub(yE.copy(A).multiplyScalar(2*this.dot(A)))}angleTo(A){const I=Math.sqrt(this.lengthSq()*A.lengthSq());if(I===0)return Math.PI/2;const g=this.dot(A)/I;return Math.acos(tg(g,-1,1))}distanceTo(A){return Math.sqrt(this.distanceToSquared(A))}distanceToSquared(A){const I=this.x-A.x,g=this.y-A.y,C=this.z-A.z;return I*I+g*g+C*C}manhattanDistanceTo(A){return Math.abs(this.x-A.x)+Math.abs(this.y-A.y)+Math.abs(this.z-A.z)}setFromSpherical(A){return this.setFromSphericalCoords(A.radius,A.phi,A.theta)}setFromSphericalCoords(A,I,g){const C=Math.sin(I)*A;return this.x=C*Math.sin(g),this.y=Math.cos(I)*A,this.z=C*Math.cos(g),this}setFromCylindrical(A){return this.setFromCylindricalCoords(A.radius,A.theta,A.y)}setFromCylindricalCoords(A,I,g){return this.x=A*Math.sin(I),this.y=g,this.z=A*Math.cos(I),this}setFromMatrixPosition(A){const I=A.elements;return this.x=I[12],this.y=I[13],this.z=I[14],this}setFromMatrixScale(A){const I=this.setFromMatrixColumn(A,0).length(),g=this.setFromMatrixColumn(A,1).length(),C=this.setFromMatrixColumn(A,2).length();return this.x=I,this.y=g,this.z=C,this}setFromMatrixColumn(A,I){return this.fromArray(A.elements,I*4)}setFromMatrix3Column(A,I){return this.fromArray(A.elements,I*3)}setFromEuler(A){return this.x=A._x,this.y=A._y,this.z=A._z,this}equals(A){return A.x===this.x&&A.y===this.y&&A.z===this.z}fromArray(A,I=0){return this.x=A[I],this.y=A[I+1],this.z=A[I+2],this}toArray(A=[],I=0){return A[I]=this.x,A[I+1]=this.y,A[I+2]=this.z,A}fromBufferAttribute(A,I){return this.x=A.getX(I),this.y=A.getY(I),this.z=A.getZ(I),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const A=(Math.random()-.5)*2,I=Math.random()*Math.PI*2,g=Math.sqrt(1-A**2);return this.x=g*Math.cos(I),this.y=g*Math.sin(I),this.z=A,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yE=new V,ze=new dQ;class pB{constructor(A=new V(1/0,1/0,1/0),I=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=A,this.max=I}set(A,I){return this.min.copy(A),this.max.copy(I),this}setFromArray(A){let I=1/0,g=1/0,C=1/0,B=-1/0,i=-1/0,Q=-1/0;for(let o=0,e=A.length;o<e;o+=3){const t=A[o],a=A[o+1],s=A[o+2];t<I&&(I=t),a<g&&(g=a),s<C&&(C=s),t>B&&(B=t),a>i&&(i=a),s>Q&&(Q=s)}return this.min.set(I,g,C),this.max.set(B,i,Q),this}setFromBufferAttribute(A){let I=1/0,g=1/0,C=1/0,B=-1/0,i=-1/0,Q=-1/0;for(let o=0,e=A.count;o<e;o++){const t=A.getX(o),a=A.getY(o),s=A.getZ(o);t<I&&(I=t),a<g&&(g=a),s<C&&(C=s),t>B&&(B=t),a>i&&(i=a),s>Q&&(Q=s)}return this.min.set(I,g,C),this.max.set(B,i,Q),this}setFromPoints(A){this.makeEmpty();for(let I=0,g=A.length;I<g;I++)this.expandByPoint(A[I]);return this}setFromCenterAndSize(A,I){const g=wC.copy(I).multiplyScalar(.5);return this.min.copy(A).sub(g),this.max.copy(A).add(g),this}setFromObject(A,I=!1){return this.makeEmpty(),this.expandByObject(A,I)}clone(){return new this.constructor().copy(this)}copy(A){return this.min.copy(A.min),this.max.copy(A.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(A){return this.isEmpty()?A.set(0,0,0):A.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(A){return this.isEmpty()?A.set(0,0,0):A.subVectors(this.max,this.min)}expandByPoint(A){return this.min.min(A),this.max.max(A),this}expandByVector(A){return this.min.sub(A),this.max.add(A),this}expandByScalar(A){return this.min.addScalar(-A),this.max.addScalar(A),this}expandByObject(A,I=!1){A.updateWorldMatrix(!1,!1);const g=A.geometry;if(g!==void 0)if(I&&g.attributes!=null&&g.attributes.position!==void 0){const B=g.attributes.position;for(let i=0,Q=B.count;i<Q;i++)wC.fromBufferAttribute(B,i).applyMatrix4(A.matrixWorld),this.expandByPoint(wC)}else g.boundingBox===null&&g.computeBoundingBox(),ME.copy(g.boundingBox),ME.applyMatrix4(A.matrixWorld),this.union(ME);const C=A.children;for(let B=0,i=C.length;B<i;B++)this.expandByObject(C[B],I);return this}containsPoint(A){return!(A.x<this.min.x||A.x>this.max.x||A.y<this.min.y||A.y>this.max.y||A.z<this.min.z||A.z>this.max.z)}containsBox(A){return this.min.x<=A.min.x&&A.max.x<=this.max.x&&this.min.y<=A.min.y&&A.max.y<=this.max.y&&this.min.z<=A.min.z&&A.max.z<=this.max.z}getParameter(A,I){return I.set((A.x-this.min.x)/(this.max.x-this.min.x),(A.y-this.min.y)/(this.max.y-this.min.y),(A.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(A){return!(A.max.x<this.min.x||A.min.x>this.max.x||A.max.y<this.min.y||A.min.y>this.max.y||A.max.z<this.min.z||A.min.z>this.max.z)}intersectsSphere(A){return this.clampPoint(A.center,wC),wC.distanceToSquared(A.center)<=A.radius*A.radius}intersectsPlane(A){let I,g;return A.normal.x>0?(I=A.normal.x*this.min.x,g=A.normal.x*this.max.x):(I=A.normal.x*this.max.x,g=A.normal.x*this.min.x),A.normal.y>0?(I+=A.normal.y*this.min.y,g+=A.normal.y*this.max.y):(I+=A.normal.y*this.max.y,g+=A.normal.y*this.min.y),A.normal.z>0?(I+=A.normal.z*this.min.z,g+=A.normal.z*this.max.z):(I+=A.normal.z*this.max.z,g+=A.normal.z*this.min.z),I<=-A.constant&&g>=-A.constant}intersectsTriangle(A){if(this.isEmpty())return!1;this.getCenter(vB),TQ.subVectors(this.max,vB),ZC.subVectors(A.a,vB),zC.subVectors(A.b,vB),XC.subVectors(A.c,vB),QC.subVectors(zC,ZC),iC.subVectors(XC,zC),GC.subVectors(ZC,XC);let I=[0,-QC.z,QC.y,0,-iC.z,iC.y,0,-GC.z,GC.y,QC.z,0,-QC.x,iC.z,0,-iC.x,GC.z,0,-GC.x,-QC.y,QC.x,0,-iC.y,iC.x,0,-GC.y,GC.x,0];return!kE(I,ZC,zC,XC,TQ)||(I=[1,0,0,0,1,0,0,0,1],!kE(I,ZC,zC,XC,TQ))?!1:(OQ.crossVectors(QC,iC),I=[OQ.x,OQ.y,OQ.z],kE(I,ZC,zC,XC,TQ))}clampPoint(A,I){return I.copy(A).clamp(this.min,this.max)}distanceToPoint(A){return wC.copy(A).clamp(this.min,this.max).sub(A).length()}getBoundingSphere(A){return this.getCenter(A.center),A.radius=this.getSize(wC).length()*.5,A}intersect(A){return this.min.max(A.min),this.max.min(A.max),this.isEmpty()&&this.makeEmpty(),this}union(A){return this.min.min(A.min),this.max.max(A.max),this}applyMatrix4(A){return this.isEmpty()?this:(Tg[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(A),Tg[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(A),Tg[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(A),Tg[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(A),Tg[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(A),Tg[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(A),Tg[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(A),Tg[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(A),this.setFromPoints(Tg),this)}translate(A){return this.min.add(A),this.max.add(A),this}equals(A){return A.min.equals(this.min)&&A.max.equals(this.max)}}const Tg=[new V,new V,new V,new V,new V,new V,new V,new V],wC=new V,ME=new pB,ZC=new V,zC=new V,XC=new V,QC=new V,iC=new V,GC=new V,vB=new V,TQ=new V,OQ=new V,SC=new V;function kE(E,A,I,g,C){for(let B=0,i=E.length-3;B<=i;B+=3){SC.fromArray(E,B);const Q=C.x*Math.abs(SC.x)+C.y*Math.abs(SC.y)+C.z*Math.abs(SC.z),o=A.dot(SC),e=I.dot(SC),t=g.dot(SC);if(Math.max(-Math.max(o,e,t),Math.min(o,e,t))>Q)return!1}return!0}const lh=new pB,xB=new V,RE=new V;class Ti{constructor(A=new V,I=-1){this.center=A,this.radius=I}set(A,I){return this.center.copy(A),this.radius=I,this}setFromPoints(A,I){const g=this.center;I!==void 0?g.copy(I):lh.setFromPoints(A).getCenter(g);let C=0;for(let B=0,i=A.length;B<i;B++)C=Math.max(C,g.distanceToSquared(A[B]));return this.radius=Math.sqrt(C),this}copy(A){return this.center.copy(A.center),this.radius=A.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(A){return A.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(A){return A.distanceTo(this.center)-this.radius}intersectsSphere(A){const I=this.radius+A.radius;return A.center.distanceToSquared(this.center)<=I*I}intersectsBox(A){return A.intersectsSphere(this)}intersectsPlane(A){return Math.abs(A.distanceToPoint(this.center))<=this.radius}clampPoint(A,I){const g=this.center.distanceToSquared(A);return I.copy(A),g>this.radius*this.radius&&(I.sub(this.center).normalize(),I.multiplyScalar(this.radius).add(this.center)),I}getBoundingBox(A){return this.isEmpty()?(A.makeEmpty(),A):(A.set(this.center,this.center),A.expandByScalar(this.radius),A)}applyMatrix4(A){return this.center.applyMatrix4(A),this.radius=this.radius*A.getMaxScaleOnAxis(),this}translate(A){return this.center.add(A),this}expandByPoint(A){if(this.isEmpty())return this.center.copy(A),this.radius=0,this;xB.subVectors(A,this.center);const I=xB.lengthSq();if(I>this.radius*this.radius){const g=Math.sqrt(I),C=(g-this.radius)*.5;this.center.addScaledVector(xB,C/g),this.radius+=C}return this}union(A){return A.isEmpty()?this:this.isEmpty()?(this.copy(A),this):(this.center.equals(A.center)===!0?this.radius=Math.max(this.radius,A.radius):(RE.subVectors(A.center,this.center).setLength(A.radius),this.expandByPoint(xB.copy(A.center).add(RE)),this.expandByPoint(xB.copy(A.center).sub(RE))),this)}equals(A){return A.center.equals(this.center)&&A.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Og=new V,FE=new V,PQ=new V,EC=new V,pE=new V,WQ=new V,NE=new V;class La{constructor(A=new V,I=new V(0,0,-1)){this.origin=A,this.direction=I}set(A,I){return this.origin.copy(A),this.direction.copy(I),this}copy(A){return this.origin.copy(A.origin),this.direction.copy(A.direction),this}at(A,I){return I.copy(this.direction).multiplyScalar(A).add(this.origin)}lookAt(A){return this.direction.copy(A).sub(this.origin).normalize(),this}recast(A){return this.origin.copy(this.at(A,Og)),this}closestPointToPoint(A,I){I.subVectors(A,this.origin);const g=I.dot(this.direction);return g<0?I.copy(this.origin):I.copy(this.direction).multiplyScalar(g).add(this.origin)}distanceToPoint(A){return Math.sqrt(this.distanceSqToPoint(A))}distanceSqToPoint(A){const I=Og.subVectors(A,this.origin).dot(this.direction);return I<0?this.origin.distanceToSquared(A):(Og.copy(this.direction).multiplyScalar(I).add(this.origin),Og.distanceToSquared(A))}distanceSqToSegment(A,I,g,C){FE.copy(A).add(I).multiplyScalar(.5),PQ.copy(I).sub(A).normalize(),EC.copy(this.origin).sub(FE);const B=A.distanceTo(I)*.5,i=-this.direction.dot(PQ),Q=EC.dot(this.direction),o=-EC.dot(PQ),e=EC.lengthSq(),t=Math.abs(1-i*i);let a,s,n,h;if(t>0)if(a=i*o-Q,s=i*Q-o,h=B*t,a>=0)if(s>=-h)if(s<=h){const D=1/t;a*=D,s*=D,n=a*(a+i*s+2*Q)+s*(i*a+s+2*o)+e}else s=B,a=Math.max(0,-(i*s+Q)),n=-a*a+s*(s+2*o)+e;else s=-B,a=Math.max(0,-(i*s+Q)),n=-a*a+s*(s+2*o)+e;else s<=-h?(a=Math.max(0,-(-i*B+Q)),s=a>0?-B:Math.min(Math.max(-B,-o),B),n=-a*a+s*(s+2*o)+e):s<=h?(a=0,s=Math.min(Math.max(-B,-o),B),n=s*(s+2*o)+e):(a=Math.max(0,-(i*B+Q)),s=a>0?B:Math.min(Math.max(-B,-o),B),n=-a*a+s*(s+2*o)+e);else s=i>0?-B:B,a=Math.max(0,-(i*s+Q)),n=-a*a+s*(s+2*o)+e;return g&&g.copy(this.direction).multiplyScalar(a).add(this.origin),C&&C.copy(PQ).multiplyScalar(s).add(FE),n}intersectSphere(A,I){Og.subVectors(A.center,this.origin);const g=Og.dot(this.direction),C=Og.dot(Og)-g*g,B=A.radius*A.radius;if(C>B)return null;const i=Math.sqrt(B-C),Q=g-i,o=g+i;return Q<0&&o<0?null:Q<0?this.at(o,I):this.at(Q,I)}intersectsSphere(A){return this.distanceSqToPoint(A.center)<=A.radius*A.radius}distanceToPlane(A){const I=A.normal.dot(this.direction);if(I===0)return A.distanceToPoint(this.origin)===0?0:null;const g=-(this.origin.dot(A.normal)+A.constant)/I;return g>=0?g:null}intersectPlane(A,I){const g=this.distanceToPlane(A);return g===null?null:this.at(g,I)}intersectsPlane(A){const I=A.distanceToPoint(this.origin);return I===0||A.normal.dot(this.direction)*I<0}intersectBox(A,I){let g,C,B,i,Q,o;const e=1/this.direction.x,t=1/this.direction.y,a=1/this.direction.z,s=this.origin;return e>=0?(g=(A.min.x-s.x)*e,C=(A.max.x-s.x)*e):(g=(A.max.x-s.x)*e,C=(A.min.x-s.x)*e),t>=0?(B=(A.min.y-s.y)*t,i=(A.max.y-s.y)*t):(B=(A.max.y-s.y)*t,i=(A.min.y-s.y)*t),g>i||B>C||((B>g||isNaN(g))&&(g=B),(i<C||isNaN(C))&&(C=i),a>=0?(Q=(A.min.z-s.z)*a,o=(A.max.z-s.z)*a):(Q=(A.max.z-s.z)*a,o=(A.min.z-s.z)*a),g>o||Q>C)||((Q>g||g!==g)&&(g=Q),(o<C||C!==C)&&(C=o),C<0)?null:this.at(g>=0?g:C,I)}intersectsBox(A){return this.intersectBox(A,Og)!==null}intersectTriangle(A,I,g,C,B){pE.subVectors(I,A),WQ.subVectors(g,A),NE.crossVectors(pE,WQ);let i=this.direction.dot(NE),Q;if(i>0){if(C)return null;Q=1}else if(i<0)Q=-1,i=-i;else return null;EC.subVectors(this.origin,A);const o=Q*this.direction.dot(WQ.crossVectors(EC,WQ));if(o<0)return null;const e=Q*this.direction.dot(pE.cross(EC));if(e<0||o+e>i)return null;const t=-Q*EC.dot(NE);return t<0?null:this.at(t/i,B)}applyMatrix4(A){return this.origin.applyMatrix4(A),this.direction.transformDirection(A),this}equals(A){return A.origin.equals(this.origin)&&A.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pI{constructor(){pI.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(A,I,g,C,B,i,Q,o,e,t,a,s,n,h,D,r){const G=this.elements;return G[0]=A,G[4]=I,G[8]=g,G[12]=C,G[1]=B,G[5]=i,G[9]=Q,G[13]=o,G[2]=e,G[6]=t,G[10]=a,G[14]=s,G[3]=n,G[7]=h,G[11]=D,G[15]=r,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pI().fromArray(this.elements)}copy(A){const I=this.elements,g=A.elements;return I[0]=g[0],I[1]=g[1],I[2]=g[2],I[3]=g[3],I[4]=g[4],I[5]=g[5],I[6]=g[6],I[7]=g[7],I[8]=g[8],I[9]=g[9],I[10]=g[10],I[11]=g[11],I[12]=g[12],I[13]=g[13],I[14]=g[14],I[15]=g[15],this}copyPosition(A){const I=this.elements,g=A.elements;return I[12]=g[12],I[13]=g[13],I[14]=g[14],this}setFromMatrix3(A){const I=A.elements;return this.set(I[0],I[3],I[6],0,I[1],I[4],I[7],0,I[2],I[5],I[8],0,0,0,0,1),this}extractBasis(A,I,g){return A.setFromMatrixColumn(this,0),I.setFromMatrixColumn(this,1),g.setFromMatrixColumn(this,2),this}makeBasis(A,I,g){return this.set(A.x,I.x,g.x,0,A.y,I.y,g.y,0,A.z,I.z,g.z,0,0,0,0,1),this}extractRotation(A){const I=this.elements,g=A.elements,C=1/$C.setFromMatrixColumn(A,0).length(),B=1/$C.setFromMatrixColumn(A,1).length(),i=1/$C.setFromMatrixColumn(A,2).length();return I[0]=g[0]*C,I[1]=g[1]*C,I[2]=g[2]*C,I[3]=0,I[4]=g[4]*B,I[5]=g[5]*B,I[6]=g[6]*B,I[7]=0,I[8]=g[8]*i,I[9]=g[9]*i,I[10]=g[10]*i,I[11]=0,I[12]=0,I[13]=0,I[14]=0,I[15]=1,this}makeRotationFromEuler(A){const I=this.elements,g=A.x,C=A.y,B=A.z,i=Math.cos(g),Q=Math.sin(g),o=Math.cos(C),e=Math.sin(C),t=Math.cos(B),a=Math.sin(B);if(A.order==="XYZ"){const s=i*t,n=i*a,h=Q*t,D=Q*a;I[0]=o*t,I[4]=-o*a,I[8]=e,I[1]=n+h*e,I[5]=s-D*e,I[9]=-Q*o,I[2]=D-s*e,I[6]=h+n*e,I[10]=i*o}else if(A.order==="YXZ"){const s=o*t,n=o*a,h=e*t,D=e*a;I[0]=s+D*Q,I[4]=h*Q-n,I[8]=i*e,I[1]=i*a,I[5]=i*t,I[9]=-Q,I[2]=n*Q-h,I[6]=D+s*Q,I[10]=i*o}else if(A.order==="ZXY"){const s=o*t,n=o*a,h=e*t,D=e*a;I[0]=s-D*Q,I[4]=-i*a,I[8]=h+n*Q,I[1]=n+h*Q,I[5]=i*t,I[9]=D-s*Q,I[2]=-i*e,I[6]=Q,I[10]=i*o}else if(A.order==="ZYX"){const s=i*t,n=i*a,h=Q*t,D=Q*a;I[0]=o*t,I[4]=h*e-n,I[8]=s*e+D,I[1]=o*a,I[5]=D*e+s,I[9]=n*e-h,I[2]=-e,I[6]=Q*o,I[10]=i*o}else if(A.order==="YZX"){const s=i*o,n=i*e,h=Q*o,D=Q*e;I[0]=o*t,I[4]=D-s*a,I[8]=h*a+n,I[1]=a,I[5]=i*t,I[9]=-Q*t,I[2]=-e*t,I[6]=n*a+h,I[10]=s-D*a}else if(A.order==="XZY"){const s=i*o,n=i*e,h=Q*o,D=Q*e;I[0]=o*t,I[4]=-a,I[8]=e*t,I[1]=s*a+D,I[5]=i*t,I[9]=n*a-h,I[2]=h*a-n,I[6]=Q*t,I[10]=D*a+s}return I[3]=0,I[7]=0,I[11]=0,I[12]=0,I[13]=0,I[14]=0,I[15]=1,this}makeRotationFromQuaternion(A){return this.compose(wh,A,Gh)}lookAt(A,I,g){const C=this.elements;return og.subVectors(A,I),og.lengthSq()===0&&(og.z=1),og.normalize(),oC.crossVectors(g,og),oC.lengthSq()===0&&(Math.abs(g.z)===1?og.x+=1e-4:og.z+=1e-4,og.normalize(),oC.crossVectors(g,og)),oC.normalize(),jQ.crossVectors(og,oC),C[0]=oC.x,C[4]=jQ.x,C[8]=og.x,C[1]=oC.y,C[5]=jQ.y,C[9]=og.y,C[2]=oC.z,C[6]=jQ.z,C[10]=og.z,this}multiply(A){return this.multiplyMatrices(this,A)}premultiply(A){return this.multiplyMatrices(A,this)}multiplyMatrices(A,I){const g=A.elements,C=I.elements,B=this.elements,i=g[0],Q=g[4],o=g[8],e=g[12],t=g[1],a=g[5],s=g[9],n=g[13],h=g[2],D=g[6],r=g[10],G=g[14],w=g[3],S=g[7],y=g[11],M=g[15],p=C[0],U=C[4],l=C[8],N=C[12],Y=C[1],z=C[5],q=C[9],f=C[13],K=C[2],H=C[6],j=C[10],EA=C[14],Z=C[3],x=C[7],T=C[11],F=C[15];return B[0]=i*p+Q*Y+o*K+e*Z,B[4]=i*U+Q*z+o*H+e*x,B[8]=i*l+Q*q+o*j+e*T,B[12]=i*N+Q*f+o*EA+e*F,B[1]=t*p+a*Y+s*K+n*Z,B[5]=t*U+a*z+s*H+n*x,B[9]=t*l+a*q+s*j+n*T,B[13]=t*N+a*f+s*EA+n*F,B[2]=h*p+D*Y+r*K+G*Z,B[6]=h*U+D*z+r*H+G*x,B[10]=h*l+D*q+r*j+G*T,B[14]=h*N+D*f+r*EA+G*F,B[3]=w*p+S*Y+y*K+M*Z,B[7]=w*U+S*z+y*H+M*x,B[11]=w*l+S*q+y*j+M*T,B[15]=w*N+S*f+y*EA+M*F,this}multiplyScalar(A){const I=this.elements;return I[0]*=A,I[4]*=A,I[8]*=A,I[12]*=A,I[1]*=A,I[5]*=A,I[9]*=A,I[13]*=A,I[2]*=A,I[6]*=A,I[10]*=A,I[14]*=A,I[3]*=A,I[7]*=A,I[11]*=A,I[15]*=A,this}determinant(){const A=this.elements,I=A[0],g=A[4],C=A[8],B=A[12],i=A[1],Q=A[5],o=A[9],e=A[13],t=A[2],a=A[6],s=A[10],n=A[14],h=A[3],D=A[7],r=A[11],G=A[15];return h*(+B*o*a-C*e*a-B*Q*s+g*e*s+C*Q*n-g*o*n)+D*(+I*o*n-I*e*s+B*i*s-C*i*n+C*e*t-B*o*t)+r*(+I*e*a-I*Q*n-B*i*a+g*i*n+B*Q*t-g*e*t)+G*(-C*Q*t-I*o*a+I*Q*s+C*i*a-g*i*s+g*o*t)}transpose(){const A=this.elements;let I;return I=A[1],A[1]=A[4],A[4]=I,I=A[2],A[2]=A[8],A[8]=I,I=A[6],A[6]=A[9],A[9]=I,I=A[3],A[3]=A[12],A[12]=I,I=A[7],A[7]=A[13],A[13]=I,I=A[11],A[11]=A[14],A[14]=I,this}setPosition(A,I,g){const C=this.elements;return A.isVector3?(C[12]=A.x,C[13]=A.y,C[14]=A.z):(C[12]=A,C[13]=I,C[14]=g),this}invert(){const A=this.elements,I=A[0],g=A[1],C=A[2],B=A[3],i=A[4],Q=A[5],o=A[6],e=A[7],t=A[8],a=A[9],s=A[10],n=A[11],h=A[12],D=A[13],r=A[14],G=A[15],w=a*r*e-D*s*e+D*o*n-Q*r*n-a*o*G+Q*s*G,S=h*s*e-t*r*e-h*o*n+i*r*n+t*o*G-i*s*G,y=t*D*e-h*a*e+h*Q*n-i*D*n-t*Q*G+i*a*G,M=h*a*o-t*D*o-h*Q*s+i*D*s+t*Q*r-i*a*r,p=I*w+g*S+C*y+B*M;if(p===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/p;return A[0]=w*U,A[1]=(D*s*B-a*r*B-D*C*n+g*r*n+a*C*G-g*s*G)*U,A[2]=(Q*r*B-D*o*B+D*C*e-g*r*e-Q*C*G+g*o*G)*U,A[3]=(a*o*B-Q*s*B-a*C*e+g*s*e+Q*C*n-g*o*n)*U,A[4]=S*U,A[5]=(t*r*B-h*s*B+h*C*n-I*r*n-t*C*G+I*s*G)*U,A[6]=(h*o*B-i*r*B-h*C*e+I*r*e+i*C*G-I*o*G)*U,A[7]=(i*s*B-t*o*B+t*C*e-I*s*e-i*C*n+I*o*n)*U,A[8]=y*U,A[9]=(h*a*B-t*D*B-h*g*n+I*D*n+t*g*G-I*a*G)*U,A[10]=(i*D*B-h*Q*B+h*g*e-I*D*e-i*g*G+I*Q*G)*U,A[11]=(t*Q*B-i*a*B-t*g*e+I*a*e+i*g*n-I*Q*n)*U,A[12]=M*U,A[13]=(t*D*C-h*a*C+h*g*s-I*D*s-t*g*r+I*a*r)*U,A[14]=(h*Q*C-i*D*C-h*g*o+I*D*o+i*g*r-I*Q*r)*U,A[15]=(i*a*C-t*Q*C+t*g*o-I*a*o-i*g*s+I*Q*s)*U,this}scale(A){const I=this.elements,g=A.x,C=A.y,B=A.z;return I[0]*=g,I[4]*=C,I[8]*=B,I[1]*=g,I[5]*=C,I[9]*=B,I[2]*=g,I[6]*=C,I[10]*=B,I[3]*=g,I[7]*=C,I[11]*=B,this}getMaxScaleOnAxis(){const A=this.elements,I=A[0]*A[0]+A[1]*A[1]+A[2]*A[2],g=A[4]*A[4]+A[5]*A[5]+A[6]*A[6],C=A[8]*A[8]+A[9]*A[9]+A[10]*A[10];return Math.sqrt(Math.max(I,g,C))}makeTranslation(A,I,g){return this.set(1,0,0,A,0,1,0,I,0,0,1,g,0,0,0,1),this}makeRotationX(A){const I=Math.cos(A),g=Math.sin(A);return this.set(1,0,0,0,0,I,-g,0,0,g,I,0,0,0,0,1),this}makeRotationY(A){const I=Math.cos(A),g=Math.sin(A);return this.set(I,0,g,0,0,1,0,0,-g,0,I,0,0,0,0,1),this}makeRotationZ(A){const I=Math.cos(A),g=Math.sin(A);return this.set(I,-g,0,0,g,I,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(A,I){const g=Math.cos(I),C=Math.sin(I),B=1-g,i=A.x,Q=A.y,o=A.z,e=B*i,t=B*Q;return this.set(e*i+g,e*Q-C*o,e*o+C*Q,0,e*Q+C*o,t*Q+g,t*o-C*i,0,e*o-C*Q,t*o+C*i,B*o*o+g,0,0,0,0,1),this}makeScale(A,I,g){return this.set(A,0,0,0,0,I,0,0,0,0,g,0,0,0,0,1),this}makeShear(A,I,g,C,B,i){return this.set(1,g,B,0,A,1,i,0,I,C,1,0,0,0,0,1),this}compose(A,I,g){const C=this.elements,B=I._x,i=I._y,Q=I._z,o=I._w,e=B+B,t=i+i,a=Q+Q,s=B*e,n=B*t,h=B*a,D=i*t,r=i*a,G=Q*a,w=o*e,S=o*t,y=o*a,M=g.x,p=g.y,U=g.z;return C[0]=(1-(D+G))*M,C[1]=(n+y)*M,C[2]=(h-S)*M,C[3]=0,C[4]=(n-y)*p,C[5]=(1-(s+G))*p,C[6]=(r+w)*p,C[7]=0,C[8]=(h+S)*U,C[9]=(r-w)*U,C[10]=(1-(s+D))*U,C[11]=0,C[12]=A.x,C[13]=A.y,C[14]=A.z,C[15]=1,this}decompose(A,I,g){const C=this.elements;let B=$C.set(C[0],C[1],C[2]).length();const i=$C.set(C[4],C[5],C[6]).length(),Q=$C.set(C[8],C[9],C[10]).length();this.determinant()<0&&(B=-B),A.x=C[12],A.y=C[13],A.z=C[14],yg.copy(this);const e=1/B,t=1/i,a=1/Q;return yg.elements[0]*=e,yg.elements[1]*=e,yg.elements[2]*=e,yg.elements[4]*=t,yg.elements[5]*=t,yg.elements[6]*=t,yg.elements[8]*=a,yg.elements[9]*=a,yg.elements[10]*=a,I.setFromRotationMatrix(yg),g.x=B,g.y=i,g.z=Q,this}makePerspective(A,I,g,C,B,i){const Q=this.elements,o=2*B/(I-A),e=2*B/(g-C),t=(I+A)/(I-A),a=(g+C)/(g-C),s=-(i+B)/(i-B),n=-2*i*B/(i-B);return Q[0]=o,Q[4]=0,Q[8]=t,Q[12]=0,Q[1]=0,Q[5]=e,Q[9]=a,Q[13]=0,Q[2]=0,Q[6]=0,Q[10]=s,Q[14]=n,Q[3]=0,Q[7]=0,Q[11]=-1,Q[15]=0,this}makeOrthographic(A,I,g,C,B,i){const Q=this.elements,o=1/(I-A),e=1/(g-C),t=1/(i-B),a=(I+A)*o,s=(g+C)*e,n=(i+B)*t;return Q[0]=2*o,Q[4]=0,Q[8]=0,Q[12]=-a,Q[1]=0,Q[5]=2*e,Q[9]=0,Q[13]=-s,Q[2]=0,Q[6]=0,Q[10]=-2*t,Q[14]=-n,Q[3]=0,Q[7]=0,Q[11]=0,Q[15]=1,this}equals(A){const I=this.elements,g=A.elements;for(let C=0;C<16;C++)if(I[C]!==g[C])return!1;return!0}fromArray(A,I=0){for(let g=0;g<16;g++)this.elements[g]=A[g+I];return this}toArray(A=[],I=0){const g=this.elements;return A[I]=g[0],A[I+1]=g[1],A[I+2]=g[2],A[I+3]=g[3],A[I+4]=g[4],A[I+5]=g[5],A[I+6]=g[6],A[I+7]=g[7],A[I+8]=g[8],A[I+9]=g[9],A[I+10]=g[10],A[I+11]=g[11],A[I+12]=g[12],A[I+13]=g[13],A[I+14]=g[14],A[I+15]=g[15],A}}const $C=new V,yg=new pI,wh=new V(0,0,0),Gh=new V(1,1,1),oC=new V,jQ=new V,og=new V,Xe=new pI,$e=new dQ;class yQ{constructor(A=0,I=0,g=0,C=yQ.DefaultOrder){this.isEuler=!0,this._x=A,this._y=I,this._z=g,this._order=C}get x(){return this._x}set x(A){this._x=A,this._onChangeCallback()}get y(){return this._y}set y(A){this._y=A,this._onChangeCallback()}get z(){return this._z}set z(A){this._z=A,this._onChangeCallback()}get order(){return this._order}set order(A){this._order=A,this._onChangeCallback()}set(A,I,g,C=this._order){return this._x=A,this._y=I,this._z=g,this._order=C,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(A){return this._x=A._x,this._y=A._y,this._z=A._z,this._order=A._order,this._onChangeCallback(),this}setFromRotationMatrix(A,I=this._order,g=!0){const C=A.elements,B=C[0],i=C[4],Q=C[8],o=C[1],e=C[5],t=C[9],a=C[2],s=C[6],n=C[10];switch(I){case"XYZ":this._y=Math.asin(tg(Q,-1,1)),Math.abs(Q)<.9999999?(this._x=Math.atan2(-t,n),this._z=Math.atan2(-i,B)):(this._x=Math.atan2(s,e),this._z=0);break;case"YXZ":this._x=Math.asin(-tg(t,-1,1)),Math.abs(t)<.9999999?(this._y=Math.atan2(Q,n),this._z=Math.atan2(o,e)):(this._y=Math.atan2(-a,B),this._z=0);break;case"ZXY":this._x=Math.asin(tg(s,-1,1)),Math.abs(s)<.9999999?(this._y=Math.atan2(-a,n),this._z=Math.atan2(-i,e)):(this._y=0,this._z=Math.atan2(o,B));break;case"ZYX":this._y=Math.asin(-tg(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(s,n),this._z=Math.atan2(o,B)):(this._x=0,this._z=Math.atan2(-i,e));break;case"YZX":this._z=Math.asin(tg(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-t,e),this._y=Math.atan2(-a,B)):(this._x=0,this._y=Math.atan2(Q,n));break;case"XZY":this._z=Math.asin(-tg(i,-1,1)),Math.abs(i)<.9999999?(this._x=Math.atan2(s,e),this._y=Math.atan2(Q,B)):(this._x=Math.atan2(-t,n),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+I)}return this._order=I,g===!0&&this._onChangeCallback(),this}setFromQuaternion(A,I,g){return Xe.makeRotationFromQuaternion(A),this.setFromRotationMatrix(Xe,I,g)}setFromVector3(A,I=this._order){return this.set(A.x,A.y,A.z,I)}reorder(A){return $e.setFromEuler(this),this.setFromQuaternion($e,A)}equals(A){return A._x===this._x&&A._y===this._y&&A._z===this._z&&A._order===this._order}fromArray(A){return this._x=A[0],this._y=A[1],this._z=A[2],A[3]!==void 0&&(this._order=A[3]),this._onChangeCallback(),this}toArray(A=[],I=0){return A[I]=this._x,A[I+1]=this._y,A[I+2]=this._z,A[I+3]=this._order,A}_onChange(A){return this._onChangeCallback=A,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}yQ.DefaultOrder="XYZ";yQ.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Lo{constructor(){this.mask=1}set(A){this.mask=(1<<A|0)>>>0}enable(A){this.mask|=1<<A|0}enableAll(){this.mask=-1}toggle(A){this.mask^=1<<A|0}disable(A){this.mask&=~(1<<A|0)}disableAll(){this.mask=0}test(A){return(this.mask&A.mask)!==0}isEnabled(A){return(this.mask&(1<<A|0))!==0}}let Sh=0;const At=new V,AB=new dQ,Pg=new pI,_Q=new V,TB=new V,dh=new V,yh=new dQ,It=new V(1,0,0),gt=new V(0,1,0),Ct=new V(0,0,1),Mh={type:"added"},Bt={type:"removed"};class Bg extends FB{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=SQ(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bg.DefaultUp.clone();const A=new V,I=new yQ,g=new dQ,C=new V(1,1,1);function B(){g.setFromEuler(I,!1)}function i(){I.setFromQuaternion(g,void 0,!1)}I._onChange(B),g._onChange(i),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:A},rotation:{configurable:!0,enumerable:!0,value:I},quaternion:{configurable:!0,enumerable:!0,value:g},scale:{configurable:!0,enumerable:!0,value:C},modelViewMatrix:{value:new pI},normalMatrix:{value:new Cg}}),this.matrix=new pI,this.matrixWorld=new pI,this.matrixAutoUpdate=Bg.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Bg.DefaultMatrixWorldAutoUpdate,this.layers=new Lo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(A){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(A),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(A){return this.quaternion.premultiply(A),this}setRotationFromAxisAngle(A,I){this.quaternion.setFromAxisAngle(A,I)}setRotationFromEuler(A){this.quaternion.setFromEuler(A,!0)}setRotationFromMatrix(A){this.quaternion.setFromRotationMatrix(A)}setRotationFromQuaternion(A){this.quaternion.copy(A)}rotateOnAxis(A,I){return AB.setFromAxisAngle(A,I),this.quaternion.multiply(AB),this}rotateOnWorldAxis(A,I){return AB.setFromAxisAngle(A,I),this.quaternion.premultiply(AB),this}rotateX(A){return this.rotateOnAxis(It,A)}rotateY(A){return this.rotateOnAxis(gt,A)}rotateZ(A){return this.rotateOnAxis(Ct,A)}translateOnAxis(A,I){return At.copy(A).applyQuaternion(this.quaternion),this.position.add(At.multiplyScalar(I)),this}translateX(A){return this.translateOnAxis(It,A)}translateY(A){return this.translateOnAxis(gt,A)}translateZ(A){return this.translateOnAxis(Ct,A)}localToWorld(A){return this.updateWorldMatrix(!0,!1),A.applyMatrix4(this.matrixWorld)}worldToLocal(A){return this.updateWorldMatrix(!0,!1),A.applyMatrix4(Pg.copy(this.matrixWorld).invert())}lookAt(A,I,g){A.isVector3?_Q.copy(A):_Q.set(A,I,g);const C=this.parent;this.updateWorldMatrix(!0,!1),TB.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pg.lookAt(TB,_Q,this.up):Pg.lookAt(_Q,TB,this.up),this.quaternion.setFromRotationMatrix(Pg),C&&(Pg.extractRotation(C.matrixWorld),AB.setFromRotationMatrix(Pg),this.quaternion.premultiply(AB.invert()))}add(A){if(arguments.length>1){for(let I=0;I<arguments.length;I++)this.add(arguments[I]);return this}return A===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",A),this):(A&&A.isObject3D?(A.parent!==null&&A.parent.remove(A),A.parent=this,this.children.push(A),A.dispatchEvent(Mh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",A),this)}remove(A){if(arguments.length>1){for(let g=0;g<arguments.length;g++)this.remove(arguments[g]);return this}const I=this.children.indexOf(A);return I!==-1&&(A.parent=null,this.children.splice(I,1),A.dispatchEvent(Bt)),this}removeFromParent(){const A=this.parent;return A!==null&&A.remove(this),this}clear(){for(let A=0;A<this.children.length;A++){const I=this.children[A];I.parent=null,I.dispatchEvent(Bt)}return this.children.length=0,this}attach(A){return this.updateWorldMatrix(!0,!1),Pg.copy(this.matrixWorld).invert(),A.parent!==null&&(A.parent.updateWorldMatrix(!0,!1),Pg.multiply(A.parent.matrixWorld)),A.applyMatrix4(Pg),this.add(A),A.updateWorldMatrix(!1,!0),this}getObjectById(A){return this.getObjectByProperty("id",A)}getObjectByName(A){return this.getObjectByProperty("name",A)}getObjectByProperty(A,I){if(this[A]===I)return this;for(let g=0,C=this.children.length;g<C;g++){const i=this.children[g].getObjectByProperty(A,I);if(i!==void 0)return i}}getObjectsByProperty(A,I){let g=[];this[A]===I&&g.push(this);for(let C=0,B=this.children.length;C<B;C++){const i=this.children[C].getObjectsByProperty(A,I);i.length>0&&(g=g.concat(i))}return g}getWorldPosition(A){return this.updateWorldMatrix(!0,!1),A.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(A){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(TB,A,dh),A}getWorldScale(A){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(TB,yh,A),A}getWorldDirection(A){this.updateWorldMatrix(!0,!1);const I=this.matrixWorld.elements;return A.set(I[8],I[9],I[10]).normalize()}raycast(){}traverse(A){A(this);const I=this.children;for(let g=0,C=I.length;g<C;g++)I[g].traverse(A)}traverseVisible(A){if(this.visible===!1)return;A(this);const I=this.children;for(let g=0,C=I.length;g<C;g++)I[g].traverseVisible(A)}traverseAncestors(A){const I=this.parent;I!==null&&(A(I),I.traverseAncestors(A))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(A){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||A)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,A=!0);const I=this.children;for(let g=0,C=I.length;g<C;g++){const B=I[g];(B.matrixWorldAutoUpdate===!0||A===!0)&&B.updateMatrixWorld(A)}}updateWorldMatrix(A,I){const g=this.parent;if(A===!0&&g!==null&&g.matrixWorldAutoUpdate===!0&&g.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),I===!0){const C=this.children;for(let B=0,i=C.length;B<i;B++){const Q=C[B];Q.matrixWorldAutoUpdate===!0&&Q.updateWorldMatrix(!1,!0)}}}toJSON(A){const I=A===void 0||typeof A=="string",g={};I&&(A={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},g.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const C={};C.uuid=this.uuid,C.type=this.type,this.name!==""&&(C.name=this.name),this.castShadow===!0&&(C.castShadow=!0),this.receiveShadow===!0&&(C.receiveShadow=!0),this.visible===!1&&(C.visible=!1),this.frustumCulled===!1&&(C.frustumCulled=!1),this.renderOrder!==0&&(C.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(C.userData=this.userData),C.layers=this.layers.mask,C.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(C.matrixAutoUpdate=!1),this.isInstancedMesh&&(C.type="InstancedMesh",C.count=this.count,C.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(C.instanceColor=this.instanceColor.toJSON()));function B(Q,o){return Q[o.uuid]===void 0&&(Q[o.uuid]=o.toJSON(A)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?C.background=this.background.toJSON():this.background.isTexture&&(C.background=this.background.toJSON(A).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(C.environment=this.environment.toJSON(A).uuid);else if(this.isMesh||this.isLine||this.isPoints){C.geometry=B(A.geometries,this.geometry);const Q=this.geometry.parameters;if(Q!==void 0&&Q.shapes!==void 0){const o=Q.shapes;if(Array.isArray(o))for(let e=0,t=o.length;e<t;e++){const a=o[e];B(A.shapes,a)}else B(A.shapes,o)}}if(this.isSkinnedMesh&&(C.bindMode=this.bindMode,C.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(B(A.skeletons,this.skeleton),C.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const Q=[];for(let o=0,e=this.material.length;o<e;o++)Q.push(B(A.materials,this.material[o]));C.material=Q}else C.material=B(A.materials,this.material);if(this.children.length>0){C.children=[];for(let Q=0;Q<this.children.length;Q++)C.children.push(this.children[Q].toJSON(A).object)}if(this.animations.length>0){C.animations=[];for(let Q=0;Q<this.animations.length;Q++){const o=this.animations[Q];C.animations.push(B(A.animations,o))}}if(I){const Q=i(A.geometries),o=i(A.materials),e=i(A.textures),t=i(A.images),a=i(A.shapes),s=i(A.skeletons),n=i(A.animations),h=i(A.nodes);Q.length>0&&(g.geometries=Q),o.length>0&&(g.materials=o),e.length>0&&(g.textures=e),t.length>0&&(g.images=t),a.length>0&&(g.shapes=a),s.length>0&&(g.skeletons=s),n.length>0&&(g.animations=n),h.length>0&&(g.nodes=h)}return g.object=C,g;function i(Q){const o=[];for(const e in Q){const t=Q[e];delete t.metadata,o.push(t)}return o}}clone(A){return new this.constructor().copy(this,A)}copy(A,I=!0){if(this.name=A.name,this.up.copy(A.up),this.position.copy(A.position),this.rotation.order=A.rotation.order,this.quaternion.copy(A.quaternion),this.scale.copy(A.scale),this.matrix.copy(A.matrix),this.matrixWorld.copy(A.matrixWorld),this.matrixAutoUpdate=A.matrixAutoUpdate,this.matrixWorldNeedsUpdate=A.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=A.matrixWorldAutoUpdate,this.layers.mask=A.layers.mask,this.visible=A.visible,this.castShadow=A.castShadow,this.receiveShadow=A.receiveShadow,this.frustumCulled=A.frustumCulled,this.renderOrder=A.renderOrder,this.userData=JSON.parse(JSON.stringify(A.userData)),I===!0)for(let g=0;g<A.children.length;g++){const C=A.children[g];this.add(C.clone())}return this}}Bg.DefaultUp=new V(0,1,0);Bg.DefaultMatrixAutoUpdate=!0;Bg.DefaultMatrixWorldAutoUpdate=!0;const Mg=new V,Wg=new V,UE=new V,jg=new V,IB=new V,gB=new V,Qt=new V,KE=new V,JE=new V,uE=new V;class _g{constructor(A=new V,I=new V,g=new V){this.a=A,this.b=I,this.c=g}static getNormal(A,I,g,C){C.subVectors(g,I),Mg.subVectors(A,I),C.cross(Mg);const B=C.lengthSq();return B>0?C.multiplyScalar(1/Math.sqrt(B)):C.set(0,0,0)}static getBarycoord(A,I,g,C,B){Mg.subVectors(C,I),Wg.subVectors(g,I),UE.subVectors(A,I);const i=Mg.dot(Mg),Q=Mg.dot(Wg),o=Mg.dot(UE),e=Wg.dot(Wg),t=Wg.dot(UE),a=i*e-Q*Q;if(a===0)return B.set(-2,-1,-1);const s=1/a,n=(e*o-Q*t)*s,h=(i*t-Q*o)*s;return B.set(1-n-h,h,n)}static containsPoint(A,I,g,C){return this.getBarycoord(A,I,g,C,jg),jg.x>=0&&jg.y>=0&&jg.x+jg.y<=1}static getUV(A,I,g,C,B,i,Q,o){return this.getBarycoord(A,I,g,C,jg),o.set(0,0),o.addScaledVector(B,jg.x),o.addScaledVector(i,jg.y),o.addScaledVector(Q,jg.z),o}static isFrontFacing(A,I,g,C){return Mg.subVectors(g,I),Wg.subVectors(A,I),Mg.cross(Wg).dot(C)<0}set(A,I,g){return this.a.copy(A),this.b.copy(I),this.c.copy(g),this}setFromPointsAndIndices(A,I,g,C){return this.a.copy(A[I]),this.b.copy(A[g]),this.c.copy(A[C]),this}setFromAttributeAndIndices(A,I,g,C){return this.a.fromBufferAttribute(A,I),this.b.fromBufferAttribute(A,g),this.c.fromBufferAttribute(A,C),this}clone(){return new this.constructor().copy(this)}copy(A){return this.a.copy(A.a),this.b.copy(A.b),this.c.copy(A.c),this}getArea(){return Mg.subVectors(this.c,this.b),Wg.subVectors(this.a,this.b),Mg.cross(Wg).length()*.5}getMidpoint(A){return A.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(A){return _g.getNormal(this.a,this.b,this.c,A)}getPlane(A){return A.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(A,I){return _g.getBarycoord(A,this.a,this.b,this.c,I)}getUV(A,I,g,C,B){return _g.getUV(A,this.a,this.b,this.c,I,g,C,B)}containsPoint(A){return _g.containsPoint(A,this.a,this.b,this.c)}isFrontFacing(A){return _g.isFrontFacing(this.a,this.b,this.c,A)}intersectsBox(A){return A.intersectsTriangle(this)}closestPointToPoint(A,I){const g=this.a,C=this.b,B=this.c;let i,Q;IB.subVectors(C,g),gB.subVectors(B,g),KE.subVectors(A,g);const o=IB.dot(KE),e=gB.dot(KE);if(o<=0&&e<=0)return I.copy(g);JE.subVectors(A,C);const t=IB.dot(JE),a=gB.dot(JE);if(t>=0&&a<=t)return I.copy(C);const s=o*a-t*e;if(s<=0&&o>=0&&t<=0)return i=o/(o-t),I.copy(g).addScaledVector(IB,i);uE.subVectors(A,B);const n=IB.dot(uE),h=gB.dot(uE);if(h>=0&&n<=h)return I.copy(B);const D=n*e-o*h;if(D<=0&&e>=0&&h<=0)return Q=e/(e-h),I.copy(g).addScaledVector(gB,Q);const r=t*h-n*a;if(r<=0&&a-t>=0&&n-h>=0)return Qt.subVectors(B,C),Q=(a-t)/(a-t+(n-h)),I.copy(C).addScaledVector(Qt,Q);const G=1/(r+D+s);return i=D*G,Q=s*G,I.copy(g).addScaledVector(IB,i).addScaledVector(gB,Q)}equals(A){return A.a.equals(this.a)&&A.b.equals(this.b)&&A.c.equals(this.c)}}let kh=0;class MQ extends FB{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=SQ(),this.name="",this.type="Material",this.blending=rB,this.side=hC,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Fa,this.blendDst=pa,this.blendEquation=tB,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hE,this.stencilZFail=hE,this.stencilZPass=hE,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(A){this._alphaTest>0!=A>0&&this.version++,this._alphaTest=A}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(A){if(A!==void 0)for(const I in A){const g=A[I];if(g===void 0){console.warn("THREE.Material: '"+I+"' parameter is undefined.");continue}const C=this[I];if(C===void 0){console.warn("THREE."+this.type+": '"+I+"' is not a property of this material.");continue}C&&C.isColor?C.set(g):C&&C.isVector3&&g&&g.isVector3?C.copy(g):this[I]=g}}toJSON(A){const I=A===void 0||typeof A=="string";I&&(A={textures:{},images:{}});const g={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};g.uuid=this.uuid,g.type=this.type,this.name!==""&&(g.name=this.name),this.color&&this.color.isColor&&(g.color=this.color.getHex()),this.roughness!==void 0&&(g.roughness=this.roughness),this.metalness!==void 0&&(g.metalness=this.metalness),this.sheen!==void 0&&(g.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(g.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(g.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(g.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(g.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(g.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(g.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(g.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(g.shininess=this.shininess),this.clearcoat!==void 0&&(g.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(g.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(g.clearcoatMap=this.clearcoatMap.toJSON(A).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(g.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(A).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(g.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(A).uuid,g.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(g.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(g.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(g.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(g.iridescenceMap=this.iridescenceMap.toJSON(A).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(g.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(A).uuid),this.map&&this.map.isTexture&&(g.map=this.map.toJSON(A).uuid),this.matcap&&this.matcap.isTexture&&(g.matcap=this.matcap.toJSON(A).uuid),this.alphaMap&&this.alphaMap.isTexture&&(g.alphaMap=this.alphaMap.toJSON(A).uuid),this.lightMap&&this.lightMap.isTexture&&(g.lightMap=this.lightMap.toJSON(A).uuid,g.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(g.aoMap=this.aoMap.toJSON(A).uuid,g.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(g.bumpMap=this.bumpMap.toJSON(A).uuid,g.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(g.normalMap=this.normalMap.toJSON(A).uuid,g.normalMapType=this.normalMapType,g.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(g.displacementMap=this.displacementMap.toJSON(A).uuid,g.displacementScale=this.displacementScale,g.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(g.roughnessMap=this.roughnessMap.toJSON(A).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(g.metalnessMap=this.metalnessMap.toJSON(A).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(g.emissiveMap=this.emissiveMap.toJSON(A).uuid),this.specularMap&&this.specularMap.isTexture&&(g.specularMap=this.specularMap.toJSON(A).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(g.specularIntensityMap=this.specularIntensityMap.toJSON(A).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(g.specularColorMap=this.specularColorMap.toJSON(A).uuid),this.envMap&&this.envMap.isTexture&&(g.envMap=this.envMap.toJSON(A).uuid,this.combine!==void 0&&(g.combine=this.combine)),this.envMapIntensity!==void 0&&(g.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(g.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(g.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(g.gradientMap=this.gradientMap.toJSON(A).uuid),this.transmission!==void 0&&(g.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(g.transmissionMap=this.transmissionMap.toJSON(A).uuid),this.thickness!==void 0&&(g.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(g.thicknessMap=this.thicknessMap.toJSON(A).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(g.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(g.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(g.size=this.size),this.shadowSide!==null&&(g.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(g.sizeAttenuation=this.sizeAttenuation),this.blending!==rB&&(g.blending=this.blending),this.side!==hC&&(g.side=this.side),this.vertexColors&&(g.vertexColors=!0),this.opacity<1&&(g.opacity=this.opacity),this.transparent===!0&&(g.transparent=this.transparent),g.depthFunc=this.depthFunc,g.depthTest=this.depthTest,g.depthWrite=this.depthWrite,g.colorWrite=this.colorWrite,g.stencilWrite=this.stencilWrite,g.stencilWriteMask=this.stencilWriteMask,g.stencilFunc=this.stencilFunc,g.stencilRef=this.stencilRef,g.stencilFuncMask=this.stencilFuncMask,g.stencilFail=this.stencilFail,g.stencilZFail=this.stencilZFail,g.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(g.rotation=this.rotation),this.polygonOffset===!0&&(g.polygonOffset=!0),this.polygonOffsetFactor!==0&&(g.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(g.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(g.linewidth=this.linewidth),this.dashSize!==void 0&&(g.dashSize=this.dashSize),this.gapSize!==void 0&&(g.gapSize=this.gapSize),this.scale!==void 0&&(g.scale=this.scale),this.dithering===!0&&(g.dithering=!0),this.alphaTest>0&&(g.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(g.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(g.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(g.wireframe=this.wireframe),this.wireframeLinewidth>1&&(g.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(g.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(g.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(g.flatShading=this.flatShading),this.visible===!1&&(g.visible=!1),this.toneMapped===!1&&(g.toneMapped=!1),this.fog===!1&&(g.fog=!1),Object.keys(this.userData).length>0&&(g.userData=this.userData);function C(B){const i=[];for(const Q in B){const o=B[Q];delete o.metadata,i.push(o)}return i}if(I){const B=C(A.textures),i=C(A.images);B.length>0&&(g.textures=B),i.length>0&&(g.images=i)}return g}clone(){return new this.constructor().copy(this)}copy(A){this.name=A.name,this.blending=A.blending,this.side=A.side,this.vertexColors=A.vertexColors,this.opacity=A.opacity,this.transparent=A.transparent,this.blendSrc=A.blendSrc,this.blendDst=A.blendDst,this.blendEquation=A.blendEquation,this.blendSrcAlpha=A.blendSrcAlpha,this.blendDstAlpha=A.blendDstAlpha,this.blendEquationAlpha=A.blendEquationAlpha,this.depthFunc=A.depthFunc,this.depthTest=A.depthTest,this.depthWrite=A.depthWrite,this.stencilWriteMask=A.stencilWriteMask,this.stencilFunc=A.stencilFunc,this.stencilRef=A.stencilRef,this.stencilFuncMask=A.stencilFuncMask,this.stencilFail=A.stencilFail,this.stencilZFail=A.stencilZFail,this.stencilZPass=A.stencilZPass,this.stencilWrite=A.stencilWrite;const I=A.clippingPlanes;let g=null;if(I!==null){const C=I.length;g=new Array(C);for(let B=0;B!==C;++B)g[B]=I[B].clone()}return this.clippingPlanes=g,this.clipIntersection=A.clipIntersection,this.clipShadows=A.clipShadows,this.shadowSide=A.shadowSide,this.colorWrite=A.colorWrite,this.precision=A.precision,this.polygonOffset=A.polygonOffset,this.polygonOffsetFactor=A.polygonOffsetFactor,this.polygonOffsetUnits=A.polygonOffsetUnits,this.dithering=A.dithering,this.alphaTest=A.alphaTest,this.alphaToCoverage=A.alphaToCoverage,this.premultipliedAlpha=A.premultipliedAlpha,this.visible=A.visible,this.toneMapped=A.toneMapped,this.userData=JSON.parse(JSON.stringify(A.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(A){A===!0&&this.version++}}class Ho extends MQ{constructor(A){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new II(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.lightMap=A.lightMap,this.lightMapIntensity=A.lightMapIntensity,this.aoMap=A.aoMap,this.aoMapIntensity=A.aoMapIntensity,this.specularMap=A.specularMap,this.alphaMap=A.alphaMap,this.envMap=A.envMap,this.combine=A.combine,this.reflectivity=A.reflectivity,this.refractionRatio=A.refractionRatio,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.wireframeLinecap=A.wireframeLinecap,this.wireframeLinejoin=A.wireframeLinejoin,this.fog=A.fog,this}}const NI=new V,VQ=new gI;class Kg{constructor(A,I,g=!1){if(Array.isArray(A))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=A,this.itemSize=I,this.count=A!==void 0?A.length/I:0,this.normalized=g,this.usage=je,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(A){A===!0&&this.version++}setUsage(A){return this.usage=A,this}copy(A){return this.name=A.name,this.array=new A.array.constructor(A.array),this.itemSize=A.itemSize,this.count=A.count,this.normalized=A.normalized,this.usage=A.usage,this}copyAt(A,I,g){A*=this.itemSize,g*=I.itemSize;for(let C=0,B=this.itemSize;C<B;C++)this.array[A+C]=I.array[g+C];return this}copyArray(A){return this.array.set(A),this}applyMatrix3(A){if(this.itemSize===2)for(let I=0,g=this.count;I<g;I++)VQ.fromBufferAttribute(this,I),VQ.applyMatrix3(A),this.setXY(I,VQ.x,VQ.y);else if(this.itemSize===3)for(let I=0,g=this.count;I<g;I++)NI.fromBufferAttribute(this,I),NI.applyMatrix3(A),this.setXYZ(I,NI.x,NI.y,NI.z);return this}applyMatrix4(A){for(let I=0,g=this.count;I<g;I++)NI.fromBufferAttribute(this,I),NI.applyMatrix4(A),this.setXYZ(I,NI.x,NI.y,NI.z);return this}applyNormalMatrix(A){for(let I=0,g=this.count;I<g;I++)NI.fromBufferAttribute(this,I),NI.applyNormalMatrix(A),this.setXYZ(I,NI.x,NI.y,NI.z);return this}transformDirection(A){for(let I=0,g=this.count;I<g;I++)NI.fromBufferAttribute(this,I),NI.transformDirection(A),this.setXYZ(I,NI.x,NI.y,NI.z);return this}set(A,I=0){return this.array.set(A,I),this}getX(A){let I=this.array[A*this.itemSize];return this.normalized&&(I=bQ(I,this.array)),I}setX(A,I){return this.normalized&&(I=Eg(I,this.array)),this.array[A*this.itemSize]=I,this}getY(A){let I=this.array[A*this.itemSize+1];return this.normalized&&(I=bQ(I,this.array)),I}setY(A,I){return this.normalized&&(I=Eg(I,this.array)),this.array[A*this.itemSize+1]=I,this}getZ(A){let I=this.array[A*this.itemSize+2];return this.normalized&&(I=bQ(I,this.array)),I}setZ(A,I){return this.normalized&&(I=Eg(I,this.array)),this.array[A*this.itemSize+2]=I,this}getW(A){let I=this.array[A*this.itemSize+3];return this.normalized&&(I=bQ(I,this.array)),I}setW(A,I){return this.normalized&&(I=Eg(I,this.array)),this.array[A*this.itemSize+3]=I,this}setXY(A,I,g){return A*=this.itemSize,this.normalized&&(I=Eg(I,this.array),g=Eg(g,this.array)),this.array[A+0]=I,this.array[A+1]=g,this}setXYZ(A,I,g,C){return A*=this.itemSize,this.normalized&&(I=Eg(I,this.array),g=Eg(g,this.array),C=Eg(C,this.array)),this.array[A+0]=I,this.array[A+1]=g,this.array[A+2]=C,this}setXYZW(A,I,g,C,B){return A*=this.itemSize,this.normalized&&(I=Eg(I,this.array),g=Eg(g,this.array),C=Eg(C,this.array),B=Eg(B,this.array)),this.array[A+0]=I,this.array[A+1]=g,this.array[A+2]=C,this.array[A+3]=B,this}onUpload(A){return this.onUploadCallback=A,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const A={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(A.name=this.name),this.usage!==je&&(A.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(A.updateRange=this.updateRange),A}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Ha extends Kg{constructor(A,I,g){super(new Uint16Array(A),I,g)}}class ba extends Kg{constructor(A,I,g){super(new Uint32Array(A),I,g)}}class sC extends Kg{constructor(A,I,g){super(new Float32Array(A),I,g)}}let Rh=0;const rg=new pI,fE=new Bg,CB=new V,eg=new pB,OB=new pB,LI=new V;class AC extends FB{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=SQ(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(A){return Array.isArray(A)?this.index=new(ua(A)?ba:Ha)(A,1):this.index=A,this}getAttribute(A){return this.attributes[A]}setAttribute(A,I){return this.attributes[A]=I,this}deleteAttribute(A){return delete this.attributes[A],this}hasAttribute(A){return this.attributes[A]!==void 0}addGroup(A,I,g=0){this.groups.push({start:A,count:I,materialIndex:g})}clearGroups(){this.groups=[]}setDrawRange(A,I){this.drawRange.start=A,this.drawRange.count=I}applyMatrix4(A){const I=this.attributes.position;I!==void 0&&(I.applyMatrix4(A),I.needsUpdate=!0);const g=this.attributes.normal;if(g!==void 0){const B=new Cg().getNormalMatrix(A);g.applyNormalMatrix(B),g.needsUpdate=!0}const C=this.attributes.tangent;return C!==void 0&&(C.transformDirection(A),C.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(A){return rg.makeRotationFromQuaternion(A),this.applyMatrix4(rg),this}rotateX(A){return rg.makeRotationX(A),this.applyMatrix4(rg),this}rotateY(A){return rg.makeRotationY(A),this.applyMatrix4(rg),this}rotateZ(A){return rg.makeRotationZ(A),this.applyMatrix4(rg),this}translate(A,I,g){return rg.makeTranslation(A,I,g),this.applyMatrix4(rg),this}scale(A,I,g){return rg.makeScale(A,I,g),this.applyMatrix4(rg),this}lookAt(A){return fE.lookAt(A),fE.updateMatrix(),this.applyMatrix4(fE.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(CB).negate(),this.translate(CB.x,CB.y,CB.z),this}setFromPoints(A){const I=[];for(let g=0,C=A.length;g<C;g++){const B=A[g];I.push(B.x,B.y,B.z||0)}return this.setAttribute("position",new sC(I,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pB);const A=this.attributes.position,I=this.morphAttributes.position;if(A&&A.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(A!==void 0){if(this.boundingBox.setFromBufferAttribute(A),I)for(let g=0,C=I.length;g<C;g++){const B=I[g];eg.setFromBufferAttribute(B),this.morphTargetsRelative?(LI.addVectors(this.boundingBox.min,eg.min),this.boundingBox.expandByPoint(LI),LI.addVectors(this.boundingBox.max,eg.max),this.boundingBox.expandByPoint(LI)):(this.boundingBox.expandByPoint(eg.min),this.boundingBox.expandByPoint(eg.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ti);const A=this.attributes.position,I=this.morphAttributes.position;if(A&&A.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new V,1/0);return}if(A){const g=this.boundingSphere.center;if(eg.setFromBufferAttribute(A),I)for(let B=0,i=I.length;B<i;B++){const Q=I[B];OB.setFromBufferAttribute(Q),this.morphTargetsRelative?(LI.addVectors(eg.min,OB.min),eg.expandByPoint(LI),LI.addVectors(eg.max,OB.max),eg.expandByPoint(LI)):(eg.expandByPoint(OB.min),eg.expandByPoint(OB.max))}eg.getCenter(g);let C=0;for(let B=0,i=A.count;B<i;B++)LI.fromBufferAttribute(A,B),C=Math.max(C,g.distanceToSquared(LI));if(I)for(let B=0,i=I.length;B<i;B++){const Q=I[B],o=this.morphTargetsRelative;for(let e=0,t=Q.count;e<t;e++)LI.fromBufferAttribute(Q,e),o&&(CB.fromBufferAttribute(A,e),LI.add(CB)),C=Math.max(C,g.distanceToSquared(LI))}this.boundingSphere.radius=Math.sqrt(C),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const A=this.index,I=this.attributes;if(A===null||I.position===void 0||I.normal===void 0||I.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const g=A.array,C=I.position.array,B=I.normal.array,i=I.uv.array,Q=C.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kg(new Float32Array(4*Q),4));const o=this.getAttribute("tangent").array,e=[],t=[];for(let Y=0;Y<Q;Y++)e[Y]=new V,t[Y]=new V;const a=new V,s=new V,n=new V,h=new gI,D=new gI,r=new gI,G=new V,w=new V;function S(Y,z,q){a.fromArray(C,Y*3),s.fromArray(C,z*3),n.fromArray(C,q*3),h.fromArray(i,Y*2),D.fromArray(i,z*2),r.fromArray(i,q*2),s.sub(a),n.sub(a),D.sub(h),r.sub(h);const f=1/(D.x*r.y-r.x*D.y);!isFinite(f)||(G.copy(s).multiplyScalar(r.y).addScaledVector(n,-D.y).multiplyScalar(f),w.copy(n).multiplyScalar(D.x).addScaledVector(s,-r.x).multiplyScalar(f),e[Y].add(G),e[z].add(G),e[q].add(G),t[Y].add(w),t[z].add(w),t[q].add(w))}let y=this.groups;y.length===0&&(y=[{start:0,count:g.length}]);for(let Y=0,z=y.length;Y<z;++Y){const q=y[Y],f=q.start,K=q.count;for(let H=f,j=f+K;H<j;H+=3)S(g[H+0],g[H+1],g[H+2])}const M=new V,p=new V,U=new V,l=new V;function N(Y){U.fromArray(B,Y*3),l.copy(U);const z=e[Y];M.copy(z),M.sub(U.multiplyScalar(U.dot(z))).normalize(),p.crossVectors(l,z);const f=p.dot(t[Y])<0?-1:1;o[Y*4]=M.x,o[Y*4+1]=M.y,o[Y*4+2]=M.z,o[Y*4+3]=f}for(let Y=0,z=y.length;Y<z;++Y){const q=y[Y],f=q.start,K=q.count;for(let H=f,j=f+K;H<j;H+=3)N(g[H+0]),N(g[H+1]),N(g[H+2])}}computeVertexNormals(){const A=this.index,I=this.getAttribute("position");if(I!==void 0){let g=this.getAttribute("normal");if(g===void 0)g=new Kg(new Float32Array(I.count*3),3),this.setAttribute("normal",g);else for(let s=0,n=g.count;s<n;s++)g.setXYZ(s,0,0,0);const C=new V,B=new V,i=new V,Q=new V,o=new V,e=new V,t=new V,a=new V;if(A)for(let s=0,n=A.count;s<n;s+=3){const h=A.getX(s+0),D=A.getX(s+1),r=A.getX(s+2);C.fromBufferAttribute(I,h),B.fromBufferAttribute(I,D),i.fromBufferAttribute(I,r),t.subVectors(i,B),a.subVectors(C,B),t.cross(a),Q.fromBufferAttribute(g,h),o.fromBufferAttribute(g,D),e.fromBufferAttribute(g,r),Q.add(t),o.add(t),e.add(t),g.setXYZ(h,Q.x,Q.y,Q.z),g.setXYZ(D,o.x,o.y,o.z),g.setXYZ(r,e.x,e.y,e.z)}else for(let s=0,n=I.count;s<n;s+=3)C.fromBufferAttribute(I,s+0),B.fromBufferAttribute(I,s+1),i.fromBufferAttribute(I,s+2),t.subVectors(i,B),a.subVectors(C,B),t.cross(a),g.setXYZ(s+0,t.x,t.y,t.z),g.setXYZ(s+1,t.x,t.y,t.z),g.setXYZ(s+2,t.x,t.y,t.z);this.normalizeNormals(),g.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const A=this.attributes.normal;for(let I=0,g=A.count;I<g;I++)LI.fromBufferAttribute(A,I),LI.normalize(),A.setXYZ(I,LI.x,LI.y,LI.z)}toNonIndexed(){function A(Q,o){const e=Q.array,t=Q.itemSize,a=Q.normalized,s=new e.constructor(o.length*t);let n=0,h=0;for(let D=0,r=o.length;D<r;D++){Q.isInterleavedBufferAttribute?n=o[D]*Q.data.stride+Q.offset:n=o[D]*t;for(let G=0;G<t;G++)s[h++]=e[n++]}return new Kg(s,t,a)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const I=new AC,g=this.index.array,C=this.attributes;for(const Q in C){const o=C[Q],e=A(o,g);I.setAttribute(Q,e)}const B=this.morphAttributes;for(const Q in B){const o=[],e=B[Q];for(let t=0,a=e.length;t<a;t++){const s=e[t],n=A(s,g);o.push(n)}I.morphAttributes[Q]=o}I.morphTargetsRelative=this.morphTargetsRelative;const i=this.groups;for(let Q=0,o=i.length;Q<o;Q++){const e=i[Q];I.addGroup(e.start,e.count,e.materialIndex)}return I}toJSON(){const A={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(A.uuid=this.uuid,A.type=this.type,this.name!==""&&(A.name=this.name),Object.keys(this.userData).length>0&&(A.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const e in o)o[e]!==void 0&&(A[e]=o[e]);return A}A.data={attributes:{}};const I=this.index;I!==null&&(A.data.index={type:I.array.constructor.name,array:Array.prototype.slice.call(I.array)});const g=this.attributes;for(const o in g){const e=g[o];A.data.attributes[o]=e.toJSON(A.data)}const C={};let B=!1;for(const o in this.morphAttributes){const e=this.morphAttributes[o],t=[];for(let a=0,s=e.length;a<s;a++){const n=e[a];t.push(n.toJSON(A.data))}t.length>0&&(C[o]=t,B=!0)}B&&(A.data.morphAttributes=C,A.data.morphTargetsRelative=this.morphTargetsRelative);const i=this.groups;i.length>0&&(A.data.groups=JSON.parse(JSON.stringify(i)));const Q=this.boundingSphere;return Q!==null&&(A.data.boundingSphere={center:Q.center.toArray(),radius:Q.radius}),A}clone(){return new this.constructor().copy(this)}copy(A){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const I={};this.name=A.name;const g=A.index;g!==null&&this.setIndex(g.clone(I));const C=A.attributes;for(const e in C){const t=C[e];this.setAttribute(e,t.clone(I))}const B=A.morphAttributes;for(const e in B){const t=[],a=B[e];for(let s=0,n=a.length;s<n;s++)t.push(a[s].clone(I));this.morphAttributes[e]=t}this.morphTargetsRelative=A.morphTargetsRelative;const i=A.groups;for(let e=0,t=i.length;e<t;e++){const a=i[e];this.addGroup(a.start,a.count,a.materialIndex)}const Q=A.boundingBox;Q!==null&&(this.boundingBox=Q.clone());const o=A.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=A.drawRange.start,this.drawRange.count=A.drawRange.count,this.userData=A.userData,A.parameters!==void 0&&(this.parameters=Object.assign({},A.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const it=new pI,BB=new La,qE=new Ti,PB=new V,WB=new V,jB=new V,YE=new V,ZQ=new V,zQ=new gI,XQ=new gI,$Q=new gI,mE=new V,Ai=new V;class cg extends Bg{constructor(A=new AC,I=new Ho){super(),this.isMesh=!0,this.type="Mesh",this.geometry=A,this.material=I,this.updateMorphTargets()}copy(A,I){return super.copy(A,I),A.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=A.morphTargetInfluences.slice()),A.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},A.morphTargetDictionary)),this.material=A.material,this.geometry=A.geometry,this}updateMorphTargets(){const I=this.geometry.morphAttributes,g=Object.keys(I);if(g.length>0){const C=I[g[0]];if(C!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let B=0,i=C.length;B<i;B++){const Q=C[B].name||String(B);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Q]=B}}}}getVertexPosition(A,I){const g=this.geometry,C=g.attributes.position,B=g.morphAttributes.position,i=g.morphTargetsRelative;I.fromBufferAttribute(C,A);const Q=this.morphTargetInfluences;if(B&&Q){ZQ.set(0,0,0);for(let o=0,e=B.length;o<e;o++){const t=Q[o],a=B[o];t!==0&&(YE.fromBufferAttribute(a,A),i?ZQ.addScaledVector(YE,t):ZQ.addScaledVector(YE.sub(I),t))}I.add(ZQ)}return this.isSkinnedMesh&&this.boneTransform(A,I),I}raycast(A,I){const g=this.geometry,C=this.material,B=this.matrixWorld;if(C===void 0||(g.boundingSphere===null&&g.computeBoundingSphere(),qE.copy(g.boundingSphere),qE.applyMatrix4(B),A.ray.intersectsSphere(qE)===!1)||(it.copy(B).invert(),BB.copy(A.ray).applyMatrix4(it),g.boundingBox!==null&&BB.intersectsBox(g.boundingBox)===!1))return;let i;const Q=g.index,o=g.attributes.position,e=g.attributes.uv,t=g.attributes.uv2,a=g.groups,s=g.drawRange;if(Q!==null)if(Array.isArray(C))for(let n=0,h=a.length;n<h;n++){const D=a[n],r=C[D.materialIndex],G=Math.max(D.start,s.start),w=Math.min(Q.count,Math.min(D.start+D.count,s.start+s.count));for(let S=G,y=w;S<y;S+=3){const M=Q.getX(S),p=Q.getX(S+1),U=Q.getX(S+2);i=Ii(this,r,A,BB,e,t,M,p,U),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=D.materialIndex,I.push(i))}}else{const n=Math.max(0,s.start),h=Math.min(Q.count,s.start+s.count);for(let D=n,r=h;D<r;D+=3){const G=Q.getX(D),w=Q.getX(D+1),S=Q.getX(D+2);i=Ii(this,C,A,BB,e,t,G,w,S),i&&(i.faceIndex=Math.floor(D/3),I.push(i))}}else if(o!==void 0)if(Array.isArray(C))for(let n=0,h=a.length;n<h;n++){const D=a[n],r=C[D.materialIndex],G=Math.max(D.start,s.start),w=Math.min(o.count,Math.min(D.start+D.count,s.start+s.count));for(let S=G,y=w;S<y;S+=3){const M=S,p=S+1,U=S+2;i=Ii(this,r,A,BB,e,t,M,p,U),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=D.materialIndex,I.push(i))}}else{const n=Math.max(0,s.start),h=Math.min(o.count,s.start+s.count);for(let D=n,r=h;D<r;D+=3){const G=D,w=D+1,S=D+2;i=Ii(this,C,A,BB,e,t,G,w,S),i&&(i.faceIndex=Math.floor(D/3),I.push(i))}}}}function Fh(E,A,I,g,C,B,i,Q){let o;if(A.side===ag?o=g.intersectTriangle(i,B,C,!0,Q):o=g.intersectTriangle(C,B,i,A.side===hC,Q),o===null)return null;Ai.copy(Q),Ai.applyMatrix4(E.matrixWorld);const e=I.ray.origin.distanceTo(Ai);return e<I.near||e>I.far?null:{distance:e,point:Ai.clone(),object:E}}function Ii(E,A,I,g,C,B,i,Q,o){E.getVertexPosition(i,PB),E.getVertexPosition(Q,WB),E.getVertexPosition(o,jB);const e=Fh(E,A,I,g,PB,WB,jB,mE);if(e){C&&(zQ.fromBufferAttribute(C,i),XQ.fromBufferAttribute(C,Q),$Q.fromBufferAttribute(C,o),e.uv=_g.getUV(mE,PB,WB,jB,zQ,XQ,$Q,new gI)),B&&(zQ.fromBufferAttribute(B,i),XQ.fromBufferAttribute(B,Q),$Q.fromBufferAttribute(B,o),e.uv2=_g.getUV(mE,PB,WB,jB,zQ,XQ,$Q,new gI));const t={a:i,b:Q,c:o,normal:new V,materialIndex:0};_g.getNormal(PB,WB,jB,t.normal),e.face=t}return e}class kQ extends AC{constructor(A=1,I=1,g=1,C=1,B=1,i=1){super(),this.type="BoxGeometry",this.parameters={width:A,height:I,depth:g,widthSegments:C,heightSegments:B,depthSegments:i};const Q=this;C=Math.floor(C),B=Math.floor(B),i=Math.floor(i);const o=[],e=[],t=[],a=[];let s=0,n=0;h("z","y","x",-1,-1,g,I,A,i,B,0),h("z","y","x",1,-1,g,I,-A,i,B,1),h("x","z","y",1,1,A,g,I,C,i,2),h("x","z","y",1,-1,A,g,-I,C,i,3),h("x","y","z",1,-1,A,I,g,C,B,4),h("x","y","z",-1,-1,A,I,-g,C,B,5),this.setIndex(o),this.setAttribute("position",new sC(e,3)),this.setAttribute("normal",new sC(t,3)),this.setAttribute("uv",new sC(a,2));function h(D,r,G,w,S,y,M,p,U,l,N){const Y=y/U,z=M/l,q=y/2,f=M/2,K=p/2,H=U+1,j=l+1;let EA=0,Z=0;const x=new V;for(let T=0;T<j;T++){const F=T*z-f;for(let J=0;J<H;J++){const _=J*Y-q;x[D]=_*w,x[r]=F*S,x[G]=K,e.push(x.x,x.y,x.z),x[D]=0,x[r]=0,x[G]=p>0?1:-1,t.push(x.x,x.y,x.z),a.push(J/U),a.push(1-T/l),EA+=1}}for(let T=0;T<l;T++)for(let F=0;F<U;F++){const J=s+F+H*T,_=s+F+H*(T+1),P=s+(F+1)+H*(T+1),O=s+(F+1)+H*T;o.push(J,_,O),o.push(_,P,O),Z+=6}Q.addGroup(n,Z,N),n+=Z,s+=EA}}static fromJSON(A){return new kQ(A.width,A.height,A.depth,A.widthSegments,A.heightSegments,A.depthSegments)}}function yB(E){const A={};for(const I in E){A[I]={};for(const g in E[I]){const C=E[I][g];C&&(C.isColor||C.isMatrix3||C.isMatrix4||C.isVector2||C.isVector3||C.isVector4||C.isTexture||C.isQuaternion)?A[I][g]=C.clone():Array.isArray(C)?A[I][g]=C.slice():A[I][g]=C}}return A}function ZI(E){const A={};for(let I=0;I<E.length;I++){const g=yB(E[I]);for(const C in g)A[C]=g[C]}return A}function ph(E){const A=[];for(let I=0;I<E.length;I++)A.push(E[I].clone());return A}function va(E){return E.getRenderTarget()===null&&E.outputEncoding===GI?mg:nQ}const xa={clone:yB,merge:ZI};var Nh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class LC extends MQ{constructor(A){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nh,this.fragmentShader=Uh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,A!==void 0&&this.setValues(A)}copy(A){return super.copy(A),this.fragmentShader=A.fragmentShader,this.vertexShader=A.vertexShader,this.uniforms=yB(A.uniforms),this.uniformsGroups=ph(A.uniformsGroups),this.defines=Object.assign({},A.defines),this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.fog=A.fog,this.lights=A.lights,this.clipping=A.clipping,this.extensions=Object.assign({},A.extensions),this.glslVersion=A.glslVersion,this}toJSON(A){const I=super.toJSON(A);I.glslVersion=this.glslVersion,I.uniforms={};for(const C in this.uniforms){const i=this.uniforms[C].value;i&&i.isTexture?I.uniforms[C]={type:"t",value:i.toJSON(A).uuid}:i&&i.isColor?I.uniforms[C]={type:"c",value:i.getHex()}:i&&i.isVector2?I.uniforms[C]={type:"v2",value:i.toArray()}:i&&i.isVector3?I.uniforms[C]={type:"v3",value:i.toArray()}:i&&i.isVector4?I.uniforms[C]={type:"v4",value:i.toArray()}:i&&i.isMatrix3?I.uniforms[C]={type:"m3",value:i.toArray()}:i&&i.isMatrix4?I.uniforms[C]={type:"m4",value:i.toArray()}:I.uniforms[C]={value:i}}Object.keys(this.defines).length>0&&(I.defines=this.defines),I.vertexShader=this.vertexShader,I.fragmentShader=this.fragmentShader;const g={};for(const C in this.extensions)this.extensions[C]===!0&&(g[C]=!0);return Object.keys(g).length>0&&(I.extensions=g),I}}class Ta extends Bg{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pI,this.projectionMatrix=new pI,this.projectionMatrixInverse=new pI}copy(A,I){return super.copy(A,I),this.matrixWorldInverse.copy(A.matrixWorldInverse),this.projectionMatrix.copy(A.projectionMatrix),this.projectionMatrixInverse.copy(A.projectionMatrixInverse),this}getWorldDirection(A){this.updateWorldMatrix(!0,!1);const I=this.matrixWorld.elements;return A.set(-I[8],-I[9],-I[10]).normalize()}updateMatrixWorld(A){super.updateMatrixWorld(A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(A,I){super.updateWorldMatrix(A,I),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class hg extends Ta{constructor(A=50,I=1,g=.1,C=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=A,this.zoom=1,this.near=g,this.far=C,this.focus=10,this.aspect=I,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(A,I){return super.copy(A,I),this.fov=A.fov,this.zoom=A.zoom,this.near=A.near,this.far=A.far,this.focus=A.focus,this.aspect=A.aspect,this.view=A.view===null?null:Object.assign({},A.view),this.filmGauge=A.filmGauge,this.filmOffset=A.filmOffset,this}setFocalLength(A){const I=.5*this.getFilmHeight()/A;this.fov=Ve*2*Math.atan(I),this.updateProjectionMatrix()}getFocalLength(){const A=Math.tan(cE*.5*this.fov);return .5*this.getFilmHeight()/A}getEffectiveFOV(){return Ve*2*Math.atan(Math.tan(cE*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(A,I,g,C,B,i){this.aspect=A/I,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=A,this.view.fullHeight=I,this.view.offsetX=g,this.view.offsetY=C,this.view.width=B,this.view.height=i,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const A=this.near;let I=A*Math.tan(cE*.5*this.fov)/this.zoom,g=2*I,C=this.aspect*g,B=-.5*C;const i=this.view;if(this.view!==null&&this.view.enabled){const o=i.fullWidth,e=i.fullHeight;B+=i.offsetX*C/o,I-=i.offsetY*g/e,C*=i.width/o,g*=i.height/e}const Q=this.filmOffset;Q!==0&&(B+=A*Q/this.getFilmWidth()),this.projectionMatrix.makePerspective(B,B+C,I,I-g,A,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(A){const I=super.toJSON(A);return I.object.fov=this.fov,I.object.zoom=this.zoom,I.object.near=this.near,I.object.far=this.far,I.object.focus=this.focus,I.object.aspect=this.aspect,this.view!==null&&(I.object.view=Object.assign({},this.view)),I.object.filmGauge=this.filmGauge,I.object.filmOffset=this.filmOffset,I}}const QB=-90,iB=1;class Kh extends Bg{constructor(A,I,g){super(),this.type="CubeCamera",this.renderTarget=g;const C=new hg(QB,iB,A,I);C.layers=this.layers,C.up.set(0,1,0),C.lookAt(1,0,0),this.add(C);const B=new hg(QB,iB,A,I);B.layers=this.layers,B.up.set(0,1,0),B.lookAt(-1,0,0),this.add(B);const i=new hg(QB,iB,A,I);i.layers=this.layers,i.up.set(0,0,-1),i.lookAt(0,1,0),this.add(i);const Q=new hg(QB,iB,A,I);Q.layers=this.layers,Q.up.set(0,0,1),Q.lookAt(0,-1,0),this.add(Q);const o=new hg(QB,iB,A,I);o.layers=this.layers,o.up.set(0,1,0),o.lookAt(0,0,1),this.add(o);const e=new hg(QB,iB,A,I);e.layers=this.layers,e.up.set(0,1,0),e.lookAt(0,0,-1),this.add(e)}update(A,I){this.parent===null&&this.updateMatrixWorld();const g=this.renderTarget,[C,B,i,Q,o,e]=this.children,t=A.getRenderTarget(),a=A.toneMapping,s=A.xr.enabled;A.toneMapping=Zg,A.xr.enabled=!1;const n=g.texture.generateMipmaps;g.texture.generateMipmaps=!1,A.setRenderTarget(g,0),A.render(I,C),A.setRenderTarget(g,1),A.render(I,B),A.setRenderTarget(g,2),A.render(I,i),A.setRenderTarget(g,3),A.render(I,Q),A.setRenderTarget(g,4),A.render(I,o),g.texture.generateMipmaps=n,A.setRenderTarget(g,5),A.render(I,e),A.setRenderTarget(t),A.toneMapping=a,A.xr.enabled=s,g.texture.needsPMREMUpdate=!0}}class Oa extends XI{constructor(A,I,g,C,B,i,Q,o,e,t){A=A!==void 0?A:[],I=I!==void 0?I:GB,super(A,I,g,C,B,i,Q,o,e,t),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(A){this.image=A}}class Jh extends mC{constructor(A=1,I={}){super(A,A,I),this.isWebGLCubeRenderTarget=!0;const g={width:A,height:A,depth:1},C=[g,g,g,g,g,g];this.texture=new Oa(C,I.mapping,I.wrapS,I.wrapT,I.magFilter,I.minFilter,I.format,I.type,I.anisotropy,I.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=I.generateMipmaps!==void 0?I.generateMipmaps:!1,this.texture.minFilter=I.minFilter!==void 0?I.minFilter:gg}fromEquirectangularTexture(A,I){this.texture.type=I.type,this.texture.encoding=I.encoding,this.texture.generateMipmaps=I.generateMipmaps,this.texture.minFilter=I.minFilter,this.texture.magFilter=I.magFilter;const g={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},C=new kQ(5,5,5),B=new LC({name:"CubemapFromEquirect",uniforms:yB(g.uniforms),vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,side:ag,blending:aC});B.uniforms.tEquirect.value=I;const i=new cg(C,B),Q=I.minFilter;return I.minFilter===aQ&&(I.minFilter=gg),new Kh(1,10,this).update(A,i),I.minFilter=Q,i.geometry.dispose(),i.material.dispose(),this}clear(A,I,g,C){const B=A.getRenderTarget();for(let i=0;i<6;i++)A.setRenderTarget(this,i),A.clear(I,g,C);A.setRenderTarget(B)}}const LE=new V,uh=new V,fh=new Cg;class yC{constructor(A=new V(1,0,0),I=0){this.isPlane=!0,this.normal=A,this.constant=I}set(A,I){return this.normal.copy(A),this.constant=I,this}setComponents(A,I,g,C){return this.normal.set(A,I,g),this.constant=C,this}setFromNormalAndCoplanarPoint(A,I){return this.normal.copy(A),this.constant=-I.dot(this.normal),this}setFromCoplanarPoints(A,I,g){const C=LE.subVectors(g,I).cross(uh.subVectors(A,I)).normalize();return this.setFromNormalAndCoplanarPoint(C,A),this}copy(A){return this.normal.copy(A.normal),this.constant=A.constant,this}normalize(){const A=1/this.normal.length();return this.normal.multiplyScalar(A),this.constant*=A,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(A){return this.normal.dot(A)+this.constant}distanceToSphere(A){return this.distanceToPoint(A.center)-A.radius}projectPoint(A,I){return I.copy(this.normal).multiplyScalar(-this.distanceToPoint(A)).add(A)}intersectLine(A,I){const g=A.delta(LE),C=this.normal.dot(g);if(C===0)return this.distanceToPoint(A.start)===0?I.copy(A.start):null;const B=-(A.start.dot(this.normal)+this.constant)/C;return B<0||B>1?null:I.copy(g).multiplyScalar(B).add(A.start)}intersectsLine(A){const I=this.distanceToPoint(A.start),g=this.distanceToPoint(A.end);return I<0&&g>0||g<0&&I>0}intersectsBox(A){return A.intersectsPlane(this)}intersectsSphere(A){return A.intersectsPlane(this)}coplanarPoint(A){return A.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(A,I){const g=I||fh.getNormalMatrix(A),C=this.coplanarPoint(LE).applyMatrix4(A),B=this.normal.applyMatrix3(g).normalize();return this.constant=-C.dot(B),this}translate(A){return this.constant-=A.dot(this.normal),this}equals(A){return A.normal.equals(this.normal)&&A.constant===this.constant}clone(){return new this.constructor().copy(this)}}const EB=new Ti,gi=new V;class bo{constructor(A=new yC,I=new yC,g=new yC,C=new yC,B=new yC,i=new yC){this.planes=[A,I,g,C,B,i]}set(A,I,g,C,B,i){const Q=this.planes;return Q[0].copy(A),Q[1].copy(I),Q[2].copy(g),Q[3].copy(C),Q[4].copy(B),Q[5].copy(i),this}copy(A){const I=this.planes;for(let g=0;g<6;g++)I[g].copy(A.planes[g]);return this}setFromProjectionMatrix(A){const I=this.planes,g=A.elements,C=g[0],B=g[1],i=g[2],Q=g[3],o=g[4],e=g[5],t=g[6],a=g[7],s=g[8],n=g[9],h=g[10],D=g[11],r=g[12],G=g[13],w=g[14],S=g[15];return I[0].setComponents(Q-C,a-o,D-s,S-r).normalize(),I[1].setComponents(Q+C,a+o,D+s,S+r).normalize(),I[2].setComponents(Q+B,a+e,D+n,S+G).normalize(),I[3].setComponents(Q-B,a-e,D-n,S-G).normalize(),I[4].setComponents(Q-i,a-t,D-h,S-w).normalize(),I[5].setComponents(Q+i,a+t,D+h,S+w).normalize(),this}intersectsObject(A){const I=A.geometry;return I.boundingSphere===null&&I.computeBoundingSphere(),EB.copy(I.boundingSphere).applyMatrix4(A.matrixWorld),this.intersectsSphere(EB)}intersectsSprite(A){return EB.center.set(0,0,0),EB.radius=.7071067811865476,EB.applyMatrix4(A.matrixWorld),this.intersectsSphere(EB)}intersectsSphere(A){const I=this.planes,g=A.center,C=-A.radius;for(let B=0;B<6;B++)if(I[B].distanceToPoint(g)<C)return!1;return!0}intersectsBox(A){const I=this.planes;for(let g=0;g<6;g++){const C=I[g];if(gi.x=C.normal.x>0?A.max.x:A.min.x,gi.y=C.normal.y>0?A.max.y:A.min.y,gi.z=C.normal.z>0?A.max.z:A.min.z,C.distanceToPoint(gi)<0)return!1}return!0}containsPoint(A){const I=this.planes;for(let g=0;g<6;g++)if(I[g].distanceToPoint(A)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pa(){let E=null,A=!1,I=null,g=null;function C(B,i){I(B,i),g=E.requestAnimationFrame(C)}return{start:function(){A!==!0&&I!==null&&(g=E.requestAnimationFrame(C),A=!0)},stop:function(){E.cancelAnimationFrame(g),A=!1},setAnimationLoop:function(B){I=B},setContext:function(B){E=B}}}function qh(E,A){const I=A.isWebGL2,g=new WeakMap;function C(e,t){const a=e.array,s=e.usage,n=E.createBuffer();E.bindBuffer(t,n),E.bufferData(t,a,s),e.onUploadCallback();let h;if(a instanceof Float32Array)h=5126;else if(a instanceof Uint16Array)if(e.isFloat16BufferAttribute)if(I)h=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else h=5123;else if(a instanceof Int16Array)h=5122;else if(a instanceof Uint32Array)h=5125;else if(a instanceof Int32Array)h=5124;else if(a instanceof Int8Array)h=5120;else if(a instanceof Uint8Array)h=5121;else if(a instanceof Uint8ClampedArray)h=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:n,type:h,bytesPerElement:a.BYTES_PER_ELEMENT,version:e.version}}function B(e,t,a){const s=t.array,n=t.updateRange;E.bindBuffer(a,e),n.count===-1?E.bufferSubData(a,0,s):(I?E.bufferSubData(a,n.offset*s.BYTES_PER_ELEMENT,s,n.offset,n.count):E.bufferSubData(a,n.offset*s.BYTES_PER_ELEMENT,s.subarray(n.offset,n.offset+n.count)),n.count=-1),t.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),g.get(e)}function Q(e){e.isInterleavedBufferAttribute&&(e=e.data);const t=g.get(e);t&&(E.deleteBuffer(t.buffer),g.delete(e))}function o(e,t){if(e.isGLBufferAttribute){const s=g.get(e);(!s||s.version<e.version)&&g.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}e.isInterleavedBufferAttribute&&(e=e.data);const a=g.get(e);a===void 0?g.set(e,C(e,t)):a.version<e.version&&(B(a.buffer,e,t),a.version=e.version)}return{get:i,remove:Q,update:o}}class HC extends AC{constructor(A=1,I=1,g=1,C=1){super(),this.type="PlaneGeometry",this.parameters={width:A,height:I,widthSegments:g,heightSegments:C};const B=A/2,i=I/2,Q=Math.floor(g),o=Math.floor(C),e=Q+1,t=o+1,a=A/Q,s=I/o,n=[],h=[],D=[],r=[];for(let G=0;G<t;G++){const w=G*s-i;for(let S=0;S<e;S++){const y=S*a-B;h.push(y,-w,0),D.push(0,0,1),r.push(S/Q),r.push(1-G/o)}}for(let G=0;G<o;G++)for(let w=0;w<Q;w++){const S=w+e*G,y=w+e*(G+1),M=w+1+e*(G+1),p=w+1+e*G;n.push(S,y,p),n.push(y,M,p)}this.setIndex(n),this.setAttribute("position",new sC(h,3)),this.setAttribute("normal",new sC(D,3)),this.setAttribute("uv",new sC(r,2))}static fromJSON(A){return new HC(A.width,A.height,A.widthSegments,A.heightSegments)}}var Yh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Hh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xh="vec3 transformed = vec3( position );",Th=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Oh=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Ph=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$h=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ac=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ic=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,gc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cc=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,ic=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ec=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oc="gl_FragColor = linearToOutputTexel( gl_FragColor );",ec=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ac=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sc=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wc=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gc=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Sc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yc=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kc=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Rc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fc=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nc=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Uc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Kc=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Jc=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,qc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Lc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Hc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Oc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pc=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,jc=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_c=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Vc=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Zc=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$c=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Al=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Il=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,gl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Cl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Bl=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ql=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,il=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,El=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ol=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,el=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tl=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,al=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nl=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,rl=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dl=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,hl=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ll=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,wl=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gl=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Sl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dl=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yl=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ml=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kl=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Rl=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Fl=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,pl=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Nl=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Ul=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Kl=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Jl=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,ul=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ql=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Yl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ml=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Ll=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hl=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,bl=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vl=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,xl=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Tl=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ol=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Wl=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jl=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_l=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vl=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zl=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zl=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xl=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$l=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Iw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ew=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ow=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ew=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tw=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,sw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,jA={alphamap_fragment:Yh,alphamap_pars_fragment:mh,alphatest_fragment:Lh,alphatest_pars_fragment:Hh,aomap_fragment:bh,aomap_pars_fragment:vh,begin_vertex:xh,beginnormal_vertex:Th,bsdfs:Oh,iridescence_fragment:Ph,bumpmap_pars_fragment:Wh,clipping_planes_fragment:jh,clipping_planes_pars_fragment:_h,clipping_planes_pars_vertex:Vh,clipping_planes_vertex:Zh,color_fragment:zh,color_pars_fragment:Xh,color_pars_vertex:$h,color_vertex:Ac,common:Ic,cube_uv_reflection_fragment:gc,defaultnormal_vertex:Cc,displacementmap_pars_vertex:Bc,displacementmap_vertex:Qc,emissivemap_fragment:ic,emissivemap_pars_fragment:Ec,encodings_fragment:oc,encodings_pars_fragment:ec,envmap_fragment:tc,envmap_common_pars_fragment:ac,envmap_pars_fragment:sc,envmap_pars_vertex:nc,envmap_physical_pars_fragment:kc,envmap_vertex:rc,fog_vertex:Dc,fog_pars_vertex:hc,fog_fragment:cc,fog_pars_fragment:lc,gradientmap_pars_fragment:wc,lightmap_fragment:Gc,lightmap_pars_fragment:Sc,lights_lambert_fragment:dc,lights_lambert_pars_fragment:yc,lights_pars_begin:Mc,lights_toon_fragment:Rc,lights_toon_pars_fragment:Fc,lights_phong_fragment:pc,lights_phong_pars_fragment:Nc,lights_physical_fragment:Uc,lights_physical_pars_fragment:Kc,lights_fragment_begin:Jc,lights_fragment_maps:uc,lights_fragment_end:fc,logdepthbuf_fragment:qc,logdepthbuf_pars_fragment:Yc,logdepthbuf_pars_vertex:mc,logdepthbuf_vertex:Lc,map_fragment:Hc,map_pars_fragment:bc,map_particle_fragment:vc,map_particle_pars_fragment:xc,metalnessmap_fragment:Tc,metalnessmap_pars_fragment:Oc,morphcolor_vertex:Pc,morphnormal_vertex:Wc,morphtarget_pars_vertex:jc,morphtarget_vertex:_c,normal_fragment_begin:Vc,normal_fragment_maps:Zc,normal_pars_fragment:zc,normal_pars_vertex:Xc,normal_vertex:$c,normalmap_pars_fragment:Al,clearcoat_normal_fragment_begin:Il,clearcoat_normal_fragment_maps:gl,clearcoat_pars_fragment:Cl,iridescence_pars_fragment:Bl,output_fragment:Ql,packing:il,premultiplied_alpha_fragment:El,project_vertex:ol,dithering_fragment:el,dithering_pars_fragment:tl,roughnessmap_fragment:al,roughnessmap_pars_fragment:sl,shadowmap_pars_fragment:nl,shadowmap_pars_vertex:rl,shadowmap_vertex:Dl,shadowmask_pars_fragment:hl,skinbase_vertex:cl,skinning_pars_vertex:ll,skinning_vertex:wl,skinnormal_vertex:Gl,specularmap_fragment:Sl,specularmap_pars_fragment:dl,tonemapping_fragment:yl,tonemapping_pars_fragment:Ml,transmission_fragment:kl,transmission_pars_fragment:Rl,uv_pars_fragment:Fl,uv_pars_vertex:pl,uv_vertex:Nl,uv2_pars_fragment:Ul,uv2_pars_vertex:Kl,uv2_vertex:Jl,worldpos_vertex:ul,background_vert:fl,background_frag:ql,backgroundCube_vert:Yl,backgroundCube_frag:ml,cube_vert:Ll,cube_frag:Hl,depth_vert:bl,depth_frag:vl,distanceRGBA_vert:xl,distanceRGBA_frag:Tl,equirect_vert:Ol,equirect_frag:Pl,linedashed_vert:Wl,linedashed_frag:jl,meshbasic_vert:_l,meshbasic_frag:Vl,meshlambert_vert:Zl,meshlambert_frag:zl,meshmatcap_vert:Xl,meshmatcap_frag:$l,meshnormal_vert:Aw,meshnormal_frag:Iw,meshphong_vert:gw,meshphong_frag:Cw,meshphysical_vert:Bw,meshphysical_frag:Qw,meshtoon_vert:iw,meshtoon_frag:Ew,points_vert:ow,points_frag:ew,shadow_vert:tw,shadow_frag:aw,sprite_vert:sw,sprite_frag:nw},pA={common:{diffuse:{value:new II(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Cg},uv2Transform:{value:new Cg},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new gI(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new II(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new II(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Cg}},sprite:{diffuse:{value:new II(16777215)},opacity:{value:1},center:{value:new gI(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Cg}}},Hg={basic:{uniforms:ZI([pA.common,pA.specularmap,pA.envmap,pA.aomap,pA.lightmap,pA.fog]),vertexShader:jA.meshbasic_vert,fragmentShader:jA.meshbasic_frag},lambert:{uniforms:ZI([pA.common,pA.specularmap,pA.envmap,pA.aomap,pA.lightmap,pA.emissivemap,pA.bumpmap,pA.normalmap,pA.displacementmap,pA.fog,pA.lights,{emissive:{value:new II(0)}}]),vertexShader:jA.meshlambert_vert,fragmentShader:jA.meshlambert_frag},phong:{uniforms:ZI([pA.common,pA.specularmap,pA.envmap,pA.aomap,pA.lightmap,pA.emissivemap,pA.bumpmap,pA.normalmap,pA.displacementmap,pA.fog,pA.lights,{emissive:{value:new II(0)},specular:{value:new II(1118481)},shininess:{value:30}}]),vertexShader:jA.meshphong_vert,fragmentShader:jA.meshphong_frag},standard:{uniforms:ZI([pA.common,pA.envmap,pA.aomap,pA.lightmap,pA.emissivemap,pA.bumpmap,pA.normalmap,pA.displacementmap,pA.roughnessmap,pA.metalnessmap,pA.fog,pA.lights,{emissive:{value:new II(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jA.meshphysical_vert,fragmentShader:jA.meshphysical_frag},toon:{uniforms:ZI([pA.common,pA.aomap,pA.lightmap,pA.emissivemap,pA.bumpmap,pA.normalmap,pA.displacementmap,pA.gradientmap,pA.fog,pA.lights,{emissive:{value:new II(0)}}]),vertexShader:jA.meshtoon_vert,fragmentShader:jA.meshtoon_frag},matcap:{uniforms:ZI([pA.common,pA.bumpmap,pA.normalmap,pA.displacementmap,pA.fog,{matcap:{value:null}}]),vertexShader:jA.meshmatcap_vert,fragmentShader:jA.meshmatcap_frag},points:{uniforms:ZI([pA.points,pA.fog]),vertexShader:jA.points_vert,fragmentShader:jA.points_frag},dashed:{uniforms:ZI([pA.common,pA.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jA.linedashed_vert,fragmentShader:jA.linedashed_frag},depth:{uniforms:ZI([pA.common,pA.displacementmap]),vertexShader:jA.depth_vert,fragmentShader:jA.depth_frag},normal:{uniforms:ZI([pA.common,pA.bumpmap,pA.normalmap,pA.displacementmap,{opacity:{value:1}}]),vertexShader:jA.meshnormal_vert,fragmentShader:jA.meshnormal_frag},sprite:{uniforms:ZI([pA.sprite,pA.fog]),vertexShader:jA.sprite_vert,fragmentShader:jA.sprite_frag},background:{uniforms:{uvTransform:{value:new Cg},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jA.background_vert,fragmentShader:jA.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:jA.backgroundCube_vert,fragmentShader:jA.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jA.cube_vert,fragmentShader:jA.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jA.equirect_vert,fragmentShader:jA.equirect_frag},distanceRGBA:{uniforms:ZI([pA.common,pA.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jA.distanceRGBA_vert,fragmentShader:jA.distanceRGBA_frag},shadow:{uniforms:ZI([pA.lights,pA.fog,{color:{value:new II(0)},opacity:{value:1}}]),vertexShader:jA.shadow_vert,fragmentShader:jA.shadow_frag}};Hg.physical={uniforms:ZI([Hg.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new gI(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new II(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new gI},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new II(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new II(1,1,1)},specularColorMap:{value:null}}]),vertexShader:jA.meshphysical_vert,fragmentShader:jA.meshphysical_frag};const Ci={r:0,b:0,g:0};function rw(E,A,I,g,C,B,i){const Q=new II(0);let o=B===!0?0:1,e,t,a=null,s=0,n=null;function h(r,G){let w=!1,S=G.isScene===!0?G.background:null;S&&S.isTexture&&(S=(G.backgroundBlurriness>0?I:A).get(S));const y=E.xr,M=y.getSession&&y.getSession();M&&M.environmentBlendMode==="additive"&&(S=null),S===null?D(Q,o):S&&S.isColor&&(D(S,1),w=!0),(E.autoClear||w)&&E.clear(E.autoClearColor,E.autoClearDepth,E.autoClearStencil),S&&(S.isCubeTexture||S.mapping===xi)?(t===void 0&&(t=new cg(new kQ(1,1,1),new LC({name:"BackgroundCubeMaterial",uniforms:yB(Hg.backgroundCube.uniforms),vertexShader:Hg.backgroundCube.vertexShader,fragmentShader:Hg.backgroundCube.fragmentShader,side:ag,depthTest:!1,depthWrite:!1,fog:!1})),t.geometry.deleteAttribute("normal"),t.geometry.deleteAttribute("uv"),t.onBeforeRender=function(p,U,l){this.matrixWorld.copyPosition(l.matrixWorld)},Object.defineProperty(t.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),C.update(t)),t.material.uniforms.envMap.value=S,t.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,t.material.uniforms.backgroundBlurriness.value=G.backgroundBlurriness,t.material.uniforms.backgroundIntensity.value=G.backgroundIntensity,t.material.toneMapped=S.encoding!==GI,(a!==S||s!==S.version||n!==E.toneMapping)&&(t.material.needsUpdate=!0,a=S,s=S.version,n=E.toneMapping),t.layers.enableAll(),r.unshift(t,t.geometry,t.material,0,0,null)):S&&S.isTexture&&(e===void 0&&(e=new cg(new HC(2,2),new LC({name:"BackgroundMaterial",uniforms:yB(Hg.background.uniforms),vertexShader:Hg.background.vertexShader,fragmentShader:Hg.background.fragmentShader,side:hC,depthTest:!1,depthWrite:!1,fog:!1})),e.geometry.deleteAttribute("normal"),Object.defineProperty(e.material,"map",{get:function(){return this.uniforms.t2D.value}}),C.update(e)),e.material.uniforms.t2D.value=S,e.material.uniforms.backgroundIntensity.value=G.backgroundIntensity,e.material.toneMapped=S.encoding!==GI,S.matrixAutoUpdate===!0&&S.updateMatrix(),e.material.uniforms.uvTransform.value.copy(S.matrix),(a!==S||s!==S.version||n!==E.toneMapping)&&(e.material.needsUpdate=!0,a=S,s=S.version,n=E.toneMapping),e.layers.enableAll(),r.unshift(e,e.geometry,e.material,0,0,null))}function D(r,G){r.getRGB(Ci,va(E)),g.buffers.color.setClear(Ci.r,Ci.g,Ci.b,G,i)}return{getClearColor:function(){return Q},setClearColor:function(r,G=1){Q.set(r),o=G,D(Q,o)},getClearAlpha:function(){return o},setClearAlpha:function(r){o=r,D(Q,o)},render:h}}function Dw(E,A,I,g){const C=E.getParameter(34921),B=g.isWebGL2?null:A.get("OES_vertex_array_object"),i=g.isWebGL2||B!==null,Q={},o=r(null);let e=o,t=!1;function a(K,H,j,EA,Z){let x=!1;if(i){const T=D(EA,j,H);e!==T&&(e=T,n(e.object)),x=G(K,EA,j,Z),x&&w(K,EA,j,Z)}else{const T=H.wireframe===!0;(e.geometry!==EA.id||e.program!==j.id||e.wireframe!==T)&&(e.geometry=EA.id,e.program=j.id,e.wireframe=T,x=!0)}Z!==null&&I.update(Z,34963),(x||t)&&(t=!1,l(K,H,j,EA),Z!==null&&E.bindBuffer(34963,I.get(Z).buffer))}function s(){return g.isWebGL2?E.createVertexArray():B.createVertexArrayOES()}function n(K){return g.isWebGL2?E.bindVertexArray(K):B.bindVertexArrayOES(K)}function h(K){return g.isWebGL2?E.deleteVertexArray(K):B.deleteVertexArrayOES(K)}function D(K,H,j){const EA=j.wireframe===!0;let Z=Q[K.id];Z===void 0&&(Z={},Q[K.id]=Z);let x=Z[H.id];x===void 0&&(x={},Z[H.id]=x);let T=x[EA];return T===void 0&&(T=r(s()),x[EA]=T),T}function r(K){const H=[],j=[],EA=[];for(let Z=0;Z<C;Z++)H[Z]=0,j[Z]=0,EA[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:j,attributeDivisors:EA,object:K,attributes:{},index:null}}function G(K,H,j,EA){const Z=e.attributes,x=H.attributes;let T=0;const F=j.getAttributes();for(const J in F)if(F[J].location>=0){const P=Z[J];let O=x[J];if(O===void 0&&(J==="instanceMatrix"&&K.instanceMatrix&&(O=K.instanceMatrix),J==="instanceColor"&&K.instanceColor&&(O=K.instanceColor)),P===void 0||P.attribute!==O||O&&P.data!==O.data)return!0;T++}return e.attributesNum!==T||e.index!==EA}function w(K,H,j,EA){const Z={},x=H.attributes;let T=0;const F=j.getAttributes();for(const J in F)if(F[J].location>=0){let P=x[J];P===void 0&&(J==="instanceMatrix"&&K.instanceMatrix&&(P=K.instanceMatrix),J==="instanceColor"&&K.instanceColor&&(P=K.instanceColor));const O={};O.attribute=P,P&&P.data&&(O.data=P.data),Z[J]=O,T++}e.attributes=Z,e.attributesNum=T,e.index=EA}function S(){const K=e.newAttributes;for(let H=0,j=K.length;H<j;H++)K[H]=0}function y(K){M(K,0)}function M(K,H){const j=e.newAttributes,EA=e.enabledAttributes,Z=e.attributeDivisors;j[K]=1,EA[K]===0&&(E.enableVertexAttribArray(K),EA[K]=1),Z[K]!==H&&((g.isWebGL2?E:A.get("ANGLE_instanced_arrays"))[g.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](K,H),Z[K]=H)}function p(){const K=e.newAttributes,H=e.enabledAttributes;for(let j=0,EA=H.length;j<EA;j++)H[j]!==K[j]&&(E.disableVertexAttribArray(j),H[j]=0)}function U(K,H,j,EA,Z,x){g.isWebGL2===!0&&(j===5124||j===5125)?E.vertexAttribIPointer(K,H,j,Z,x):E.vertexAttribPointer(K,H,j,EA,Z,x)}function l(K,H,j,EA){if(g.isWebGL2===!1&&(K.isInstancedMesh||EA.isInstancedBufferGeometry)&&A.get("ANGLE_instanced_arrays")===null)return;S();const Z=EA.attributes,x=j.getAttributes(),T=H.defaultAttributeValues;for(const F in x){const J=x[F];if(J.location>=0){let _=Z[F];if(_===void 0&&(F==="instanceMatrix"&&K.instanceMatrix&&(_=K.instanceMatrix),F==="instanceColor"&&K.instanceColor&&(_=K.instanceColor)),_!==void 0){const P=_.normalized,O=_.itemSize,m=I.get(_);if(m===void 0)continue;const QA=m.buffer,X=m.type,tA=m.bytesPerElement;if(_.isInterleavedBufferAttribute){const eA=_.data,hA=eA.stride,iA=_.offset;if(eA.isInstancedInterleavedBuffer){for(let MA=0;MA<J.locationSize;MA++)M(J.location+MA,eA.meshPerAttribute);K.isInstancedMesh!==!0&&EA._maxInstanceCount===void 0&&(EA._maxInstanceCount=eA.meshPerAttribute*eA.count)}else for(let MA=0;MA<J.locationSize;MA++)y(J.location+MA);E.bindBuffer(34962,QA);for(let MA=0;MA<J.locationSize;MA++)U(J.location+MA,O/J.locationSize,X,P,hA*tA,(iA+O/J.locationSize*MA)*tA)}else{if(_.isInstancedBufferAttribute){for(let eA=0;eA<J.locationSize;eA++)M(J.location+eA,_.meshPerAttribute);K.isInstancedMesh!==!0&&EA._maxInstanceCount===void 0&&(EA._maxInstanceCount=_.meshPerAttribute*_.count)}else for(let eA=0;eA<J.locationSize;eA++)y(J.location+eA);E.bindBuffer(34962,QA);for(let eA=0;eA<J.locationSize;eA++)U(J.location+eA,O/J.locationSize,X,P,O*tA,O/J.locationSize*eA*tA)}}else if(T!==void 0){const P=T[F];if(P!==void 0)switch(P.length){case 2:E.vertexAttrib2fv(J.location,P);break;case 3:E.vertexAttrib3fv(J.location,P);break;case 4:E.vertexAttrib4fv(J.location,P);break;default:E.vertexAttrib1fv(J.location,P)}}}}p()}function N(){q();for(const K in Q){const H=Q[K];for(const j in H){const EA=H[j];for(const Z in EA)h(EA[Z].object),delete EA[Z];delete H[j]}delete Q[K]}}function Y(K){if(Q[K.id]===void 0)return;const H=Q[K.id];for(const j in H){const EA=H[j];for(const Z in EA)h(EA[Z].object),delete EA[Z];delete H[j]}delete Q[K.id]}function z(K){for(const H in Q){const j=Q[H];if(j[K.id]===void 0)continue;const EA=j[K.id];for(const Z in EA)h(EA[Z].object),delete EA[Z];delete j[K.id]}}function q(){f(),t=!0,e!==o&&(e=o,n(e.object))}function f(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:a,reset:q,resetDefaultState:f,dispose:N,releaseStatesOfGeometry:Y,releaseStatesOfProgram:z,initAttributes:S,enableAttribute:y,disableUnusedAttributes:p}}function hw(E,A,I,g){const C=g.isWebGL2;let B;function i(e){B=e}function Q(e,t){E.drawArrays(B,e,t),I.update(t,B,1)}function o(e,t,a){if(a===0)return;let s,n;if(C)s=E,n="drawArraysInstanced";else if(s=A.get("ANGLE_instanced_arrays"),n="drawArraysInstancedANGLE",s===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}s[n](B,e,t,a),I.update(t,B,a)}this.setMode=i,this.render=Q,this.renderInstances=o}function cw(E,A,I){let g;function C(){if(g!==void 0)return g;if(A.has("EXT_texture_filter_anisotropic")===!0){const U=A.get("EXT_texture_filter_anisotropic");g=E.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else g=0;return g}function B(U){if(U==="highp"){if(E.getShaderPrecisionFormat(35633,36338).precision>0&&E.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";U="mediump"}return U==="mediump"&&E.getShaderPrecisionFormat(35633,36337).precision>0&&E.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const i=typeof WebGL2RenderingContext<"u"&&E instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&E instanceof WebGL2ComputeRenderingContext;let Q=I.precision!==void 0?I.precision:"highp";const o=B(Q);o!==Q&&(console.warn("THREE.WebGLRenderer:",Q,"not supported, using",o,"instead."),Q=o);const e=i||A.has("WEBGL_draw_buffers"),t=I.logarithmicDepthBuffer===!0,a=E.getParameter(34930),s=E.getParameter(35660),n=E.getParameter(3379),h=E.getParameter(34076),D=E.getParameter(34921),r=E.getParameter(36347),G=E.getParameter(36348),w=E.getParameter(36349),S=s>0,y=i||A.has("OES_texture_float"),M=S&&y,p=i?E.getParameter(36183):0;return{isWebGL2:i,drawBuffers:e,getMaxAnisotropy:C,getMaxPrecision:B,precision:Q,logarithmicDepthBuffer:t,maxTextures:a,maxVertexTextures:s,maxTextureSize:n,maxCubemapSize:h,maxAttributes:D,maxVertexUniforms:r,maxVaryings:G,maxFragmentUniforms:w,vertexTextures:S,floatFragmentTextures:y,floatVertexTextures:M,maxSamples:p}}function lw(E){const A=this;let I=null,g=0,C=!1,B=!1;const i=new yC,Q=new Cg,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(a,s,n){const h=a.length!==0||s||g!==0||C;return C=s,I=t(a,n,0),g=a.length,h},this.beginShadows=function(){B=!0,t(null)},this.endShadows=function(){B=!1,e()},this.setState=function(a,s,n){const h=a.clippingPlanes,D=a.clipIntersection,r=a.clipShadows,G=E.get(a);if(!C||h===null||h.length===0||B&&!r)B?t(null):e();else{const w=B?0:g,S=w*4;let y=G.clippingState||null;o.value=y,y=t(h,s,S,n);for(let M=0;M!==S;++M)y[M]=I[M];G.clippingState=y,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=w}};function e(){o.value!==I&&(o.value=I,o.needsUpdate=g>0),A.numPlanes=g,A.numIntersection=0}function t(a,s,n,h){const D=a!==null?a.length:0;let r=null;if(D!==0){if(r=o.value,h!==!0||r===null){const G=n+D*4,w=s.matrixWorldInverse;Q.getNormalMatrix(w),(r===null||r.length<G)&&(r=new Float32Array(G));for(let S=0,y=n;S!==D;++S,y+=4)i.copy(a[S]).applyMatrix4(w,Q),i.normal.toArray(r,y),r[y+3]=i.constant}o.value=r,o.needsUpdate=!0}return A.numPlanes=D,A.numIntersection=0,r}}function ww(E){let A=new WeakMap;function I(i,Q){return Q===Bo?i.mapping=GB:Q===Qo&&(i.mapping=SB),i}function g(i){if(i&&i.isTexture&&i.isRenderTargetTexture===!1){const Q=i.mapping;if(Q===Bo||Q===Qo)if(A.has(i)){const o=A.get(i).texture;return I(o,i.mapping)}else{const o=i.image;if(o&&o.height>0){const e=new Jh(o.height/2);return e.fromEquirectangularTexture(E,i),A.set(i,e),i.addEventListener("dispose",C),I(e.texture,i.mapping)}else return null}}return i}function C(i){const Q=i.target;Q.removeEventListener("dispose",C);const o=A.get(Q);o!==void 0&&(A.delete(Q),o.dispose())}function B(){A=new WeakMap}return{get:g,dispose:B}}class Wa extends Ta{constructor(A=-1,I=1,g=1,C=-1,B=.1,i=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=A,this.right=I,this.top=g,this.bottom=C,this.near=B,this.far=i,this.updateProjectionMatrix()}copy(A,I){return super.copy(A,I),this.left=A.left,this.right=A.right,this.top=A.top,this.bottom=A.bottom,this.near=A.near,this.far=A.far,this.zoom=A.zoom,this.view=A.view===null?null:Object.assign({},A.view),this}setViewOffset(A,I,g,C,B,i){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=A,this.view.fullHeight=I,this.view.offsetX=g,this.view.offsetY=C,this.view.width=B,this.view.height=i,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const A=(this.right-this.left)/(2*this.zoom),I=(this.top-this.bottom)/(2*this.zoom),g=(this.right+this.left)/2,C=(this.top+this.bottom)/2;let B=g-A,i=g+A,Q=C+I,o=C-I;if(this.view!==null&&this.view.enabled){const e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;B+=e*this.view.offsetX,i=B+e*this.view.width,Q-=t*this.view.offsetY,o=Q-t*this.view.height}this.projectionMatrix.makeOrthographic(B,i,Q,o,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(A){const I=super.toJSON(A);return I.object.zoom=this.zoom,I.object.left=this.left,I.object.right=this.right,I.object.top=this.top,I.object.bottom=this.bottom,I.object.near=this.near,I.object.far=this.far,this.view!==null&&(I.object.view=Object.assign({},this.view)),I}}const aB=4,Et=[.125,.215,.35,.446,.526,.582],kC=20,HE=new Wa,ot=new II;let bE=null;const MC=(1+Math.sqrt(5))/2,oB=1/MC,et=[new V(1,1,1),new V(-1,1,1),new V(1,1,-1),new V(-1,1,-1),new V(0,MC,oB),new V(0,MC,-oB),new V(oB,0,MC),new V(-oB,0,MC),new V(MC,oB,0),new V(-MC,oB,0)];class tt{constructor(A){this._renderer=A,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(A,I=0,g=.1,C=100){bE=this._renderer.getRenderTarget(),this._setSize(256);const B=this._allocateTargets();return B.depthBuffer=!0,this._sceneToCubeUV(A,g,C,B),I>0&&this._blur(B,0,0,I),this._applyPMREM(B),this._cleanup(B),B}fromEquirectangular(A,I=null){return this._fromTexture(A,I)}fromCubemap(A,I=null){return this._fromTexture(A,I)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nt(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=st(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(A){this._lodMax=Math.floor(Math.log2(A)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let A=0;A<this._lodPlanes.length;A++)this._lodPlanes[A].dispose()}_cleanup(A){this._renderer.setRenderTarget(bE),A.scissorTest=!1,Bi(A,0,0,A.width,A.height)}_fromTexture(A,I){A.mapping===GB||A.mapping===SB?this._setSize(A.image.length===0?16:A.image[0].width||A.image[0].image.width):this._setSize(A.image.width/4),bE=this._renderer.getRenderTarget();const g=I||this._allocateTargets();return this._textureToCubeUV(A,g),this._applyPMREM(g),this._cleanup(g),g}_allocateTargets(){const A=3*Math.max(this._cubeSize,112),I=4*this._cubeSize,g={magFilter:gg,minFilter:gg,generateMipmaps:!1,type:sQ,format:Ng,encoding:YC,depthBuffer:!1},C=at(A,I,g);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==A){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=at(A,I,g);const{_lodMax:B}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gw(B)),this._blurMaterial=Sw(B,A,I)}return C}_compileMaterial(A){const I=new cg(this._lodPlanes[0],A);this._renderer.compile(I,HE)}_sceneToCubeUV(A,I,g,C){const Q=new hg(90,1,I,g),o=[1,-1,1,1,1,1],e=[1,1,1,-1,-1,-1],t=this._renderer,a=t.autoClear,s=t.toneMapping;t.getClearColor(ot),t.toneMapping=Zg,t.autoClear=!1;const n=new Ho({name:"PMREM.Background",side:ag,depthWrite:!1,depthTest:!1}),h=new cg(new kQ,n);let D=!1;const r=A.background;r?r.isColor&&(n.color.copy(r),A.background=null,D=!0):(n.color.copy(ot),D=!0);for(let G=0;G<6;G++){const w=G%3;w===0?(Q.up.set(0,o[G],0),Q.lookAt(e[G],0,0)):w===1?(Q.up.set(0,0,o[G]),Q.lookAt(0,e[G],0)):(Q.up.set(0,o[G],0),Q.lookAt(0,0,e[G]));const S=this._cubeSize;Bi(C,w*S,G>2?S:0,S,S),t.setRenderTarget(C),D&&t.render(h,Q),t.render(A,Q)}h.geometry.dispose(),h.material.dispose(),t.toneMapping=s,t.autoClear=a,A.background=r}_textureToCubeUV(A,I){const g=this._renderer,C=A.mapping===GB||A.mapping===SB;C?(this._cubemapMaterial===null&&(this._cubemapMaterial=nt()),this._cubemapMaterial.uniforms.flipEnvMap.value=A.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=st());const B=C?this._cubemapMaterial:this._equirectMaterial,i=new cg(this._lodPlanes[0],B),Q=B.uniforms;Q.envMap.value=A;const o=this._cubeSize;Bi(I,0,0,3*o,2*o),g.setRenderTarget(I),g.render(i,HE)}_applyPMREM(A){const I=this._renderer,g=I.autoClear;I.autoClear=!1;for(let C=1;C<this._lodPlanes.length;C++){const B=Math.sqrt(this._sigmas[C]*this._sigmas[C]-this._sigmas[C-1]*this._sigmas[C-1]),i=et[(C-1)%et.length];this._blur(A,C-1,C,B,i)}I.autoClear=g}_blur(A,I,g,C,B){const i=this._pingPongRenderTarget;this._halfBlur(A,i,I,g,C,"latitudinal",B),this._halfBlur(i,A,g,g,C,"longitudinal",B)}_halfBlur(A,I,g,C,B,i,Q){const o=this._renderer,e=this._blurMaterial;i!=="latitudinal"&&i!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const t=3,a=new cg(this._lodPlanes[C],e),s=e.uniforms,n=this._sizeLods[g]-1,h=isFinite(B)?Math.PI/(2*n):2*Math.PI/(2*kC-1),D=B/h,r=isFinite(B)?1+Math.floor(t*D):kC;r>kC&&console.warn(`sigmaRadians, ${B}, is too large and will clip, as it requested ${r} samples when the maximum is set to ${kC}`);const G=[];let w=0;for(let U=0;U<kC;++U){const l=U/D,N=Math.exp(-l*l/2);G.push(N),U===0?w+=N:U<r&&(w+=2*N)}for(let U=0;U<G.length;U++)G[U]=G[U]/w;s.envMap.value=A.texture,s.samples.value=r,s.weights.value=G,s.latitudinal.value=i==="latitudinal",Q&&(s.poleAxis.value=Q);const{_lodMax:S}=this;s.dTheta.value=h,s.mipInt.value=S-g;const y=this._sizeLods[C],M=3*y*(C>S-aB?C-S+aB:0),p=4*(this._cubeSize-y);Bi(I,M,p,3*y,2*y),o.setRenderTarget(I),o.render(a,HE)}}function Gw(E){const A=[],I=[],g=[];let C=E;const B=E-aB+1+Et.length;for(let i=0;i<B;i++){const Q=Math.pow(2,C);I.push(Q);let o=1/Q;i>E-aB?o=Et[i-E+aB-1]:i===0&&(o=0),g.push(o);const e=1/(Q-2),t=-e,a=1+e,s=[t,t,a,t,a,a,t,t,a,a,t,a],n=6,h=6,D=3,r=2,G=1,w=new Float32Array(D*h*n),S=new Float32Array(r*h*n),y=new Float32Array(G*h*n);for(let p=0;p<n;p++){const U=p%3*2/3-1,l=p>2?0:-1,N=[U,l,0,U+2/3,l,0,U+2/3,l+1,0,U,l,0,U+2/3,l+1,0,U,l+1,0];w.set(N,D*h*p),S.set(s,r*h*p);const Y=[p,p,p,p,p,p];y.set(Y,G*h*p)}const M=new AC;M.setAttribute("position",new Kg(w,D)),M.setAttribute("uv",new Kg(S,r)),M.setAttribute("faceIndex",new Kg(y,G)),A.push(M),C>aB&&C--}return{lodPlanes:A,sizeLods:I,sigmas:g}}function at(E,A,I){const g=new mC(E,A,I);return g.texture.mapping=xi,g.texture.name="PMREM.cubeUv",g.scissorTest=!0,g}function Bi(E,A,I,g,C){E.viewport.set(A,I,g,C),E.scissor.set(A,I,g,C)}function Sw(E,A,I){const g=new Float32Array(kC),C=new V(0,1,0);return new LC({name:"SphericalGaussianBlur",defines:{n:kC,CUBEUV_TEXEL_WIDTH:1/A,CUBEUV_TEXEL_HEIGHT:1/I,CUBEUV_MAX_MIP:`${E}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:g},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:C}},vertexShader:vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:aC,depthTest:!1,depthWrite:!1})}function st(){return new LC({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:aC,depthTest:!1,depthWrite:!1})}function nt(){return new LC({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:aC,depthTest:!1,depthWrite:!1})}function vo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dw(E){let A=new WeakMap,I=null;function g(Q){if(Q&&Q.isTexture){const o=Q.mapping,e=o===Bo||o===Qo,t=o===GB||o===SB;if(e||t)if(Q.isRenderTargetTexture&&Q.needsPMREMUpdate===!0){Q.needsPMREMUpdate=!1;let a=A.get(Q);return I===null&&(I=new tt(E)),a=e?I.fromEquirectangular(Q,a):I.fromCubemap(Q,a),A.set(Q,a),a.texture}else{if(A.has(Q))return A.get(Q).texture;{const a=Q.image;if(e&&a&&a.height>0||t&&a&&C(a)){I===null&&(I=new tt(E));const s=e?I.fromEquirectangular(Q):I.fromCubemap(Q);return A.set(Q,s),Q.addEventListener("dispose",B),s.texture}else return null}}}return Q}function C(Q){let o=0;const e=6;for(let t=0;t<e;t++)Q[t]!==void 0&&o++;return o===e}function B(Q){const o=Q.target;o.removeEventListener("dispose",B);const e=A.get(o);e!==void 0&&(A.delete(o),e.dispose())}function i(){A=new WeakMap,I!==null&&(I.dispose(),I=null)}return{get:g,dispose:i}}function yw(E){const A={};function I(g){if(A[g]!==void 0)return A[g];let C;switch(g){case"WEBGL_depth_texture":C=E.getExtension("WEBGL_depth_texture")||E.getExtension("MOZ_WEBGL_depth_texture")||E.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":C=E.getExtension("EXT_texture_filter_anisotropic")||E.getExtension("MOZ_EXT_texture_filter_anisotropic")||E.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":C=E.getExtension("WEBGL_compressed_texture_s3tc")||E.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||E.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":C=E.getExtension("WEBGL_compressed_texture_pvrtc")||E.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:C=E.getExtension(g)}return A[g]=C,C}return{has:function(g){return I(g)!==null},init:function(g){g.isWebGL2?I("EXT_color_buffer_float"):(I("WEBGL_depth_texture"),I("OES_texture_float"),I("OES_texture_half_float"),I("OES_texture_half_float_linear"),I("OES_standard_derivatives"),I("OES_element_index_uint"),I("OES_vertex_array_object"),I("ANGLE_instanced_arrays")),I("OES_texture_float_linear"),I("EXT_color_buffer_half_float"),I("WEBGL_multisampled_render_to_texture")},get:function(g){const C=I(g);return C===null&&console.warn("THREE.WebGLRenderer: "+g+" extension not supported."),C}}}function Mw(E,A,I,g){const C={},B=new WeakMap;function i(a){const s=a.target;s.index!==null&&A.remove(s.index);for(const h in s.attributes)A.remove(s.attributes[h]);s.removeEventListener("dispose",i),delete C[s.id];const n=B.get(s);n&&(A.remove(n),B.delete(s)),g.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,I.memory.geometries--}function Q(a,s){return C[s.id]===!0||(s.addEventListener("dispose",i),C[s.id]=!0,I.memory.geometries++),s}function o(a){const s=a.attributes;for(const h in s)A.update(s[h],34962);const n=a.morphAttributes;for(const h in n){const D=n[h];for(let r=0,G=D.length;r<G;r++)A.update(D[r],34962)}}function e(a){const s=[],n=a.index,h=a.attributes.position;let D=0;if(n!==null){const w=n.array;D=n.version;for(let S=0,y=w.length;S<y;S+=3){const M=w[S+0],p=w[S+1],U=w[S+2];s.push(M,p,p,U,U,M)}}else{const w=h.array;D=h.version;for(let S=0,y=w.length/3-1;S<y;S+=3){const M=S+0,p=S+1,U=S+2;s.push(M,p,p,U,U,M)}}const r=new(ua(s)?ba:Ha)(s,1);r.version=D;const G=B.get(a);G&&A.remove(G),B.set(a,r)}function t(a){const s=B.get(a);if(s){const n=a.index;n!==null&&s.version<n.version&&e(a)}else e(a);return B.get(a)}return{get:Q,update:o,getWireframeAttribute:t}}function kw(E,A,I,g){const C=g.isWebGL2;let B;function i(s){B=s}let Q,o;function e(s){Q=s.type,o=s.bytesPerElement}function t(s,n){E.drawElements(B,n,Q,s*o),I.update(n,B,1)}function a(s,n,h){if(h===0)return;let D,r;if(C)D=E,r="drawElementsInstanced";else if(D=A.get("ANGLE_instanced_arrays"),r="drawElementsInstancedANGLE",D===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}D[r](B,n,Q,s*o,h),I.update(n,B,h)}this.setMode=i,this.setIndex=e,this.render=t,this.renderInstances=a}function Rw(E){const A={geometries:0,textures:0},I={frame:0,calls:0,triangles:0,points:0,lines:0};function g(B,i,Q){switch(I.calls++,i){case 4:I.triangles+=Q*(B/3);break;case 1:I.lines+=Q*(B/2);break;case 3:I.lines+=Q*(B-1);break;case 2:I.lines+=Q*B;break;case 0:I.points+=Q*B;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",i);break}}function C(){I.frame++,I.calls=0,I.triangles=0,I.points=0,I.lines=0}return{memory:A,render:I,programs:null,autoReset:!0,reset:C,update:g}}function Fw(E,A){return E[0]-A[0]}function pw(E,A){return Math.abs(A[1])-Math.abs(E[1])}function Nw(E,A,I){const g={},C=new Float32Array(8),B=new WeakMap,i=new wI,Q=[];for(let e=0;e<8;e++)Q[e]=[e,0];function o(e,t,a,s){const n=e.morphTargetInfluences;if(A.isWebGL2===!0){const h=t.morphAttributes.position||t.morphAttributes.normal||t.morphAttributes.color,D=h!==void 0?h.length:0;let r=B.get(t);if(r===void 0||r.count!==D){let H=function(){f.dispose(),B.delete(t),t.removeEventListener("dispose",H)};r!==void 0&&r.texture.dispose();const S=t.morphAttributes.position!==void 0,y=t.morphAttributes.normal!==void 0,M=t.morphAttributes.color!==void 0,p=t.morphAttributes.position||[],U=t.morphAttributes.normal||[],l=t.morphAttributes.color||[];let N=0;S===!0&&(N=1),y===!0&&(N=2),M===!0&&(N=3);let Y=t.attributes.position.count*N,z=1;Y>A.maxTextureSize&&(z=Math.ceil(Y/A.maxTextureSize),Y=A.maxTextureSize);const q=new Float32Array(Y*z*4*D),f=new ma(q,Y,z,D);f.type=pC,f.needsUpdate=!0;const K=N*4;for(let j=0;j<D;j++){const EA=p[j],Z=U[j],x=l[j],T=Y*z*4*j;for(let F=0;F<EA.count;F++){const J=F*K;S===!0&&(i.fromBufferAttribute(EA,F),q[T+J+0]=i.x,q[T+J+1]=i.y,q[T+J+2]=i.z,q[T+J+3]=0),y===!0&&(i.fromBufferAttribute(Z,F),q[T+J+4]=i.x,q[T+J+5]=i.y,q[T+J+6]=i.z,q[T+J+7]=0),M===!0&&(i.fromBufferAttribute(x,F),q[T+J+8]=i.x,q[T+J+9]=i.y,q[T+J+10]=i.z,q[T+J+11]=x.itemSize===4?i.w:1)}}r={count:D,texture:f,size:new gI(Y,z)},B.set(t,r),t.addEventListener("dispose",H)}let G=0;for(let S=0;S<n.length;S++)G+=n[S];const w=t.morphTargetsRelative?1:1-G;s.getUniforms().setValue(E,"morphTargetBaseInfluence",w),s.getUniforms().setValue(E,"morphTargetInfluences",n),s.getUniforms().setValue(E,"morphTargetsTexture",r.texture,I),s.getUniforms().setValue(E,"morphTargetsTextureSize",r.size)}else{const h=n===void 0?0:n.length;let D=g[t.id];if(D===void 0||D.length!==h){D=[];for(let y=0;y<h;y++)D[y]=[y,0];g[t.id]=D}for(let y=0;y<h;y++){const M=D[y];M[0]=y,M[1]=n[y]}D.sort(pw);for(let y=0;y<8;y++)y<h&&D[y][1]?(Q[y][0]=D[y][0],Q[y][1]=D[y][1]):(Q[y][0]=Number.MAX_SAFE_INTEGER,Q[y][1]=0);Q.sort(Fw);const r=t.morphAttributes.position,G=t.morphAttributes.normal;let w=0;for(let y=0;y<8;y++){const M=Q[y],p=M[0],U=M[1];p!==Number.MAX_SAFE_INTEGER&&U?(r&&t.getAttribute("morphTarget"+y)!==r[p]&&t.setAttribute("morphTarget"+y,r[p]),G&&t.getAttribute("morphNormal"+y)!==G[p]&&t.setAttribute("morphNormal"+y,G[p]),C[y]=U,w+=U):(r&&t.hasAttribute("morphTarget"+y)===!0&&t.deleteAttribute("morphTarget"+y),G&&t.hasAttribute("morphNormal"+y)===!0&&t.deleteAttribute("morphNormal"+y),C[y]=0)}const S=t.morphTargetsRelative?1:1-w;s.getUniforms().setValue(E,"morphTargetBaseInfluence",S),s.getUniforms().setValue(E,"morphTargetInfluences",C)}}return{update:o}}function Uw(E,A,I,g){let C=new WeakMap;function B(o){const e=g.render.frame,t=o.geometry,a=A.get(o,t);return C.get(a)!==e&&(A.update(a),C.set(a,e)),o.isInstancedMesh&&(o.hasEventListener("dispose",Q)===!1&&o.addEventListener("dispose",Q),I.update(o.instanceMatrix,34962),o.instanceColor!==null&&I.update(o.instanceColor,34962)),a}function i(){C=new WeakMap}function Q(o){const e=o.target;e.removeEventListener("dispose",Q),I.remove(e.instanceMatrix),e.instanceColor!==null&&I.remove(e.instanceColor)}return{update:B,dispose:i}}const ja=new XI,_a=new ma,Va=new ch,Za=new Oa,rt=[],Dt=[],ht=new Float32Array(16),ct=new Float32Array(9),lt=new Float32Array(4);function NB(E,A,I){const g=E[0];if(g<=0||g>0)return E;const C=A*I;let B=rt[C];if(B===void 0&&(B=new Float32Array(C),rt[C]=B),A!==0){g.toArray(B,0);for(let i=1,Q=0;i!==A;++i)Q+=I,E[i].toArray(B,Q)}return B}function fI(E,A){if(E.length!==A.length)return!1;for(let I=0,g=E.length;I<g;I++)if(E[I]!==A[I])return!1;return!0}function qI(E,A){for(let I=0,g=A.length;I<g;I++)E[I]=A[I]}function Oi(E,A){let I=Dt[A];I===void 0&&(I=new Int32Array(A),Dt[A]=I);for(let g=0;g!==A;++g)I[g]=E.allocateTextureUnit();return I}function Kw(E,A){const I=this.cache;I[0]!==A&&(E.uniform1f(this.addr,A),I[0]=A)}function Jw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y)&&(E.uniform2f(this.addr,A.x,A.y),I[0]=A.x,I[1]=A.y);else{if(fI(I,A))return;E.uniform2fv(this.addr,A),qI(I,A)}}function uw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z)&&(E.uniform3f(this.addr,A.x,A.y,A.z),I[0]=A.x,I[1]=A.y,I[2]=A.z);else if(A.r!==void 0)(I[0]!==A.r||I[1]!==A.g||I[2]!==A.b)&&(E.uniform3f(this.addr,A.r,A.g,A.b),I[0]=A.r,I[1]=A.g,I[2]=A.b);else{if(fI(I,A))return;E.uniform3fv(this.addr,A),qI(I,A)}}function fw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z||I[3]!==A.w)&&(E.uniform4f(this.addr,A.x,A.y,A.z,A.w),I[0]=A.x,I[1]=A.y,I[2]=A.z,I[3]=A.w);else{if(fI(I,A))return;E.uniform4fv(this.addr,A),qI(I,A)}}function qw(E,A){const I=this.cache,g=A.elements;if(g===void 0){if(fI(I,A))return;E.uniformMatrix2fv(this.addr,!1,A),qI(I,A)}else{if(fI(I,g))return;lt.set(g),E.uniformMatrix2fv(this.addr,!1,lt),qI(I,g)}}function Yw(E,A){const I=this.cache,g=A.elements;if(g===void 0){if(fI(I,A))return;E.uniformMatrix3fv(this.addr,!1,A),qI(I,A)}else{if(fI(I,g))return;ct.set(g),E.uniformMatrix3fv(this.addr,!1,ct),qI(I,g)}}function mw(E,A){const I=this.cache,g=A.elements;if(g===void 0){if(fI(I,A))return;E.uniformMatrix4fv(this.addr,!1,A),qI(I,A)}else{if(fI(I,g))return;ht.set(g),E.uniformMatrix4fv(this.addr,!1,ht),qI(I,g)}}function Lw(E,A){const I=this.cache;I[0]!==A&&(E.uniform1i(this.addr,A),I[0]=A)}function Hw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y)&&(E.uniform2i(this.addr,A.x,A.y),I[0]=A.x,I[1]=A.y);else{if(fI(I,A))return;E.uniform2iv(this.addr,A),qI(I,A)}}function bw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z)&&(E.uniform3i(this.addr,A.x,A.y,A.z),I[0]=A.x,I[1]=A.y,I[2]=A.z);else{if(fI(I,A))return;E.uniform3iv(this.addr,A),qI(I,A)}}function vw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z||I[3]!==A.w)&&(E.uniform4i(this.addr,A.x,A.y,A.z,A.w),I[0]=A.x,I[1]=A.y,I[2]=A.z,I[3]=A.w);else{if(fI(I,A))return;E.uniform4iv(this.addr,A),qI(I,A)}}function xw(E,A){const I=this.cache;I[0]!==A&&(E.uniform1ui(this.addr,A),I[0]=A)}function Tw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y)&&(E.uniform2ui(this.addr,A.x,A.y),I[0]=A.x,I[1]=A.y);else{if(fI(I,A))return;E.uniform2uiv(this.addr,A),qI(I,A)}}function Ow(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z)&&(E.uniform3ui(this.addr,A.x,A.y,A.z),I[0]=A.x,I[1]=A.y,I[2]=A.z);else{if(fI(I,A))return;E.uniform3uiv(this.addr,A),qI(I,A)}}function Pw(E,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z||I[3]!==A.w)&&(E.uniform4ui(this.addr,A.x,A.y,A.z,A.w),I[0]=A.x,I[1]=A.y,I[2]=A.z,I[3]=A.w);else{if(fI(I,A))return;E.uniform4uiv(this.addr,A),qI(I,A)}}function Ww(E,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(E.uniform1i(this.addr,C),g[0]=C),I.setTexture2D(A||ja,C)}function jw(E,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(E.uniform1i(this.addr,C),g[0]=C),I.setTexture3D(A||Va,C)}function _w(E,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(E.uniform1i(this.addr,C),g[0]=C),I.setTextureCube(A||Za,C)}function Vw(E,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(E.uniform1i(this.addr,C),g[0]=C),I.setTexture2DArray(A||_a,C)}function Zw(E){switch(E){case 5126:return Kw;case 35664:return Jw;case 35665:return uw;case 35666:return fw;case 35674:return qw;case 35675:return Yw;case 35676:return mw;case 5124:case 35670:return Lw;case 35667:case 35671:return Hw;case 35668:case 35672:return bw;case 35669:case 35673:return vw;case 5125:return xw;case 36294:return Tw;case 36295:return Ow;case 36296:return Pw;case 35678:case 36198:case 36298:case 36306:case 35682:return Ww;case 35679:case 36299:case 36307:return jw;case 35680:case 36300:case 36308:case 36293:return _w;case 36289:case 36303:case 36311:case 36292:return Vw}}function zw(E,A){E.uniform1fv(this.addr,A)}function Xw(E,A){const I=NB(A,this.size,2);E.uniform2fv(this.addr,I)}function $w(E,A){const I=NB(A,this.size,3);E.uniform3fv(this.addr,I)}function AG(E,A){const I=NB(A,this.size,4);E.uniform4fv(this.addr,I)}function IG(E,A){const I=NB(A,this.size,4);E.uniformMatrix2fv(this.addr,!1,I)}function gG(E,A){const I=NB(A,this.size,9);E.uniformMatrix3fv(this.addr,!1,I)}function CG(E,A){const I=NB(A,this.size,16);E.uniformMatrix4fv(this.addr,!1,I)}function BG(E,A){E.uniform1iv(this.addr,A)}function QG(E,A){E.uniform2iv(this.addr,A)}function iG(E,A){E.uniform3iv(this.addr,A)}function EG(E,A){E.uniform4iv(this.addr,A)}function oG(E,A){E.uniform1uiv(this.addr,A)}function eG(E,A){E.uniform2uiv(this.addr,A)}function tG(E,A){E.uniform3uiv(this.addr,A)}function aG(E,A){E.uniform4uiv(this.addr,A)}function sG(E,A,I){const g=this.cache,C=A.length,B=Oi(I,C);fI(g,B)||(E.uniform1iv(this.addr,B),qI(g,B));for(let i=0;i!==C;++i)I.setTexture2D(A[i]||ja,B[i])}function nG(E,A,I){const g=this.cache,C=A.length,B=Oi(I,C);fI(g,B)||(E.uniform1iv(this.addr,B),qI(g,B));for(let i=0;i!==C;++i)I.setTexture3D(A[i]||Va,B[i])}function rG(E,A,I){const g=this.cache,C=A.length,B=Oi(I,C);fI(g,B)||(E.uniform1iv(this.addr,B),qI(g,B));for(let i=0;i!==C;++i)I.setTextureCube(A[i]||Za,B[i])}function DG(E,A,I){const g=this.cache,C=A.length,B=Oi(I,C);fI(g,B)||(E.uniform1iv(this.addr,B),qI(g,B));for(let i=0;i!==C;++i)I.setTexture2DArray(A[i]||_a,B[i])}function hG(E){switch(E){case 5126:return zw;case 35664:return Xw;case 35665:return $w;case 35666:return AG;case 35674:return IG;case 35675:return gG;case 35676:return CG;case 5124:case 35670:return BG;case 35667:case 35671:return QG;case 35668:case 35672:return iG;case 35669:case 35673:return EG;case 5125:return oG;case 36294:return eG;case 36295:return tG;case 36296:return aG;case 35678:case 36198:case 36298:case 36306:case 35682:return sG;case 35679:case 36299:case 36307:return nG;case 35680:case 36300:case 36308:case 36293:return rG;case 36289:case 36303:case 36311:case 36292:return DG}}class cG{constructor(A,I,g){this.id=A,this.addr=g,this.cache=[],this.setValue=Zw(I.type)}}class lG{constructor(A,I,g){this.id=A,this.addr=g,this.cache=[],this.size=I.size,this.setValue=hG(I.type)}}class wG{constructor(A){this.id=A,this.seq=[],this.map={}}setValue(A,I,g){const C=this.seq;for(let B=0,i=C.length;B!==i;++B){const Q=C[B];Q.setValue(A,I[Q.id],g)}}}const vE=/(\w+)(\])?(\[|\.)?/g;function wt(E,A){E.seq.push(A),E.map[A.id]=A}function GG(E,A,I){const g=E.name,C=g.length;for(vE.lastIndex=0;;){const B=vE.exec(g),i=vE.lastIndex;let Q=B[1];const o=B[2]==="]",e=B[3];if(o&&(Q=Q|0),e===void 0||e==="["&&i+2===C){wt(I,e===void 0?new cG(Q,E,A):new lG(Q,E,A));break}else{let a=I.map[Q];a===void 0&&(a=new wG(Q),wt(I,a)),I=a}}}class ri{constructor(A,I){this.seq=[],this.map={};const g=A.getProgramParameter(I,35718);for(let C=0;C<g;++C){const B=A.getActiveUniform(I,C),i=A.getUniformLocation(I,B.name);GG(B,i,this)}}setValue(A,I,g,C){const B=this.map[I];B!==void 0&&B.setValue(A,g,C)}setOptional(A,I,g){const C=I[g];C!==void 0&&this.setValue(A,g,C)}static upload(A,I,g,C){for(let B=0,i=I.length;B!==i;++B){const Q=I[B],o=g[Q.id];o.needsUpdate!==!1&&Q.setValue(A,o.value,C)}}static seqWithValue(A,I){const g=[];for(let C=0,B=A.length;C!==B;++C){const i=A[C];i.id in I&&g.push(i)}return g}}function Gt(E,A,I){const g=E.createShader(A);return E.shaderSource(g,I),E.compileShader(g),g}let SG=0;function dG(E,A){const I=E.split(`
`),g=[],C=Math.max(A-6,0),B=Math.min(A+6,I.length);for(let i=C;i<B;i++){const Q=i+1;g.push(`${Q===A?">":" "} ${Q}: ${I[i]}`)}return g.join(`
`)}function yG(E){switch(E){case YC:return["Linear","( value )"];case GI:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",E),["Linear","( value )"]}}function St(E,A,I){const g=E.getShaderParameter(A,35713),C=E.getShaderInfoLog(A).trim();if(g&&C==="")return"";const B=/ERROR: 0:(\d+)/.exec(C);if(B){const i=parseInt(B[1]);return I.toUpperCase()+`

`+C+`

`+dG(E.getShaderSource(A),i)}else return C}function MG(E,A){const I=yG(A);return"vec4 "+E+"( vec4 value ) { return LinearTo"+I[0]+I[1]+"; }"}function kG(E,A){let I;switch(A){case P0:I="Linear";break;case W0:I="Reinhard";break;case j0:I="OptimizedCineon";break;case _0:I="ACESFilmic";break;case V0:I="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",A),I="Linear"}return"vec3 "+E+"( vec3 color ) { return "+I+"ToneMapping( color ); }"}function RG(E){return[E.extensionDerivatives||!!E.envMapCubeUVHeight||E.bumpMap||E.tangentSpaceNormalMap||E.clearcoatNormalMap||E.flatShading||E.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(E.extensionFragDepth||E.logarithmicDepthBuffer)&&E.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",E.extensionDrawBuffers&&E.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(E.extensionShaderTextureLOD||E.envMap||E.transmission)&&E.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(XB).join(`
`)}function FG(E){const A=[];for(const I in E){const g=E[I];g!==!1&&A.push("#define "+I+" "+g)}return A.join(`
`)}function pG(E,A){const I={},g=E.getProgramParameter(A,35721);for(let C=0;C<g;C++){const B=E.getActiveAttrib(A,C),i=B.name;let Q=1;B.type===35674&&(Q=2),B.type===35675&&(Q=3),B.type===35676&&(Q=4),I[i]={type:B.type,location:E.getAttribLocation(A,i),locationSize:Q}}return I}function XB(E){return E!==""}function dt(E,A){const I=A.numSpotLightShadows+A.numSpotLightMaps-A.numSpotLightShadowsWithMaps;return E.replace(/NUM_DIR_LIGHTS/g,A.numDirLights).replace(/NUM_SPOT_LIGHTS/g,A.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,A.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,I).replace(/NUM_RECT_AREA_LIGHTS/g,A.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,A.numPointLights).replace(/NUM_HEMI_LIGHTS/g,A.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,A.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,A.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,A.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,A.numPointLightShadows)}function yt(E,A){return E.replace(/NUM_CLIPPING_PLANES/g,A.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,A.numClippingPlanes-A.numClipIntersection)}const NG=/^[ \t]*#include +<([\w\d./]+)>/gm;function eo(E){return E.replace(NG,UG)}function UG(E,A){const I=jA[A];if(I===void 0)throw new Error("Can not resolve #include <"+A+">");return eo(I)}const KG=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mt(E){return E.replace(KG,JG)}function JG(E,A,I,g){let C="";for(let B=parseInt(A);B<parseInt(I);B++)C+=g.replace(/\[\s*i\s*\]/g,"[ "+B+" ]").replace(/UNROLLED_LOOP_INDEX/g,B);return C}function kt(E){let A="precision "+E.precision+` float;
precision `+E.precision+" int;";return E.precision==="highp"?A+=`
#define HIGH_PRECISION`:E.precision==="mediump"?A+=`
#define MEDIUM_PRECISION`:E.precision==="lowp"&&(A+=`
#define LOW_PRECISION`),A}function uG(E){let A="SHADOWMAP_TYPE_BASIC";return E.shadowMapType===Ra?A="SHADOWMAP_TYPE_PCF":E.shadowMapType===y0?A="SHADOWMAP_TYPE_PCF_SOFT":E.shadowMapType===zB&&(A="SHADOWMAP_TYPE_VSM"),A}function fG(E){let A="ENVMAP_TYPE_CUBE";if(E.envMap)switch(E.envMapMode){case GB:case SB:A="ENVMAP_TYPE_CUBE";break;case xi:A="ENVMAP_TYPE_CUBE_UV";break}return A}function qG(E){let A="ENVMAP_MODE_REFLECTION";if(E.envMap)switch(E.envMapMode){case SB:A="ENVMAP_MODE_REFRACTION";break}return A}function YG(E){let A="ENVMAP_BLENDING_NONE";if(E.envMap)switch(E.combine){case mo:A="ENVMAP_BLENDING_MULTIPLY";break;case T0:A="ENVMAP_BLENDING_MIX";break;case O0:A="ENVMAP_BLENDING_ADD";break}return A}function mG(E){const A=E.envMapCubeUVHeight;if(A===null)return null;const I=Math.log2(A)-2,g=1/A;return{texelWidth:1/(3*Math.max(Math.pow(2,I),7*16)),texelHeight:g,maxMip:I}}function LG(E,A,I,g){const C=E.getContext(),B=I.defines;let i=I.vertexShader,Q=I.fragmentShader;const o=uG(I),e=fG(I),t=qG(I),a=YG(I),s=mG(I),n=I.isWebGL2?"":RG(I),h=FG(B),D=C.createProgram();let r,G,w=I.glslVersion?"#version "+I.glslVersion+`
`:"";I.isRawShaderMaterial?(r=[h].filter(XB).join(`
`),r.length>0&&(r+=`
`),G=[n,h].filter(XB).join(`
`),G.length>0&&(G+=`
`)):(r=[kt(I),"#define SHADER_NAME "+I.shaderName,h,I.instancing?"#define USE_INSTANCING":"",I.instancingColor?"#define USE_INSTANCING_COLOR":"",I.supportsVertexTextures?"#define VERTEX_TEXTURES":"",I.useFog&&I.fog?"#define USE_FOG":"",I.useFog&&I.fogExp2?"#define FOG_EXP2":"",I.map?"#define USE_MAP":"",I.envMap?"#define USE_ENVMAP":"",I.envMap?"#define "+t:"",I.lightMap?"#define USE_LIGHTMAP":"",I.aoMap?"#define USE_AOMAP":"",I.emissiveMap?"#define USE_EMISSIVEMAP":"",I.bumpMap?"#define USE_BUMPMAP":"",I.normalMap?"#define USE_NORMALMAP":"",I.normalMap&&I.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",I.normalMap&&I.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",I.clearcoatMap?"#define USE_CLEARCOATMAP":"",I.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",I.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",I.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",I.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",I.displacementMap&&I.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",I.specularMap?"#define USE_SPECULARMAP":"",I.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",I.specularColorMap?"#define USE_SPECULARCOLORMAP":"",I.roughnessMap?"#define USE_ROUGHNESSMAP":"",I.metalnessMap?"#define USE_METALNESSMAP":"",I.alphaMap?"#define USE_ALPHAMAP":"",I.transmission?"#define USE_TRANSMISSION":"",I.transmissionMap?"#define USE_TRANSMISSIONMAP":"",I.thicknessMap?"#define USE_THICKNESSMAP":"",I.sheenColorMap?"#define USE_SHEENCOLORMAP":"",I.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",I.vertexTangents?"#define USE_TANGENT":"",I.vertexColors?"#define USE_COLOR":"",I.vertexAlphas?"#define USE_COLOR_ALPHA":"",I.vertexUvs?"#define USE_UV":"",I.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",I.flatShading?"#define FLAT_SHADED":"",I.skinning?"#define USE_SKINNING":"",I.morphTargets?"#define USE_MORPHTARGETS":"",I.morphNormals&&I.flatShading===!1?"#define USE_MORPHNORMALS":"",I.morphColors&&I.isWebGL2?"#define USE_MORPHCOLORS":"",I.morphTargetsCount>0&&I.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",I.morphTargetsCount>0&&I.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+I.morphTextureStride:"",I.morphTargetsCount>0&&I.isWebGL2?"#define MORPHTARGETS_COUNT "+I.morphTargetsCount:"",I.doubleSided?"#define DOUBLE_SIDED":"",I.flipSided?"#define FLIP_SIDED":"",I.shadowMapEnabled?"#define USE_SHADOWMAP":"",I.shadowMapEnabled?"#define "+o:"",I.sizeAttenuation?"#define USE_SIZEATTENUATION":"",I.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",I.logarithmicDepthBuffer&&I.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(XB).join(`
`),G=[n,kt(I),"#define SHADER_NAME "+I.shaderName,h,I.useFog&&I.fog?"#define USE_FOG":"",I.useFog&&I.fogExp2?"#define FOG_EXP2":"",I.map?"#define USE_MAP":"",I.matcap?"#define USE_MATCAP":"",I.envMap?"#define USE_ENVMAP":"",I.envMap?"#define "+e:"",I.envMap?"#define "+t:"",I.envMap?"#define "+a:"",s?"#define CUBEUV_TEXEL_WIDTH "+s.texelWidth:"",s?"#define CUBEUV_TEXEL_HEIGHT "+s.texelHeight:"",s?"#define CUBEUV_MAX_MIP "+s.maxMip+".0":"",I.lightMap?"#define USE_LIGHTMAP":"",I.aoMap?"#define USE_AOMAP":"",I.emissiveMap?"#define USE_EMISSIVEMAP":"",I.bumpMap?"#define USE_BUMPMAP":"",I.normalMap?"#define USE_NORMALMAP":"",I.normalMap&&I.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",I.normalMap&&I.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",I.clearcoat?"#define USE_CLEARCOAT":"",I.clearcoatMap?"#define USE_CLEARCOATMAP":"",I.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",I.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",I.iridescence?"#define USE_IRIDESCENCE":"",I.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",I.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",I.specularMap?"#define USE_SPECULARMAP":"",I.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",I.specularColorMap?"#define USE_SPECULARCOLORMAP":"",I.roughnessMap?"#define USE_ROUGHNESSMAP":"",I.metalnessMap?"#define USE_METALNESSMAP":"",I.alphaMap?"#define USE_ALPHAMAP":"",I.alphaTest?"#define USE_ALPHATEST":"",I.sheen?"#define USE_SHEEN":"",I.sheenColorMap?"#define USE_SHEENCOLORMAP":"",I.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",I.transmission?"#define USE_TRANSMISSION":"",I.transmissionMap?"#define USE_TRANSMISSIONMAP":"",I.thicknessMap?"#define USE_THICKNESSMAP":"",I.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",I.vertexTangents?"#define USE_TANGENT":"",I.vertexColors||I.instancingColor?"#define USE_COLOR":"",I.vertexAlphas?"#define USE_COLOR_ALPHA":"",I.vertexUvs?"#define USE_UV":"",I.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",I.gradientMap?"#define USE_GRADIENTMAP":"",I.flatShading?"#define FLAT_SHADED":"",I.doubleSided?"#define DOUBLE_SIDED":"",I.flipSided?"#define FLIP_SIDED":"",I.shadowMapEnabled?"#define USE_SHADOWMAP":"",I.shadowMapEnabled?"#define "+o:"",I.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",I.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",I.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",I.logarithmicDepthBuffer&&I.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",I.toneMapping!==Zg?"#define TONE_MAPPING":"",I.toneMapping!==Zg?jA.tonemapping_pars_fragment:"",I.toneMapping!==Zg?kG("toneMapping",I.toneMapping):"",I.dithering?"#define DITHERING":"",I.opaque?"#define OPAQUE":"",jA.encodings_pars_fragment,MG("linearToOutputTexel",I.outputEncoding),I.useDepthPacking?"#define DEPTH_PACKING "+I.depthPacking:"",`
`].filter(XB).join(`
`)),i=eo(i),i=dt(i,I),i=yt(i,I),Q=eo(Q),Q=dt(Q,I),Q=yt(Q,I),i=Mt(i),Q=Mt(Q),I.isWebGL2&&I.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,r=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+r,G=["#define varying in",I.glslVersion===_e?"":"layout(location = 0) out highp vec4 pc_fragColor;",I.glslVersion===_e?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+G);const S=w+r+i,y=w+G+Q,M=Gt(C,35633,S),p=Gt(C,35632,y);if(C.attachShader(D,M),C.attachShader(D,p),I.index0AttributeName!==void 0?C.bindAttribLocation(D,0,I.index0AttributeName):I.morphTargets===!0&&C.bindAttribLocation(D,0,"position"),C.linkProgram(D),E.debug.checkShaderErrors){const N=C.getProgramInfoLog(D).trim(),Y=C.getShaderInfoLog(M).trim(),z=C.getShaderInfoLog(p).trim();let q=!0,f=!0;if(C.getProgramParameter(D,35714)===!1){q=!1;const K=St(C,M,"vertex"),H=St(C,p,"fragment");console.error("THREE.WebGLProgram: Shader Error "+C.getError()+" - VALIDATE_STATUS "+C.getProgramParameter(D,35715)+`

Program Info Log: `+N+`
`+K+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(Y===""||z==="")&&(f=!1);f&&(this.diagnostics={runnable:q,programLog:N,vertexShader:{log:Y,prefix:r},fragmentShader:{log:z,prefix:G}})}C.deleteShader(M),C.deleteShader(p);let U;this.getUniforms=function(){return U===void 0&&(U=new ri(C,D)),U};let l;return this.getAttributes=function(){return l===void 0&&(l=pG(C,D)),l},this.destroy=function(){g.releaseStatesOfProgram(this),C.deleteProgram(D),this.program=void 0},this.name=I.shaderName,this.id=SG++,this.cacheKey=A,this.usedTimes=1,this.program=D,this.vertexShader=M,this.fragmentShader=p,this}let HG=0;class bG{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(A){const I=A.vertexShader,g=A.fragmentShader,C=this._getShaderStage(I),B=this._getShaderStage(g),i=this._getShaderCacheForMaterial(A);return i.has(C)===!1&&(i.add(C),C.usedTimes++),i.has(B)===!1&&(i.add(B),B.usedTimes++),this}remove(A){const I=this.materialCache.get(A);for(const g of I)g.usedTimes--,g.usedTimes===0&&this.shaderCache.delete(g.code);return this.materialCache.delete(A),this}getVertexShaderID(A){return this._getShaderStage(A.vertexShader).id}getFragmentShaderID(A){return this._getShaderStage(A.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(A){const I=this.materialCache;let g=I.get(A);return g===void 0&&(g=new Set,I.set(A,g)),g}_getShaderStage(A){const I=this.shaderCache;let g=I.get(A);return g===void 0&&(g=new vG(A),I.set(A,g)),g}}class vG{constructor(A){this.id=HG++,this.code=A,this.usedTimes=0}}function xG(E,A,I,g,C,B,i){const Q=new Lo,o=new bG,e=[],t=C.isWebGL2,a=C.logarithmicDepthBuffer,s=C.vertexTextures;let n=C.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function D(l,N,Y,z,q){const f=z.fog,K=q.geometry,H=l.isMeshStandardMaterial?z.environment:null,j=(l.isMeshStandardMaterial?I:A).get(l.envMap||H),EA=!!j&&j.mapping===xi?j.image.height:null,Z=h[l.type];l.precision!==null&&(n=C.getMaxPrecision(l.precision),n!==l.precision&&console.warn("THREE.WebGLProgram.getParameters:",l.precision,"not supported, using",n,"instead."));const x=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,T=x!==void 0?x.length:0;let F=0;K.morphAttributes.position!==void 0&&(F=1),K.morphAttributes.normal!==void 0&&(F=2),K.morphAttributes.color!==void 0&&(F=3);let J,_,P,O;if(Z){const hA=Hg[Z];J=hA.vertexShader,_=hA.fragmentShader}else J=l.vertexShader,_=l.fragmentShader,o.update(l),P=o.getVertexShaderID(l),O=o.getFragmentShaderID(l);const m=E.getRenderTarget(),QA=l.alphaTest>0,X=l.clearcoat>0,tA=l.iridescence>0;return{isWebGL2:t,shaderID:Z,shaderName:l.type,vertexShader:J,fragmentShader:_,defines:l.defines,customVertexShaderID:P,customFragmentShaderID:O,isRawShaderMaterial:l.isRawShaderMaterial===!0,glslVersion:l.glslVersion,precision:n,instancing:q.isInstancedMesh===!0,instancingColor:q.isInstancedMesh===!0&&q.instanceColor!==null,supportsVertexTextures:s,outputEncoding:m===null?E.outputEncoding:m.isXRRenderTarget===!0?m.texture.encoding:YC,map:!!l.map,matcap:!!l.matcap,envMap:!!j,envMapMode:j&&j.mapping,envMapCubeUVHeight:EA,lightMap:!!l.lightMap,aoMap:!!l.aoMap,emissiveMap:!!l.emissiveMap,bumpMap:!!l.bumpMap,normalMap:!!l.normalMap,objectSpaceNormalMap:l.normalMapType===nh,tangentSpaceNormalMap:l.normalMapType===Ja,decodeVideoTexture:!!l.map&&l.map.isVideoTexture===!0&&l.map.encoding===GI,clearcoat:X,clearcoatMap:X&&!!l.clearcoatMap,clearcoatRoughnessMap:X&&!!l.clearcoatRoughnessMap,clearcoatNormalMap:X&&!!l.clearcoatNormalMap,iridescence:tA,iridescenceMap:tA&&!!l.iridescenceMap,iridescenceThicknessMap:tA&&!!l.iridescenceThicknessMap,displacementMap:!!l.displacementMap,roughnessMap:!!l.roughnessMap,metalnessMap:!!l.metalnessMap,specularMap:!!l.specularMap,specularIntensityMap:!!l.specularIntensityMap,specularColorMap:!!l.specularColorMap,opaque:l.transparent===!1&&l.blending===rB,alphaMap:!!l.alphaMap,alphaTest:QA,gradientMap:!!l.gradientMap,sheen:l.sheen>0,sheenColorMap:!!l.sheenColorMap,sheenRoughnessMap:!!l.sheenRoughnessMap,transmission:l.transmission>0,transmissionMap:!!l.transmissionMap,thicknessMap:!!l.thicknessMap,combine:l.combine,vertexTangents:!!l.normalMap&&!!K.attributes.tangent,vertexColors:l.vertexColors,vertexAlphas:l.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,vertexUvs:!!l.map||!!l.bumpMap||!!l.normalMap||!!l.specularMap||!!l.alphaMap||!!l.emissiveMap||!!l.roughnessMap||!!l.metalnessMap||!!l.clearcoatMap||!!l.clearcoatRoughnessMap||!!l.clearcoatNormalMap||!!l.iridescenceMap||!!l.iridescenceThicknessMap||!!l.displacementMap||!!l.transmissionMap||!!l.thicknessMap||!!l.specularIntensityMap||!!l.specularColorMap||!!l.sheenColorMap||!!l.sheenRoughnessMap,uvsVertexOnly:!(!!l.map||!!l.bumpMap||!!l.normalMap||!!l.specularMap||!!l.alphaMap||!!l.emissiveMap||!!l.roughnessMap||!!l.metalnessMap||!!l.clearcoatNormalMap||!!l.iridescenceMap||!!l.iridescenceThicknessMap||l.transmission>0||!!l.transmissionMap||!!l.thicknessMap||!!l.specularIntensityMap||!!l.specularColorMap||l.sheen>0||!!l.sheenColorMap||!!l.sheenRoughnessMap)&&!!l.displacementMap,fog:!!f,useFog:l.fog===!0,fogExp2:f&&f.isFogExp2,flatShading:!!l.flatShading,sizeAttenuation:l.sizeAttenuation,logarithmicDepthBuffer:a,skinning:q.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:F,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numClippingPlanes:i.numPlanes,numClipIntersection:i.numIntersection,dithering:l.dithering,shadowMapEnabled:E.shadowMap.enabled&&Y.length>0,shadowMapType:E.shadowMap.type,toneMapping:l.toneMapped?E.toneMapping:Zg,physicallyCorrectLights:E.physicallyCorrectLights,premultipliedAlpha:l.premultipliedAlpha,doubleSided:l.side===GQ,flipSided:l.side===ag,useDepthPacking:!!l.depthPacking,depthPacking:l.depthPacking||0,index0AttributeName:l.index0AttributeName,extensionDerivatives:l.extensions&&l.extensions.derivatives,extensionFragDepth:l.extensions&&l.extensions.fragDepth,extensionDrawBuffers:l.extensions&&l.extensions.drawBuffers,extensionShaderTextureLOD:l.extensions&&l.extensions.shaderTextureLOD,rendererExtensionFragDepth:t||g.has("EXT_frag_depth"),rendererExtensionDrawBuffers:t||g.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:t||g.has("EXT_shader_texture_lod"),customProgramCacheKey:l.customProgramCacheKey()}}function r(l){const N=[];if(l.shaderID?N.push(l.shaderID):(N.push(l.customVertexShaderID),N.push(l.customFragmentShaderID)),l.defines!==void 0)for(const Y in l.defines)N.push(Y),N.push(l.defines[Y]);return l.isRawShaderMaterial===!1&&(G(N,l),w(N,l),N.push(E.outputEncoding)),N.push(l.customProgramCacheKey),N.join()}function G(l,N){l.push(N.precision),l.push(N.outputEncoding),l.push(N.envMapMode),l.push(N.envMapCubeUVHeight),l.push(N.combine),l.push(N.vertexUvs),l.push(N.fogExp2),l.push(N.sizeAttenuation),l.push(N.morphTargetsCount),l.push(N.morphAttributeCount),l.push(N.numDirLights),l.push(N.numPointLights),l.push(N.numSpotLights),l.push(N.numSpotLightMaps),l.push(N.numHemiLights),l.push(N.numRectAreaLights),l.push(N.numDirLightShadows),l.push(N.numPointLightShadows),l.push(N.numSpotLightShadows),l.push(N.numSpotLightShadowsWithMaps),l.push(N.shadowMapType),l.push(N.toneMapping),l.push(N.numClippingPlanes),l.push(N.numClipIntersection),l.push(N.depthPacking)}function w(l,N){Q.disableAll(),N.isWebGL2&&Q.enable(0),N.supportsVertexTextures&&Q.enable(1),N.instancing&&Q.enable(2),N.instancingColor&&Q.enable(3),N.map&&Q.enable(4),N.matcap&&Q.enable(5),N.envMap&&Q.enable(6),N.lightMap&&Q.enable(7),N.aoMap&&Q.enable(8),N.emissiveMap&&Q.enable(9),N.bumpMap&&Q.enable(10),N.normalMap&&Q.enable(11),N.objectSpaceNormalMap&&Q.enable(12),N.tangentSpaceNormalMap&&Q.enable(13),N.clearcoat&&Q.enable(14),N.clearcoatMap&&Q.enable(15),N.clearcoatRoughnessMap&&Q.enable(16),N.clearcoatNormalMap&&Q.enable(17),N.iridescence&&Q.enable(18),N.iridescenceMap&&Q.enable(19),N.iridescenceThicknessMap&&Q.enable(20),N.displacementMap&&Q.enable(21),N.specularMap&&Q.enable(22),N.roughnessMap&&Q.enable(23),N.metalnessMap&&Q.enable(24),N.gradientMap&&Q.enable(25),N.alphaMap&&Q.enable(26),N.alphaTest&&Q.enable(27),N.vertexColors&&Q.enable(28),N.vertexAlphas&&Q.enable(29),N.vertexUvs&&Q.enable(30),N.vertexTangents&&Q.enable(31),N.uvsVertexOnly&&Q.enable(32),l.push(Q.mask),Q.disableAll(),N.fog&&Q.enable(0),N.useFog&&Q.enable(1),N.flatShading&&Q.enable(2),N.logarithmicDepthBuffer&&Q.enable(3),N.skinning&&Q.enable(4),N.morphTargets&&Q.enable(5),N.morphNormals&&Q.enable(6),N.morphColors&&Q.enable(7),N.premultipliedAlpha&&Q.enable(8),N.shadowMapEnabled&&Q.enable(9),N.physicallyCorrectLights&&Q.enable(10),N.doubleSided&&Q.enable(11),N.flipSided&&Q.enable(12),N.useDepthPacking&&Q.enable(13),N.dithering&&Q.enable(14),N.specularIntensityMap&&Q.enable(15),N.specularColorMap&&Q.enable(16),N.transmission&&Q.enable(17),N.transmissionMap&&Q.enable(18),N.thicknessMap&&Q.enable(19),N.sheen&&Q.enable(20),N.sheenColorMap&&Q.enable(21),N.sheenRoughnessMap&&Q.enable(22),N.decodeVideoTexture&&Q.enable(23),N.opaque&&Q.enable(24),l.push(Q.mask)}function S(l){const N=h[l.type];let Y;if(N){const z=Hg[N];Y=xa.clone(z.uniforms)}else Y=l.uniforms;return Y}function y(l,N){let Y;for(let z=0,q=e.length;z<q;z++){const f=e[z];if(f.cacheKey===N){Y=f,++Y.usedTimes;break}}return Y===void 0&&(Y=new LG(E,N,l,B),e.push(Y)),Y}function M(l){if(--l.usedTimes===0){const N=e.indexOf(l);e[N]=e[e.length-1],e.pop(),l.destroy()}}function p(l){o.remove(l)}function U(){o.dispose()}return{getParameters:D,getProgramCacheKey:r,getUniforms:S,acquireProgram:y,releaseProgram:M,releaseShaderCache:p,programs:e,dispose:U}}function TG(){let E=new WeakMap;function A(B){let i=E.get(B);return i===void 0&&(i={},E.set(B,i)),i}function I(B){E.delete(B)}function g(B,i,Q){E.get(B)[i]=Q}function C(){E=new WeakMap}return{get:A,remove:I,update:g,dispose:C}}function OG(E,A){return E.groupOrder!==A.groupOrder?E.groupOrder-A.groupOrder:E.renderOrder!==A.renderOrder?E.renderOrder-A.renderOrder:E.material.id!==A.material.id?E.material.id-A.material.id:E.z!==A.z?E.z-A.z:E.id-A.id}function Rt(E,A){return E.groupOrder!==A.groupOrder?E.groupOrder-A.groupOrder:E.renderOrder!==A.renderOrder?E.renderOrder-A.renderOrder:E.z!==A.z?A.z-E.z:E.id-A.id}function Ft(){const E=[];let A=0;const I=[],g=[],C=[];function B(){A=0,I.length=0,g.length=0,C.length=0}function i(a,s,n,h,D,r){let G=E[A];return G===void 0?(G={id:a.id,object:a,geometry:s,material:n,groupOrder:h,renderOrder:a.renderOrder,z:D,group:r},E[A]=G):(G.id=a.id,G.object=a,G.geometry=s,G.material=n,G.groupOrder=h,G.renderOrder=a.renderOrder,G.z=D,G.group=r),A++,G}function Q(a,s,n,h,D,r){const G=i(a,s,n,h,D,r);n.transmission>0?g.push(G):n.transparent===!0?C.push(G):I.push(G)}function o(a,s,n,h,D,r){const G=i(a,s,n,h,D,r);n.transmission>0?g.unshift(G):n.transparent===!0?C.unshift(G):I.unshift(G)}function e(a,s){I.length>1&&I.sort(a||OG),g.length>1&&g.sort(s||Rt),C.length>1&&C.sort(s||Rt)}function t(){for(let a=A,s=E.length;a<s;a++){const n=E[a];if(n.id===null)break;n.id=null,n.object=null,n.geometry=null,n.material=null,n.group=null}}return{opaque:I,transmissive:g,transparent:C,init:B,push:Q,unshift:o,finish:t,sort:e}}function PG(){let E=new WeakMap;function A(g,C){const B=E.get(g);let i;return B===void 0?(i=new Ft,E.set(g,[i])):C>=B.length?(i=new Ft,B.push(i)):i=B[C],i}function I(){E=new WeakMap}return{get:A,dispose:I}}function WG(){const E={};return{get:function(A){if(E[A.id]!==void 0)return E[A.id];let I;switch(A.type){case"DirectionalLight":I={direction:new V,color:new II};break;case"SpotLight":I={position:new V,direction:new V,color:new II,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":I={position:new V,color:new II,distance:0,decay:0};break;case"HemisphereLight":I={direction:new V,skyColor:new II,groundColor:new II};break;case"RectAreaLight":I={color:new II,position:new V,halfWidth:new V,halfHeight:new V};break}return E[A.id]=I,I}}}function jG(){const E={};return{get:function(A){if(E[A.id]!==void 0)return E[A.id];let I;switch(A.type){case"DirectionalLight":I={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gI};break;case"SpotLight":I={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gI};break;case"PointLight":I={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gI,shadowCameraNear:1,shadowCameraFar:1e3};break}return E[A.id]=I,I}}}let _G=0;function VG(E,A){return(A.castShadow?2:0)-(E.castShadow?2:0)+(A.map?1:0)-(E.map?1:0)}function ZG(E,A){const I=new WG,g=jG(),C={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let t=0;t<9;t++)C.probe.push(new V);const B=new V,i=new pI,Q=new pI;function o(t,a){let s=0,n=0,h=0;for(let z=0;z<9;z++)C.probe[z].set(0,0,0);let D=0,r=0,G=0,w=0,S=0,y=0,M=0,p=0,U=0,l=0;t.sort(VG);const N=a!==!0?Math.PI:1;for(let z=0,q=t.length;z<q;z++){const f=t[z],K=f.color,H=f.intensity,j=f.distance,EA=f.shadow&&f.shadow.map?f.shadow.map.texture:null;if(f.isAmbientLight)s+=K.r*H*N,n+=K.g*H*N,h+=K.b*H*N;else if(f.isLightProbe)for(let Z=0;Z<9;Z++)C.probe[Z].addScaledVector(f.sh.coefficients[Z],H);else if(f.isDirectionalLight){const Z=I.get(f);if(Z.color.copy(f.color).multiplyScalar(f.intensity*N),f.castShadow){const x=f.shadow,T=g.get(f);T.shadowBias=x.bias,T.shadowNormalBias=x.normalBias,T.shadowRadius=x.radius,T.shadowMapSize=x.mapSize,C.directionalShadow[D]=T,C.directionalShadowMap[D]=EA,C.directionalShadowMatrix[D]=f.shadow.matrix,y++}C.directional[D]=Z,D++}else if(f.isSpotLight){const Z=I.get(f);Z.position.setFromMatrixPosition(f.matrixWorld),Z.color.copy(K).multiplyScalar(H*N),Z.distance=j,Z.coneCos=Math.cos(f.angle),Z.penumbraCos=Math.cos(f.angle*(1-f.penumbra)),Z.decay=f.decay,C.spot[G]=Z;const x=f.shadow;if(f.map&&(C.spotLightMap[U]=f.map,U++,x.updateMatrices(f),f.castShadow&&l++),C.spotLightMatrix[G]=x.matrix,f.castShadow){const T=g.get(f);T.shadowBias=x.bias,T.shadowNormalBias=x.normalBias,T.shadowRadius=x.radius,T.shadowMapSize=x.mapSize,C.spotShadow[G]=T,C.spotShadowMap[G]=EA,p++}G++}else if(f.isRectAreaLight){const Z=I.get(f);Z.color.copy(K).multiplyScalar(H),Z.halfWidth.set(f.width*.5,0,0),Z.halfHeight.set(0,f.height*.5,0),C.rectArea[w]=Z,w++}else if(f.isPointLight){const Z=I.get(f);if(Z.color.copy(f.color).multiplyScalar(f.intensity*N),Z.distance=f.distance,Z.decay=f.decay,f.castShadow){const x=f.shadow,T=g.get(f);T.shadowBias=x.bias,T.shadowNormalBias=x.normalBias,T.shadowRadius=x.radius,T.shadowMapSize=x.mapSize,T.shadowCameraNear=x.camera.near,T.shadowCameraFar=x.camera.far,C.pointShadow[r]=T,C.pointShadowMap[r]=EA,C.pointShadowMatrix[r]=f.shadow.matrix,M++}C.point[r]=Z,r++}else if(f.isHemisphereLight){const Z=I.get(f);Z.skyColor.copy(f.color).multiplyScalar(H*N),Z.groundColor.copy(f.groundColor).multiplyScalar(H*N),C.hemi[S]=Z,S++}}w>0&&(A.isWebGL2||E.has("OES_texture_float_linear")===!0?(C.rectAreaLTC1=pA.LTC_FLOAT_1,C.rectAreaLTC2=pA.LTC_FLOAT_2):E.has("OES_texture_half_float_linear")===!0?(C.rectAreaLTC1=pA.LTC_HALF_1,C.rectAreaLTC2=pA.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),C.ambient[0]=s,C.ambient[1]=n,C.ambient[2]=h;const Y=C.hash;(Y.directionalLength!==D||Y.pointLength!==r||Y.spotLength!==G||Y.rectAreaLength!==w||Y.hemiLength!==S||Y.numDirectionalShadows!==y||Y.numPointShadows!==M||Y.numSpotShadows!==p||Y.numSpotMaps!==U)&&(C.directional.length=D,C.spot.length=G,C.rectArea.length=w,C.point.length=r,C.hemi.length=S,C.directionalShadow.length=y,C.directionalShadowMap.length=y,C.pointShadow.length=M,C.pointShadowMap.length=M,C.spotShadow.length=p,C.spotShadowMap.length=p,C.directionalShadowMatrix.length=y,C.pointShadowMatrix.length=M,C.spotLightMatrix.length=p+U-l,C.spotLightMap.length=U,C.numSpotLightShadowsWithMaps=l,Y.directionalLength=D,Y.pointLength=r,Y.spotLength=G,Y.rectAreaLength=w,Y.hemiLength=S,Y.numDirectionalShadows=y,Y.numPointShadows=M,Y.numSpotShadows=p,Y.numSpotMaps=U,C.version=_G++)}function e(t,a){let s=0,n=0,h=0,D=0,r=0;const G=a.matrixWorldInverse;for(let w=0,S=t.length;w<S;w++){const y=t[w];if(y.isDirectionalLight){const M=C.directional[s];M.direction.setFromMatrixPosition(y.matrixWorld),B.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(B),M.direction.transformDirection(G),s++}else if(y.isSpotLight){const M=C.spot[h];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(G),M.direction.setFromMatrixPosition(y.matrixWorld),B.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(B),M.direction.transformDirection(G),h++}else if(y.isRectAreaLight){const M=C.rectArea[D];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(G),Q.identity(),i.copy(y.matrixWorld),i.premultiply(G),Q.extractRotation(i),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(Q),M.halfHeight.applyMatrix4(Q),D++}else if(y.isPointLight){const M=C.point[n];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(G),n++}else if(y.isHemisphereLight){const M=C.hemi[r];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(G),r++}}}return{setup:o,setupView:e,state:C}}function pt(E,A){const I=new ZG(E,A),g=[],C=[];function B(){g.length=0,C.length=0}function i(a){g.push(a)}function Q(a){C.push(a)}function o(a){I.setup(g,a)}function e(a){I.setupView(g,a)}return{init:B,state:{lightsArray:g,shadowsArray:C,lights:I},setupLights:o,setupLightsView:e,pushLight:i,pushShadow:Q}}function zG(E,A){let I=new WeakMap;function g(B,i=0){const Q=I.get(B);let o;return Q===void 0?(o=new pt(E,A),I.set(B,[o])):i>=Q.length?(o=new pt(E,A),Q.push(o)):o=Q[i],o}function C(){I=new WeakMap}return{get:g,dispose:C}}class za extends MQ{constructor(A){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(A)}copy(A){return super.copy(A),this.depthPacking=A.depthPacking,this.map=A.map,this.alphaMap=A.alphaMap,this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this}}class Xa extends MQ{constructor(A){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new V,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(A)}copy(A){return super.copy(A),this.referencePosition.copy(A.referencePosition),this.nearDistance=A.nearDistance,this.farDistance=A.farDistance,this.map=A.map,this.alphaMap=A.alphaMap,this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this}}const XG=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$G=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function AS(E,A,I){let g=new bo;const C=new gI,B=new gI,i=new wI,Q=new za({depthPacking:Ka}),o=new Xa,e={},t=I.maxTextureSize,a={0:ag,1:hC,2:GQ},s=new LC({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gI},radius:{value:4}},vertexShader:XG,fragmentShader:$G}),n=s.clone();n.defines.HORIZONTAL_PASS=1;const h=new AC;h.setAttribute("position",new Kg(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new cg(h,s),r=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ra,this.render=function(y,M,p){if(r.enabled===!1||r.autoUpdate===!1&&r.needsUpdate===!1||y.length===0)return;const U=E.getRenderTarget(),l=E.getActiveCubeFace(),N=E.getActiveMipmapLevel(),Y=E.state;Y.setBlending(aC),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);for(let z=0,q=y.length;z<q;z++){const f=y[z],K=f.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",f,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;C.copy(K.mapSize);const H=K.getFrameExtents();if(C.multiply(H),B.copy(K.mapSize),(C.x>t||C.y>t)&&(C.x>t&&(B.x=Math.floor(t/H.x),C.x=B.x*H.x,K.mapSize.x=B.x),C.y>t&&(B.y=Math.floor(t/H.y),C.y=B.y*H.y,K.mapSize.y=B.y)),K.map===null){const EA=this.type!==zB?{minFilter:xI,magFilter:xI}:{};K.map=new mC(C.x,C.y,EA),K.map.texture.name=f.name+".shadowMap",K.camera.updateProjectionMatrix()}E.setRenderTarget(K.map),E.clear();const j=K.getViewportCount();for(let EA=0;EA<j;EA++){const Z=K.getViewport(EA);i.set(B.x*Z.x,B.y*Z.y,B.x*Z.z,B.y*Z.w),Y.viewport(i),K.updateMatrices(f,EA),g=K.getFrustum(),S(M,p,K.camera,f,this.type)}K.isPointLightShadow!==!0&&this.type===zB&&G(K,p),K.needsUpdate=!1}r.needsUpdate=!1,E.setRenderTarget(U,l,N)};function G(y,M){const p=A.update(D);s.defines.VSM_SAMPLES!==y.blurSamples&&(s.defines.VSM_SAMPLES=y.blurSamples,n.defines.VSM_SAMPLES=y.blurSamples,s.needsUpdate=!0,n.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new mC(C.x,C.y)),s.uniforms.shadow_pass.value=y.map.texture,s.uniforms.resolution.value=y.mapSize,s.uniforms.radius.value=y.radius,E.setRenderTarget(y.mapPass),E.clear(),E.renderBufferDirect(M,null,p,s,D,null),n.uniforms.shadow_pass.value=y.mapPass.texture,n.uniforms.resolution.value=y.mapSize,n.uniforms.radius.value=y.radius,E.setRenderTarget(y.map),E.clear(),E.renderBufferDirect(M,null,p,n,D,null)}function w(y,M,p,U,l,N){let Y=null;const z=p.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(z!==void 0)Y=z;else if(Y=p.isPointLight===!0?o:Q,E.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const q=Y.uuid,f=M.uuid;let K=e[q];K===void 0&&(K={},e[q]=K);let H=K[f];H===void 0&&(H=Y.clone(),K[f]=H),Y=H}return Y.visible=M.visible,Y.wireframe=M.wireframe,N===zB?Y.side=M.shadowSide!==null?M.shadowSide:M.side:Y.side=M.shadowSide!==null?M.shadowSide:a[M.side],Y.alphaMap=M.alphaMap,Y.alphaTest=M.alphaTest,Y.map=M.map,Y.clipShadows=M.clipShadows,Y.clippingPlanes=M.clippingPlanes,Y.clipIntersection=M.clipIntersection,Y.displacementMap=M.displacementMap,Y.displacementScale=M.displacementScale,Y.displacementBias=M.displacementBias,Y.wireframeLinewidth=M.wireframeLinewidth,Y.linewidth=M.linewidth,p.isPointLight===!0&&Y.isMeshDistanceMaterial===!0&&(Y.referencePosition.setFromMatrixPosition(p.matrixWorld),Y.nearDistance=U,Y.farDistance=l),Y}function S(y,M,p,U,l){if(y.visible===!1)return;if(y.layers.test(M.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&l===zB)&&(!y.frustumCulled||g.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,y.matrixWorld);const z=A.update(y),q=y.material;if(Array.isArray(q)){const f=z.groups;for(let K=0,H=f.length;K<H;K++){const j=f[K],EA=q[j.materialIndex];if(EA&&EA.visible){const Z=w(y,EA,U,p.near,p.far,l);E.renderBufferDirect(p,null,z,Z,y,j)}}}else if(q.visible){const f=w(y,q,U,p.near,p.far,l);E.renderBufferDirect(p,null,z,f,y,null)}}const Y=y.children;for(let z=0,q=Y.length;z<q;z++)S(Y[z],M,p,U,l)}}function IS(E,A,I){const g=I.isWebGL2;function C(){let u=!1;const IA=new wI;let nA=null;const NA=new wI(0,0,0,0);return{setMask:function(uA){nA!==uA&&!u&&(E.colorMask(uA,uA,uA,uA),nA=uA)},setLocked:function(uA){u=uA},setClear:function(uA,VA,iI,eI,tI){tI===!0&&(uA*=eI,VA*=eI,iI*=eI),IA.set(uA,VA,iI,eI),NA.equals(IA)===!1&&(E.clearColor(uA,VA,iI,eI),NA.copy(IA))},reset:function(){u=!1,nA=null,NA.set(-1,0,0,0)}}}function B(){let u=!1,IA=null,nA=null,NA=null;return{setTest:function(uA){uA?QA(2929):X(2929)},setMask:function(uA){IA!==uA&&!u&&(E.depthMask(uA),IA=uA)},setFunc:function(uA){if(nA!==uA){switch(uA){case Y0:E.depthFunc(512);break;case m0:E.depthFunc(519);break;case L0:E.depthFunc(513);break;case Co:E.depthFunc(515);break;case H0:E.depthFunc(514);break;case b0:E.depthFunc(518);break;case v0:E.depthFunc(516);break;case x0:E.depthFunc(517);break;default:E.depthFunc(515)}nA=uA}},setLocked:function(uA){u=uA},setClear:function(uA){NA!==uA&&(E.clearDepth(uA),NA=uA)},reset:function(){u=!1,IA=null,nA=null,NA=null}}}function i(){let u=!1,IA=null,nA=null,NA=null,uA=null,VA=null,iI=null,eI=null,tI=null;return{setTest:function(aI){u||(aI?QA(2960):X(2960))},setMask:function(aI){IA!==aI&&!u&&(E.stencilMask(aI),IA=aI)},setFunc:function(aI,EI,AI){(nA!==aI||NA!==EI||uA!==AI)&&(E.stencilFunc(aI,EI,AI),nA=aI,NA=EI,uA=AI)},setOp:function(aI,EI,AI){(VA!==aI||iI!==EI||eI!==AI)&&(E.stencilOp(aI,EI,AI),VA=aI,iI=EI,eI=AI)},setLocked:function(aI){u=aI},setClear:function(aI){tI!==aI&&(E.clearStencil(aI),tI=aI)},reset:function(){u=!1,IA=null,nA=null,NA=null,uA=null,VA=null,iI=null,eI=null,tI=null}}}const Q=new C,o=new B,e=new i,t=new WeakMap,a=new WeakMap;let s={},n={},h=new WeakMap,D=[],r=null,G=!1,w=null,S=null,y=null,M=null,p=null,U=null,l=null,N=!1,Y=null,z=null,q=null,f=null,K=null;const H=E.getParameter(35661);let j=!1,EA=0;const Z=E.getParameter(7938);Z.indexOf("WebGL")!==-1?(EA=parseFloat(/^WebGL (\d)/.exec(Z)[1]),j=EA>=1):Z.indexOf("OpenGL ES")!==-1&&(EA=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),j=EA>=2);let x=null,T={};const F=E.getParameter(3088),J=E.getParameter(2978),_=new wI().fromArray(F),P=new wI().fromArray(J);function O(u,IA,nA){const NA=new Uint8Array(4),uA=E.createTexture();E.bindTexture(u,uA),E.texParameteri(u,10241,9728),E.texParameteri(u,10240,9728);for(let VA=0;VA<nA;VA++)E.texImage2D(IA+VA,0,6408,1,1,0,6408,5121,NA);return uA}const m={};m[3553]=O(3553,3553,1),m[34067]=O(34067,34069,6),Q.setClear(0,0,0,1),o.setClear(1),e.setClear(0),QA(2929),o.setFunc(Co),UA(!1),mA(we),QA(2884),LA(aC);function QA(u){s[u]!==!0&&(E.enable(u),s[u]=!0)}function X(u){s[u]!==!1&&(E.disable(u),s[u]=!1)}function tA(u,IA){return n[u]!==IA?(E.bindFramebuffer(u,IA),n[u]=IA,g&&(u===36009&&(n[36160]=IA),u===36160&&(n[36009]=IA)),!0):!1}function eA(u,IA){let nA=D,NA=!1;if(u)if(nA=h.get(IA),nA===void 0&&(nA=[],h.set(IA,nA)),u.isWebGLMultipleRenderTargets){const uA=u.texture;if(nA.length!==uA.length||nA[0]!==36064){for(let VA=0,iI=uA.length;VA<iI;VA++)nA[VA]=36064+VA;nA.length=uA.length,NA=!0}}else nA[0]!==36064&&(nA[0]=36064,NA=!0);else nA[0]!==1029&&(nA[0]=1029,NA=!0);NA&&(I.isWebGL2?E.drawBuffers(nA):A.get("WEBGL_draw_buffers").drawBuffersWEBGL(nA))}function hA(u){return r!==u?(E.useProgram(u),r=u,!0):!1}const iA={[tB]:32774,[k0]:32778,[R0]:32779};if(g)iA[ye]=32775,iA[Me]=32776;else{const u=A.get("EXT_blend_minmax");u!==null&&(iA[ye]=u.MIN_EXT,iA[Me]=u.MAX_EXT)}const MA={[F0]:0,[p0]:1,[N0]:768,[Fa]:770,[q0]:776,[u0]:774,[K0]:772,[U0]:769,[pa]:771,[f0]:775,[J0]:773};function LA(u,IA,nA,NA,uA,VA,iI,eI){if(u===aC){G===!0&&(X(3042),G=!1);return}if(G===!1&&(QA(3042),G=!0),u!==M0){if(u!==w||eI!==N){if((S!==tB||p!==tB)&&(E.blendEquation(32774),S=tB,p=tB),eI)switch(u){case rB:E.blendFuncSeparate(1,771,1,771);break;case Ge:E.blendFunc(1,1);break;case Se:E.blendFuncSeparate(0,769,0,1);break;case de:E.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",u);break}else switch(u){case rB:E.blendFuncSeparate(770,771,1,771);break;case Ge:E.blendFunc(770,1);break;case Se:E.blendFuncSeparate(0,769,0,1);break;case de:E.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",u);break}y=null,M=null,U=null,l=null,w=u,N=eI}return}uA=uA||IA,VA=VA||nA,iI=iI||NA,(IA!==S||uA!==p)&&(E.blendEquationSeparate(iA[IA],iA[uA]),S=IA,p=uA),(nA!==y||NA!==M||VA!==U||iI!==l)&&(E.blendFuncSeparate(MA[nA],MA[NA],MA[VA],MA[iI]),y=nA,M=NA,U=VA,l=iI),w=u,N=!1}function dA(u,IA){u.side===GQ?X(2884):QA(2884);let nA=u.side===ag;IA&&(nA=!nA),UA(nA),u.blending===rB&&u.transparent===!1?LA(aC):LA(u.blending,u.blendEquation,u.blendSrc,u.blendDst,u.blendEquationAlpha,u.blendSrcAlpha,u.blendDstAlpha,u.premultipliedAlpha),o.setFunc(u.depthFunc),o.setTest(u.depthTest),o.setMask(u.depthWrite),Q.setMask(u.colorWrite);const NA=u.stencilWrite;e.setTest(NA),NA&&(e.setMask(u.stencilWriteMask),e.setFunc(u.stencilFunc,u.stencilRef,u.stencilFuncMask),e.setOp(u.stencilFail,u.stencilZFail,u.stencilZPass)),RA(u.polygonOffset,u.polygonOffsetFactor,u.polygonOffsetUnits),u.alphaToCoverage===!0?QA(32926):X(32926)}function UA(u){Y!==u&&(u?E.frontFace(2304):E.frontFace(2305),Y=u)}function mA(u){u!==S0?(QA(2884),u!==z&&(u===we?E.cullFace(1029):u===d0?E.cullFace(1028):E.cullFace(1032))):X(2884),z=u}function rA(u){u!==q&&(j&&E.lineWidth(u),q=u)}function RA(u,IA,nA){u?(QA(32823),(f!==IA||K!==nA)&&(E.polygonOffset(IA,nA),f=IA,K=nA)):X(32823)}function KA(u){u?QA(3089):X(3089)}function DA(u){u===void 0&&(u=33984+H-1),x!==u&&(E.activeTexture(u),x=u)}function k(u,IA,nA){nA===void 0&&(x===null?nA=33984+H-1:nA=x);let NA=T[nA];NA===void 0&&(NA={type:void 0,texture:void 0},T[nA]=NA),(NA.type!==u||NA.texture!==IA)&&(x!==nA&&(E.activeTexture(nA),x=nA),E.bindTexture(u,IA||m[u]),NA.type=u,NA.texture=IA)}function d(){const u=T[x];u!==void 0&&u.type!==void 0&&(E.bindTexture(u.type,null),u.type=void 0,u.texture=void 0)}function b(){try{E.compressedTexImage2D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function $(){try{E.compressedTexImage3D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function aA(){try{E.texSubImage2D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function cA(){try{E.texSubImage3D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function wA(){try{E.compressedTexSubImage2D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function sA(){try{E.compressedTexSubImage3D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function gA(){try{E.texStorage2D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function JA(){try{E.texStorage3D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function GA(){try{E.texImage2D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function kA(){try{E.texImage3D.apply(E,arguments)}catch(u){console.error("THREE.WebGLState:",u)}}function SA(u){_.equals(u)===!1&&(E.scissor(u.x,u.y,u.z,u.w),_.copy(u))}function lA(u){P.equals(u)===!1&&(E.viewport(u.x,u.y,u.z,u.w),P.copy(u))}function qA(u,IA){let nA=a.get(IA);nA===void 0&&(nA=new WeakMap,a.set(IA,nA));let NA=nA.get(u);NA===void 0&&(NA=E.getUniformBlockIndex(IA,u.name),nA.set(u,NA))}function HA(u,IA){const NA=a.get(IA).get(u);t.get(IA)!==NA&&(E.uniformBlockBinding(IA,NA,u.__bindingPointIndex),t.set(IA,NA))}function _A(){E.disable(3042),E.disable(2884),E.disable(2929),E.disable(32823),E.disable(3089),E.disable(2960),E.disable(32926),E.blendEquation(32774),E.blendFunc(1,0),E.blendFuncSeparate(1,0,1,0),E.colorMask(!0,!0,!0,!0),E.clearColor(0,0,0,0),E.depthMask(!0),E.depthFunc(513),E.clearDepth(1),E.stencilMask(4294967295),E.stencilFunc(519,0,4294967295),E.stencilOp(7680,7680,7680),E.clearStencil(0),E.cullFace(1029),E.frontFace(2305),E.polygonOffset(0,0),E.activeTexture(33984),E.bindFramebuffer(36160,null),g===!0&&(E.bindFramebuffer(36009,null),E.bindFramebuffer(36008,null)),E.useProgram(null),E.lineWidth(1),E.scissor(0,0,E.canvas.width,E.canvas.height),E.viewport(0,0,E.canvas.width,E.canvas.height),s={},x=null,T={},n={},h=new WeakMap,D=[],r=null,G=!1,w=null,S=null,y=null,M=null,p=null,U=null,l=null,N=!1,Y=null,z=null,q=null,f=null,K=null,_.set(0,0,E.canvas.width,E.canvas.height),P.set(0,0,E.canvas.width,E.canvas.height),Q.reset(),o.reset(),e.reset()}return{buffers:{color:Q,depth:o,stencil:e},enable:QA,disable:X,bindFramebuffer:tA,drawBuffers:eA,useProgram:hA,setBlending:LA,setMaterial:dA,setFlipSided:UA,setCullFace:mA,setLineWidth:rA,setPolygonOffset:RA,setScissorTest:KA,activeTexture:DA,bindTexture:k,unbindTexture:d,compressedTexImage2D:b,compressedTexImage3D:$,texImage2D:GA,texImage3D:kA,updateUBOMapping:qA,uniformBlockBinding:HA,texStorage2D:gA,texStorage3D:JA,texSubImage2D:aA,texSubImage3D:cA,compressedTexSubImage2D:wA,compressedTexSubImage3D:sA,scissor:SA,viewport:lA,reset:_A}}function gS(E,A,I,g,C,B,i){const Q=C.isWebGL2,o=C.maxTextures,e=C.maxCubemapSize,t=C.maxTextureSize,a=C.maxSamples,s=A.has("WEBGL_multisampled_render_to_texture")?A.get("WEBGL_multisampled_render_to_texture"):null,n=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let D;const r=new WeakMap;let G=!1;try{G=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(k,d){return G?new OffscreenCanvas(k,d):pi("canvas")}function S(k,d,b,$){let aA=1;if((k.width>$||k.height>$)&&(aA=$/Math.max(k.width,k.height)),aA<1||d===!0)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap){const cA=d?oo:Math.floor,wA=cA(aA*k.width),sA=cA(aA*k.height);D===void 0&&(D=w(wA,sA));const gA=b?w(wA,sA):D;return gA.width=wA,gA.height=sA,gA.getContext("2d").drawImage(k,0,0,wA,sA),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+wA+"x"+sA+")."),gA}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),k;return k}function y(k){return Ze(k.width)&&Ze(k.height)}function M(k){return Q?!1:k.wrapS!==pg||k.wrapT!==pg||k.minFilter!==xI&&k.minFilter!==gg}function p(k,d){return k.generateMipmaps&&d&&k.minFilter!==xI&&k.minFilter!==gg}function U(k){E.generateMipmap(k)}function l(k,d,b,$,aA=!1){if(Q===!1)return d;if(k!==null){if(E[k]!==void 0)return E[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let cA=d;return d===6403&&(b===5126&&(cA=33326),b===5131&&(cA=33325),b===5121&&(cA=33321)),d===33319&&(b===5126&&(cA=33328),b===5131&&(cA=33327),b===5121&&(cA=33323)),d===6408&&(b===5126&&(cA=34836),b===5131&&(cA=34842),b===5121&&(cA=$===GI&&aA===!1?35907:32856),b===32819&&(cA=32854),b===32820&&(cA=32855)),(cA===33325||cA===33326||cA===33327||cA===33328||cA===34842||cA===34836)&&A.get("EXT_color_buffer_float"),cA}function N(k,d,b){return p(k,b)===!0||k.isFramebufferTexture&&k.minFilter!==xI&&k.minFilter!==gg?Math.log2(Math.max(d.width,d.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?d.mipmaps.length:1}function Y(k){return k===xI||k===ke||k===aE?9728:9729}function z(k){const d=k.target;d.removeEventListener("dispose",z),f(d),d.isVideoTexture&&h.delete(d)}function q(k){const d=k.target;d.removeEventListener("dispose",q),H(d)}function f(k){const d=g.get(k);if(d.__webglInit===void 0)return;const b=k.source,$=r.get(b);if($){const aA=$[d.__cacheKey];aA.usedTimes--,aA.usedTimes===0&&K(k),Object.keys($).length===0&&r.delete(b)}g.remove(k)}function K(k){const d=g.get(k);E.deleteTexture(d.__webglTexture);const b=k.source,$=r.get(b);delete $[d.__cacheKey],i.memory.textures--}function H(k){const d=k.texture,b=g.get(k),$=g.get(d);if($.__webglTexture!==void 0&&(E.deleteTexture($.__webglTexture),i.memory.textures--),k.depthTexture&&k.depthTexture.dispose(),k.isWebGLCubeRenderTarget)for(let aA=0;aA<6;aA++)E.deleteFramebuffer(b.__webglFramebuffer[aA]),b.__webglDepthbuffer&&E.deleteRenderbuffer(b.__webglDepthbuffer[aA]);else{if(E.deleteFramebuffer(b.__webglFramebuffer),b.__webglDepthbuffer&&E.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&E.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let aA=0;aA<b.__webglColorRenderbuffer.length;aA++)b.__webglColorRenderbuffer[aA]&&E.deleteRenderbuffer(b.__webglColorRenderbuffer[aA]);b.__webglDepthRenderbuffer&&E.deleteRenderbuffer(b.__webglDepthRenderbuffer)}if(k.isWebGLMultipleRenderTargets)for(let aA=0,cA=d.length;aA<cA;aA++){const wA=g.get(d[aA]);wA.__webglTexture&&(E.deleteTexture(wA.__webglTexture),i.memory.textures--),g.remove(d[aA])}g.remove(d),g.remove(k)}let j=0;function EA(){j=0}function Z(){const k=j;return k>=o&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+o),j+=1,k}function x(k){const d=[];return d.push(k.wrapS),d.push(k.wrapT),d.push(k.wrapR||0),d.push(k.magFilter),d.push(k.minFilter),d.push(k.anisotropy),d.push(k.internalFormat),d.push(k.format),d.push(k.type),d.push(k.generateMipmaps),d.push(k.premultiplyAlpha),d.push(k.flipY),d.push(k.unpackAlignment),d.push(k.encoding),d.join()}function T(k,d){const b=g.get(k);if(k.isVideoTexture&&KA(k),k.isRenderTargetTexture===!1&&k.version>0&&b.__version!==k.version){const $=k.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(b,k,d);return}}I.bindTexture(3553,b.__webglTexture,33984+d)}function F(k,d){const b=g.get(k);if(k.version>0&&b.__version!==k.version){X(b,k,d);return}I.bindTexture(35866,b.__webglTexture,33984+d)}function J(k,d){const b=g.get(k);if(k.version>0&&b.__version!==k.version){X(b,k,d);return}I.bindTexture(32879,b.__webglTexture,33984+d)}function _(k,d){const b=g.get(k);if(k.version>0&&b.__version!==k.version){tA(b,k,d);return}I.bindTexture(34067,b.__webglTexture,33984+d)}const P={[tQ]:10497,[pg]:33071,[io]:33648},O={[xI]:9728,[ke]:9984,[aE]:9986,[gg]:9729,[Z0]:9985,[aQ]:9987};function m(k,d,b){if(b?(E.texParameteri(k,10242,P[d.wrapS]),E.texParameteri(k,10243,P[d.wrapT]),(k===32879||k===35866)&&E.texParameteri(k,32882,P[d.wrapR]),E.texParameteri(k,10240,O[d.magFilter]),E.texParameteri(k,10241,O[d.minFilter])):(E.texParameteri(k,10242,33071),E.texParameteri(k,10243,33071),(k===32879||k===35866)&&E.texParameteri(k,32882,33071),(d.wrapS!==pg||d.wrapT!==pg)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),E.texParameteri(k,10240,Y(d.magFilter)),E.texParameteri(k,10241,Y(d.minFilter)),d.minFilter!==xI&&d.minFilter!==gg&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.has("EXT_texture_filter_anisotropic")===!0){const $=A.get("EXT_texture_filter_anisotropic");if(d.magFilter===xI||d.minFilter!==aE&&d.minFilter!==aQ||d.type===pC&&A.has("OES_texture_float_linear")===!1||Q===!1&&d.type===sQ&&A.has("OES_texture_half_float_linear")===!1)return;(d.anisotropy>1||g.get(d).__currentAnisotropy)&&(E.texParameterf(k,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(d.anisotropy,C.getMaxAnisotropy())),g.get(d).__currentAnisotropy=d.anisotropy)}}function QA(k,d){let b=!1;k.__webglInit===void 0&&(k.__webglInit=!0,d.addEventListener("dispose",z));const $=d.source;let aA=r.get($);aA===void 0&&(aA={},r.set($,aA));const cA=x(d);if(cA!==k.__cacheKey){aA[cA]===void 0&&(aA[cA]={texture:E.createTexture(),usedTimes:0},i.memory.textures++,b=!0),aA[cA].usedTimes++;const wA=aA[k.__cacheKey];wA!==void 0&&(aA[k.__cacheKey].usedTimes--,wA.usedTimes===0&&K(d)),k.__cacheKey=cA,k.__webglTexture=aA[cA].texture}return b}function X(k,d,b){let $=3553;(d.isDataArrayTexture||d.isCompressedArrayTexture)&&($=35866),d.isData3DTexture&&($=32879);const aA=QA(k,d),cA=d.source;I.bindTexture($,k.__webglTexture,33984+b);const wA=g.get(cA);if(cA.version!==wA.__version||aA===!0){I.activeTexture(33984+b),E.pixelStorei(37440,d.flipY),E.pixelStorei(37441,d.premultiplyAlpha),E.pixelStorei(3317,d.unpackAlignment),E.pixelStorei(37443,0);const sA=M(d)&&y(d.image)===!1;let gA=S(d.image,sA,!1,t);gA=DA(d,gA);const JA=y(gA)||Q,GA=B.convert(d.format,d.encoding);let kA=B.convert(d.type),SA=l(d.internalFormat,GA,kA,d.encoding,d.isVideoTexture);m($,d,JA);let lA;const qA=d.mipmaps,HA=Q&&d.isVideoTexture!==!0,_A=wA.__version===void 0||aA===!0,u=N(d,gA,JA);if(d.isDepthTexture)SA=6402,Q?d.type===pC?SA=36012:d.type===FC?SA=33190:d.type===DB?SA=35056:SA=33189:d.type===pC&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),d.format===UC&&SA===6402&&d.type!==Ua&&d.type!==FC&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),d.type=FC,kA=B.convert(d.type)),d.format===dB&&SA===6402&&(SA=34041,d.type!==DB&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),d.type=DB,kA=B.convert(d.type))),_A&&(HA?I.texStorage2D(3553,1,SA,gA.width,gA.height):I.texImage2D(3553,0,SA,gA.width,gA.height,0,GA,kA,null));else if(d.isDataTexture)if(qA.length>0&&JA){HA&&_A&&I.texStorage2D(3553,u,SA,qA[0].width,qA[0].height);for(let IA=0,nA=qA.length;IA<nA;IA++)lA=qA[IA],HA?I.texSubImage2D(3553,IA,0,0,lA.width,lA.height,GA,kA,lA.data):I.texImage2D(3553,IA,SA,lA.width,lA.height,0,GA,kA,lA.data);d.generateMipmaps=!1}else HA?(_A&&I.texStorage2D(3553,u,SA,gA.width,gA.height),I.texSubImage2D(3553,0,0,0,gA.width,gA.height,GA,kA,gA.data)):I.texImage2D(3553,0,SA,gA.width,gA.height,0,GA,kA,gA.data);else if(d.isCompressedTexture)if(d.isCompressedArrayTexture){HA&&_A&&I.texStorage3D(35866,u,SA,qA[0].width,qA[0].height,gA.depth);for(let IA=0,nA=qA.length;IA<nA;IA++)lA=qA[IA],d.format!==Ng?GA!==null?HA?I.compressedTexSubImage3D(35866,IA,0,0,0,lA.width,lA.height,gA.depth,GA,lA.data,0,0):I.compressedTexImage3D(35866,IA,SA,lA.width,lA.height,gA.depth,0,lA.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):HA?I.texSubImage3D(35866,IA,0,0,0,lA.width,lA.height,gA.depth,GA,kA,lA.data):I.texImage3D(35866,IA,SA,lA.width,lA.height,gA.depth,0,GA,kA,lA.data)}else{HA&&_A&&I.texStorage2D(3553,u,SA,qA[0].width,qA[0].height);for(let IA=0,nA=qA.length;IA<nA;IA++)lA=qA[IA],d.format!==Ng?GA!==null?HA?I.compressedTexSubImage2D(3553,IA,0,0,lA.width,lA.height,GA,lA.data):I.compressedTexImage2D(3553,IA,SA,lA.width,lA.height,0,lA.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):HA?I.texSubImage2D(3553,IA,0,0,lA.width,lA.height,GA,kA,lA.data):I.texImage2D(3553,IA,SA,lA.width,lA.height,0,GA,kA,lA.data)}else if(d.isDataArrayTexture)HA?(_A&&I.texStorage3D(35866,u,SA,gA.width,gA.height,gA.depth),I.texSubImage3D(35866,0,0,0,0,gA.width,gA.height,gA.depth,GA,kA,gA.data)):I.texImage3D(35866,0,SA,gA.width,gA.height,gA.depth,0,GA,kA,gA.data);else if(d.isData3DTexture)HA?(_A&&I.texStorage3D(32879,u,SA,gA.width,gA.height,gA.depth),I.texSubImage3D(32879,0,0,0,0,gA.width,gA.height,gA.depth,GA,kA,gA.data)):I.texImage3D(32879,0,SA,gA.width,gA.height,gA.depth,0,GA,kA,gA.data);else if(d.isFramebufferTexture){if(_A)if(HA)I.texStorage2D(3553,u,SA,gA.width,gA.height);else{let IA=gA.width,nA=gA.height;for(let NA=0;NA<u;NA++)I.texImage2D(3553,NA,SA,IA,nA,0,GA,kA,null),IA>>=1,nA>>=1}}else if(qA.length>0&&JA){HA&&_A&&I.texStorage2D(3553,u,SA,qA[0].width,qA[0].height);for(let IA=0,nA=qA.length;IA<nA;IA++)lA=qA[IA],HA?I.texSubImage2D(3553,IA,0,0,GA,kA,lA):I.texImage2D(3553,IA,SA,GA,kA,lA);d.generateMipmaps=!1}else HA?(_A&&I.texStorage2D(3553,u,SA,gA.width,gA.height),I.texSubImage2D(3553,0,0,0,GA,kA,gA)):I.texImage2D(3553,0,SA,GA,kA,gA);p(d,JA)&&U($),wA.__version=cA.version,d.onUpdate&&d.onUpdate(d)}k.__version=d.version}function tA(k,d,b){if(d.image.length!==6)return;const $=QA(k,d),aA=d.source;I.bindTexture(34067,k.__webglTexture,33984+b);const cA=g.get(aA);if(aA.version!==cA.__version||$===!0){I.activeTexture(33984+b),E.pixelStorei(37440,d.flipY),E.pixelStorei(37441,d.premultiplyAlpha),E.pixelStorei(3317,d.unpackAlignment),E.pixelStorei(37443,0);const wA=d.isCompressedTexture||d.image[0].isCompressedTexture,sA=d.image[0]&&d.image[0].isDataTexture,gA=[];for(let IA=0;IA<6;IA++)!wA&&!sA?gA[IA]=S(d.image[IA],!1,!0,e):gA[IA]=sA?d.image[IA].image:d.image[IA],gA[IA]=DA(d,gA[IA]);const JA=gA[0],GA=y(JA)||Q,kA=B.convert(d.format,d.encoding),SA=B.convert(d.type),lA=l(d.internalFormat,kA,SA,d.encoding),qA=Q&&d.isVideoTexture!==!0,HA=cA.__version===void 0||$===!0;let _A=N(d,JA,GA);m(34067,d,GA);let u;if(wA){qA&&HA&&I.texStorage2D(34067,_A,lA,JA.width,JA.height);for(let IA=0;IA<6;IA++){u=gA[IA].mipmaps;for(let nA=0;nA<u.length;nA++){const NA=u[nA];d.format!==Ng?kA!==null?qA?I.compressedTexSubImage2D(34069+IA,nA,0,0,NA.width,NA.height,kA,NA.data):I.compressedTexImage2D(34069+IA,nA,lA,NA.width,NA.height,0,NA.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qA?I.texSubImage2D(34069+IA,nA,0,0,NA.width,NA.height,kA,SA,NA.data):I.texImage2D(34069+IA,nA,lA,NA.width,NA.height,0,kA,SA,NA.data)}}}else{u=d.mipmaps,qA&&HA&&(u.length>0&&_A++,I.texStorage2D(34067,_A,lA,gA[0].width,gA[0].height));for(let IA=0;IA<6;IA++)if(sA){qA?I.texSubImage2D(34069+IA,0,0,0,gA[IA].width,gA[IA].height,kA,SA,gA[IA].data):I.texImage2D(34069+IA,0,lA,gA[IA].width,gA[IA].height,0,kA,SA,gA[IA].data);for(let nA=0;nA<u.length;nA++){const uA=u[nA].image[IA].image;qA?I.texSubImage2D(34069+IA,nA+1,0,0,uA.width,uA.height,kA,SA,uA.data):I.texImage2D(34069+IA,nA+1,lA,uA.width,uA.height,0,kA,SA,uA.data)}}else{qA?I.texSubImage2D(34069+IA,0,0,0,kA,SA,gA[IA]):I.texImage2D(34069+IA,0,lA,kA,SA,gA[IA]);for(let nA=0;nA<u.length;nA++){const NA=u[nA];qA?I.texSubImage2D(34069+IA,nA+1,0,0,kA,SA,NA.image[IA]):I.texImage2D(34069+IA,nA+1,lA,kA,SA,NA.image[IA])}}}p(d,GA)&&U(34067),cA.__version=aA.version,d.onUpdate&&d.onUpdate(d)}k.__version=d.version}function eA(k,d,b,$,aA){const cA=B.convert(b.format,b.encoding),wA=B.convert(b.type),sA=l(b.internalFormat,cA,wA,b.encoding);g.get(d).__hasExternalTextures||(aA===32879||aA===35866?I.texImage3D(aA,0,sA,d.width,d.height,d.depth,0,cA,wA,null):I.texImage2D(aA,0,sA,d.width,d.height,0,cA,wA,null)),I.bindFramebuffer(36160,k),RA(d)?s.framebufferTexture2DMultisampleEXT(36160,$,aA,g.get(b).__webglTexture,0,rA(d)):(aA===3553||aA>=34069&&aA<=34074)&&E.framebufferTexture2D(36160,$,aA,g.get(b).__webglTexture,0),I.bindFramebuffer(36160,null)}function hA(k,d,b){if(E.bindRenderbuffer(36161,k),d.depthBuffer&&!d.stencilBuffer){let $=33189;if(b||RA(d)){const aA=d.depthTexture;aA&&aA.isDepthTexture&&(aA.type===pC?$=36012:aA.type===FC&&($=33190));const cA=rA(d);RA(d)?s.renderbufferStorageMultisampleEXT(36161,cA,$,d.width,d.height):E.renderbufferStorageMultisample(36161,cA,$,d.width,d.height)}else E.renderbufferStorage(36161,$,d.width,d.height);E.framebufferRenderbuffer(36160,36096,36161,k)}else if(d.depthBuffer&&d.stencilBuffer){const $=rA(d);b&&RA(d)===!1?E.renderbufferStorageMultisample(36161,$,35056,d.width,d.height):RA(d)?s.renderbufferStorageMultisampleEXT(36161,$,35056,d.width,d.height):E.renderbufferStorage(36161,34041,d.width,d.height),E.framebufferRenderbuffer(36160,33306,36161,k)}else{const $=d.isWebGLMultipleRenderTargets===!0?d.texture:[d.texture];for(let aA=0;aA<$.length;aA++){const cA=$[aA],wA=B.convert(cA.format,cA.encoding),sA=B.convert(cA.type),gA=l(cA.internalFormat,wA,sA,cA.encoding),JA=rA(d);b&&RA(d)===!1?E.renderbufferStorageMultisample(36161,JA,gA,d.width,d.height):RA(d)?s.renderbufferStorageMultisampleEXT(36161,JA,gA,d.width,d.height):E.renderbufferStorage(36161,gA,d.width,d.height)}}E.bindRenderbuffer(36161,null)}function iA(k,d){if(d&&d.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(I.bindFramebuffer(36160,k),!(d.depthTexture&&d.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!g.get(d.depthTexture).__webglTexture||d.depthTexture.image.width!==d.width||d.depthTexture.image.height!==d.height)&&(d.depthTexture.image.width=d.width,d.depthTexture.image.height=d.height,d.depthTexture.needsUpdate=!0),T(d.depthTexture,0);const $=g.get(d.depthTexture).__webglTexture,aA=rA(d);if(d.depthTexture.format===UC)RA(d)?s.framebufferTexture2DMultisampleEXT(36160,36096,3553,$,0,aA):E.framebufferTexture2D(36160,36096,3553,$,0);else if(d.depthTexture.format===dB)RA(d)?s.framebufferTexture2DMultisampleEXT(36160,33306,3553,$,0,aA):E.framebufferTexture2D(36160,33306,3553,$,0);else throw new Error("Unknown depthTexture format")}function MA(k){const d=g.get(k),b=k.isWebGLCubeRenderTarget===!0;if(k.depthTexture&&!d.__autoAllocateDepthBuffer){if(b)throw new Error("target.depthTexture not supported in Cube render targets");iA(d.__webglFramebuffer,k)}else if(b){d.__webglDepthbuffer=[];for(let $=0;$<6;$++)I.bindFramebuffer(36160,d.__webglFramebuffer[$]),d.__webglDepthbuffer[$]=E.createRenderbuffer(),hA(d.__webglDepthbuffer[$],k,!1)}else I.bindFramebuffer(36160,d.__webglFramebuffer),d.__webglDepthbuffer=E.createRenderbuffer(),hA(d.__webglDepthbuffer,k,!1);I.bindFramebuffer(36160,null)}function LA(k,d,b){const $=g.get(k);d!==void 0&&eA($.__webglFramebuffer,k,k.texture,36064,3553),b!==void 0&&MA(k)}function dA(k){const d=k.texture,b=g.get(k),$=g.get(d);k.addEventListener("dispose",q),k.isWebGLMultipleRenderTargets!==!0&&($.__webglTexture===void 0&&($.__webglTexture=E.createTexture()),$.__version=d.version,i.memory.textures++);const aA=k.isWebGLCubeRenderTarget===!0,cA=k.isWebGLMultipleRenderTargets===!0,wA=y(k)||Q;if(aA){b.__webglFramebuffer=[];for(let sA=0;sA<6;sA++)b.__webglFramebuffer[sA]=E.createFramebuffer()}else{if(b.__webglFramebuffer=E.createFramebuffer(),cA)if(C.drawBuffers){const sA=k.texture;for(let gA=0,JA=sA.length;gA<JA;gA++){const GA=g.get(sA[gA]);GA.__webglTexture===void 0&&(GA.__webglTexture=E.createTexture(),i.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(Q&&k.samples>0&&RA(k)===!1){const sA=cA?d:[d];b.__webglMultisampledFramebuffer=E.createFramebuffer(),b.__webglColorRenderbuffer=[],I.bindFramebuffer(36160,b.__webglMultisampledFramebuffer);for(let gA=0;gA<sA.length;gA++){const JA=sA[gA];b.__webglColorRenderbuffer[gA]=E.createRenderbuffer(),E.bindRenderbuffer(36161,b.__webglColorRenderbuffer[gA]);const GA=B.convert(JA.format,JA.encoding),kA=B.convert(JA.type),SA=l(JA.internalFormat,GA,kA,JA.encoding,k.isXRRenderTarget===!0),lA=rA(k);E.renderbufferStorageMultisample(36161,lA,SA,k.width,k.height),E.framebufferRenderbuffer(36160,36064+gA,36161,b.__webglColorRenderbuffer[gA])}E.bindRenderbuffer(36161,null),k.depthBuffer&&(b.__webglDepthRenderbuffer=E.createRenderbuffer(),hA(b.__webglDepthRenderbuffer,k,!0)),I.bindFramebuffer(36160,null)}}if(aA){I.bindTexture(34067,$.__webglTexture),m(34067,d,wA);for(let sA=0;sA<6;sA++)eA(b.__webglFramebuffer[sA],k,d,36064,34069+sA);p(d,wA)&&U(34067),I.unbindTexture()}else if(cA){const sA=k.texture;for(let gA=0,JA=sA.length;gA<JA;gA++){const GA=sA[gA],kA=g.get(GA);I.bindTexture(3553,kA.__webglTexture),m(3553,GA,wA),eA(b.__webglFramebuffer,k,GA,36064+gA,3553),p(GA,wA)&&U(3553)}I.unbindTexture()}else{let sA=3553;(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(Q?sA=k.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),I.bindTexture(sA,$.__webglTexture),m(sA,d,wA),eA(b.__webglFramebuffer,k,d,36064,sA),p(d,wA)&&U(sA),I.unbindTexture()}k.depthBuffer&&MA(k)}function UA(k){const d=y(k)||Q,b=k.isWebGLMultipleRenderTargets===!0?k.texture:[k.texture];for(let $=0,aA=b.length;$<aA;$++){const cA=b[$];if(p(cA,d)){const wA=k.isWebGLCubeRenderTarget?34067:3553,sA=g.get(cA).__webglTexture;I.bindTexture(wA,sA),U(wA),I.unbindTexture()}}}function mA(k){if(Q&&k.samples>0&&RA(k)===!1){const d=k.isWebGLMultipleRenderTargets?k.texture:[k.texture],b=k.width,$=k.height;let aA=16384;const cA=[],wA=k.stencilBuffer?33306:36096,sA=g.get(k),gA=k.isWebGLMultipleRenderTargets===!0;if(gA)for(let JA=0;JA<d.length;JA++)I.bindFramebuffer(36160,sA.__webglMultisampledFramebuffer),E.framebufferRenderbuffer(36160,36064+JA,36161,null),I.bindFramebuffer(36160,sA.__webglFramebuffer),E.framebufferTexture2D(36009,36064+JA,3553,null,0);I.bindFramebuffer(36008,sA.__webglMultisampledFramebuffer),I.bindFramebuffer(36009,sA.__webglFramebuffer);for(let JA=0;JA<d.length;JA++){cA.push(36064+JA),k.depthBuffer&&cA.push(wA);const GA=sA.__ignoreDepthValues!==void 0?sA.__ignoreDepthValues:!1;if(GA===!1&&(k.depthBuffer&&(aA|=256),k.stencilBuffer&&(aA|=1024)),gA&&E.framebufferRenderbuffer(36008,36064,36161,sA.__webglColorRenderbuffer[JA]),GA===!0&&(E.invalidateFramebuffer(36008,[wA]),E.invalidateFramebuffer(36009,[wA])),gA){const kA=g.get(d[JA]).__webglTexture;E.framebufferTexture2D(36009,36064,3553,kA,0)}E.blitFramebuffer(0,0,b,$,0,0,b,$,aA,9728),n&&E.invalidateFramebuffer(36008,cA)}if(I.bindFramebuffer(36008,null),I.bindFramebuffer(36009,null),gA)for(let JA=0;JA<d.length;JA++){I.bindFramebuffer(36160,sA.__webglMultisampledFramebuffer),E.framebufferRenderbuffer(36160,36064+JA,36161,sA.__webglColorRenderbuffer[JA]);const GA=g.get(d[JA]).__webglTexture;I.bindFramebuffer(36160,sA.__webglFramebuffer),E.framebufferTexture2D(36009,36064+JA,3553,GA,0)}I.bindFramebuffer(36009,sA.__webglMultisampledFramebuffer)}}function rA(k){return Math.min(a,k.samples)}function RA(k){const d=g.get(k);return Q&&k.samples>0&&A.has("WEBGL_multisampled_render_to_texture")===!0&&d.__useRenderToTexture!==!1}function KA(k){const d=i.render.frame;h.get(k)!==d&&(h.set(k,d),k.update())}function DA(k,d){const b=k.encoding,$=k.format,aA=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||k.format===Eo||b!==YC&&(b===GI?Q===!1?A.has("EXT_sRGB")===!0&&$===Ng?(k.format=Eo,k.minFilter=gg,k.generateMipmaps=!1):d=qa.sRGBToLinear(d):($!==Ng||aA!==qC)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",b)),d}this.allocateTextureUnit=Z,this.resetTextureUnits=EA,this.setTexture2D=T,this.setTexture2DArray=F,this.setTexture3D=J,this.setTextureCube=_,this.rebindTextures=LA,this.setupRenderTarget=dA,this.updateRenderTargetMipmap=UA,this.updateMultisampleRenderTarget=mA,this.setupDepthRenderbuffer=MA,this.setupFrameBufferTexture=eA,this.useMultisampledRTT=RA}function CS(E,A,I){const g=I.isWebGL2;function C(B,i=null){let Q;if(B===qC)return 5121;if(B===Ah)return 32819;if(B===Ih)return 32820;if(B===z0)return 5120;if(B===X0)return 5122;if(B===Ua)return 5123;if(B===$0)return 5124;if(B===FC)return 5125;if(B===pC)return 5126;if(B===sQ)return g?5131:(Q=A.get("OES_texture_half_float"),Q!==null?Q.HALF_FLOAT_OES:null);if(B===gh)return 6406;if(B===Ng)return 6408;if(B===Bh)return 6409;if(B===Qh)return 6410;if(B===UC)return 6402;if(B===dB)return 34041;if(B===Ch)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(B===Eo)return Q=A.get("EXT_sRGB"),Q!==null?Q.SRGB_ALPHA_EXT:null;if(B===ih)return 6403;if(B===Eh)return 36244;if(B===oh)return 33319;if(B===eh)return 33320;if(B===th)return 36249;if(B===sE||B===nE||B===rE||B===DE)if(i===GI)if(Q=A.get("WEBGL_compressed_texture_s3tc_srgb"),Q!==null){if(B===sE)return Q.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(B===nE)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(B===rE)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(B===DE)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Q=A.get("WEBGL_compressed_texture_s3tc"),Q!==null){if(B===sE)return Q.COMPRESSED_RGB_S3TC_DXT1_EXT;if(B===nE)return Q.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(B===rE)return Q.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(B===DE)return Q.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(B===Re||B===Fe||B===pe||B===Ne)if(Q=A.get("WEBGL_compressed_texture_pvrtc"),Q!==null){if(B===Re)return Q.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(B===Fe)return Q.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(B===pe)return Q.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(B===Ne)return Q.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(B===ah)return Q=A.get("WEBGL_compressed_texture_etc1"),Q!==null?Q.COMPRESSED_RGB_ETC1_WEBGL:null;if(B===Ue||B===Ke)if(Q=A.get("WEBGL_compressed_texture_etc"),Q!==null){if(B===Ue)return i===GI?Q.COMPRESSED_SRGB8_ETC2:Q.COMPRESSED_RGB8_ETC2;if(B===Ke)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Q.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(B===Je||B===ue||B===fe||B===qe||B===Ye||B===me||B===Le||B===He||B===be||B===ve||B===xe||B===Te||B===Oe||B===Pe)if(Q=A.get("WEBGL_compressed_texture_astc"),Q!==null){if(B===Je)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Q.COMPRESSED_RGBA_ASTC_4x4_KHR;if(B===ue)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Q.COMPRESSED_RGBA_ASTC_5x4_KHR;if(B===fe)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Q.COMPRESSED_RGBA_ASTC_5x5_KHR;if(B===qe)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Q.COMPRESSED_RGBA_ASTC_6x5_KHR;if(B===Ye)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Q.COMPRESSED_RGBA_ASTC_6x6_KHR;if(B===me)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Q.COMPRESSED_RGBA_ASTC_8x5_KHR;if(B===Le)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Q.COMPRESSED_RGBA_ASTC_8x6_KHR;if(B===He)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Q.COMPRESSED_RGBA_ASTC_8x8_KHR;if(B===be)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Q.COMPRESSED_RGBA_ASTC_10x5_KHR;if(B===ve)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Q.COMPRESSED_RGBA_ASTC_10x6_KHR;if(B===xe)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Q.COMPRESSED_RGBA_ASTC_10x8_KHR;if(B===Te)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Q.COMPRESSED_RGBA_ASTC_10x10_KHR;if(B===Oe)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Q.COMPRESSED_RGBA_ASTC_12x10_KHR;if(B===Pe)return i===GI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Q.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(B===We)if(Q=A.get("EXT_texture_compression_bptc"),Q!==null){if(B===We)return i===GI?Q.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Q.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return B===DB?g?34042:(Q=A.get("WEBGL_depth_texture"),Q!==null?Q.UNSIGNED_INT_24_8_WEBGL:null):E[B]!==void 0?E[B]:null}return{convert:C}}class BS extends hg{constructor(A=[]){super(),this.isArrayCamera=!0,this.cameras=A}}class Qi extends Bg{constructor(){super(),this.isGroup=!0,this.type="Group"}}const QS={type:"move"};class xE{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(A){return this._targetRay!==null&&this._targetRay.dispatchEvent(A),this._grip!==null&&this._grip.dispatchEvent(A),this._hand!==null&&this._hand.dispatchEvent(A),this}connect(A){if(A&&A.hand){const I=this._hand;if(I)for(const g of A.hand.values())this._getHandJoint(I,g)}return this.dispatchEvent({type:"connected",data:A}),this}disconnect(A){return this.dispatchEvent({type:"disconnected",data:A}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(A,I,g){let C=null,B=null,i=null;const Q=this._targetRay,o=this._grip,e=this._hand;if(A&&I.session.visibilityState!=="visible-blurred"){if(e&&A.hand){i=!0;for(const D of A.hand.values()){const r=I.getJointPose(D,g),G=this._getHandJoint(e,D);r!==null&&(G.matrix.fromArray(r.transform.matrix),G.matrix.decompose(G.position,G.rotation,G.scale),G.jointRadius=r.radius),G.visible=r!==null}const t=e.joints["index-finger-tip"],a=e.joints["thumb-tip"],s=t.position.distanceTo(a.position),n=.02,h=.005;e.inputState.pinching&&s>n+h?(e.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:A.handedness,target:this})):!e.inputState.pinching&&s<=n-h&&(e.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:A.handedness,target:this}))}else o!==null&&A.gripSpace&&(B=I.getPose(A.gripSpace,g),B!==null&&(o.matrix.fromArray(B.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),B.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(B.linearVelocity)):o.hasLinearVelocity=!1,B.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(B.angularVelocity)):o.hasAngularVelocity=!1));Q!==null&&(C=I.getPose(A.targetRaySpace,g),C===null&&B!==null&&(C=B),C!==null&&(Q.matrix.fromArray(C.transform.matrix),Q.matrix.decompose(Q.position,Q.rotation,Q.scale),C.linearVelocity?(Q.hasLinearVelocity=!0,Q.linearVelocity.copy(C.linearVelocity)):Q.hasLinearVelocity=!1,C.angularVelocity?(Q.hasAngularVelocity=!0,Q.angularVelocity.copy(C.angularVelocity)):Q.hasAngularVelocity=!1,this.dispatchEvent(QS)))}return Q!==null&&(Q.visible=C!==null),o!==null&&(o.visible=B!==null),e!==null&&(e.visible=i!==null),this}_getHandJoint(A,I){if(A.joints[I.jointName]===void 0){const g=new Qi;g.matrixAutoUpdate=!1,g.visible=!1,A.joints[I.jointName]=g,A.add(g)}return A.joints[I.jointName]}}class iS extends XI{constructor(A,I,g,C,B,i,Q,o,e,t){if(t=t!==void 0?t:UC,t!==UC&&t!==dB)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");g===void 0&&t===UC&&(g=FC),g===void 0&&t===dB&&(g=DB),super(null,C,B,i,Q,o,t,g,e),this.isDepthTexture=!0,this.image={width:A,height:I},this.magFilter=Q!==void 0?Q:xI,this.minFilter=o!==void 0?o:xI,this.flipY=!1,this.generateMipmaps=!1}}class ES extends FB{constructor(A,I){super();const g=this;let C=null,B=1,i=null,Q="local-floor",o=null,e=null,t=null,a=null,s=null,n=null;const h=I.getContextAttributes();let D=null,r=null;const G=[],w=[],S=new Set,y=new Map,M=new hg;M.layers.enable(1),M.viewport=new wI;const p=new hg;p.layers.enable(2),p.viewport=new wI;const U=[M,p],l=new BS;l.layers.enable(1),l.layers.enable(2);let N=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let J=G[F];return J===void 0&&(J=new xE,G[F]=J),J.getTargetRaySpace()},this.getControllerGrip=function(F){let J=G[F];return J===void 0&&(J=new xE,G[F]=J),J.getGripSpace()},this.getHand=function(F){let J=G[F];return J===void 0&&(J=new xE,G[F]=J),J.getHandSpace()};function z(F){const J=w.indexOf(F.inputSource);if(J===-1)return;const _=G[J];_!==void 0&&_.dispatchEvent({type:F.type,data:F.inputSource})}function q(){C.removeEventListener("select",z),C.removeEventListener("selectstart",z),C.removeEventListener("selectend",z),C.removeEventListener("squeeze",z),C.removeEventListener("squeezestart",z),C.removeEventListener("squeezeend",z),C.removeEventListener("end",q),C.removeEventListener("inputsourceschange",f);for(let F=0;F<G.length;F++){const J=w[F];J!==null&&(w[F]=null,G[F].disconnect(J))}N=null,Y=null,A.setRenderTarget(D),s=null,a=null,t=null,C=null,r=null,T.stop(),g.isPresenting=!1,g.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){B=F,g.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){Q=F,g.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||i},this.setReferenceSpace=function(F){o=F},this.getBaseLayer=function(){return a!==null?a:s},this.getBinding=function(){return t},this.getFrame=function(){return n},this.getSession=function(){return C},this.setSession=async function(F){if(C=F,C!==null){if(D=A.getRenderTarget(),C.addEventListener("select",z),C.addEventListener("selectstart",z),C.addEventListener("selectend",z),C.addEventListener("squeeze",z),C.addEventListener("squeezestart",z),C.addEventListener("squeezeend",z),C.addEventListener("end",q),C.addEventListener("inputsourceschange",f),h.xrCompatible!==!0&&await I.makeXRCompatible(),C.renderState.layers===void 0||A.capabilities.isWebGL2===!1){const J={antialias:C.renderState.layers===void 0?h.antialias:!0,alpha:h.alpha,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:B};s=new XRWebGLLayer(C,I,J),C.updateRenderState({baseLayer:s}),r=new mC(s.framebufferWidth,s.framebufferHeight,{format:Ng,type:qC,encoding:A.outputEncoding,stencilBuffer:h.stencil})}else{let J=null,_=null,P=null;h.depth&&(P=h.stencil?35056:33190,J=h.stencil?dB:UC,_=h.stencil?DB:FC);const O={colorFormat:32856,depthFormat:P,scaleFactor:B};t=new XRWebGLBinding(C,I),a=t.createProjectionLayer(O),C.updateRenderState({layers:[a]}),r=new mC(a.textureWidth,a.textureHeight,{format:Ng,type:qC,depthTexture:new iS(a.textureWidth,a.textureHeight,_,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:h.stencil,encoding:A.outputEncoding,samples:h.antialias?4:0});const m=A.properties.get(r);m.__ignoreDepthValues=a.ignoreDepthValues}r.isXRRenderTarget=!0,this.setFoveation(1),o=null,i=await C.requestReferenceSpace(Q),T.setContext(C),T.start(),g.isPresenting=!0,g.dispatchEvent({type:"sessionstart"})}};function f(F){for(let J=0;J<F.removed.length;J++){const _=F.removed[J],P=w.indexOf(_);P>=0&&(w[P]=null,G[P].disconnect(_))}for(let J=0;J<F.added.length;J++){const _=F.added[J];let P=w.indexOf(_);if(P===-1){for(let m=0;m<G.length;m++)if(m>=w.length){w.push(_),P=m;break}else if(w[m]===null){w[m]=_,P=m;break}if(P===-1)break}const O=G[P];O&&O.connect(_)}}const K=new V,H=new V;function j(F,J,_){K.setFromMatrixPosition(J.matrixWorld),H.setFromMatrixPosition(_.matrixWorld);const P=K.distanceTo(H),O=J.projectionMatrix.elements,m=_.projectionMatrix.elements,QA=O[14]/(O[10]-1),X=O[14]/(O[10]+1),tA=(O[9]+1)/O[5],eA=(O[9]-1)/O[5],hA=(O[8]-1)/O[0],iA=(m[8]+1)/m[0],MA=QA*hA,LA=QA*iA,dA=P/(-hA+iA),UA=dA*-hA;J.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(UA),F.translateZ(dA),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert();const mA=QA+dA,rA=X+dA,RA=MA-UA,KA=LA+(P-UA),DA=tA*X/rA*mA,k=eA*X/rA*mA;F.projectionMatrix.makePerspective(RA,KA,DA,k,mA,rA)}function EA(F,J){J===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(J.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(C===null)return;l.near=p.near=M.near=F.near,l.far=p.far=M.far=F.far,(N!==l.near||Y!==l.far)&&(C.updateRenderState({depthNear:l.near,depthFar:l.far}),N=l.near,Y=l.far);const J=F.parent,_=l.cameras;EA(l,J);for(let O=0;O<_.length;O++)EA(_[O],J);l.matrixWorld.decompose(l.position,l.quaternion,l.scale),F.matrix.copy(l.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale);const P=F.children;for(let O=0,m=P.length;O<m;O++)P[O].updateMatrixWorld(!0);_.length===2?j(l,M,p):l.projectionMatrix.copy(M.projectionMatrix)},this.getCamera=function(){return l},this.getFoveation=function(){if(a!==null)return a.fixedFoveation;if(s!==null)return s.fixedFoveation},this.setFoveation=function(F){a!==null&&(a.fixedFoveation=F),s!==null&&s.fixedFoveation!==void 0&&(s.fixedFoveation=F)},this.getPlanes=function(){return S};let Z=null;function x(F,J){if(e=J.getViewerPose(o||i),n=J,e!==null){const _=e.views;s!==null&&(A.setRenderTargetFramebuffer(r,s.framebuffer),A.setRenderTarget(r));let P=!1;_.length!==l.cameras.length&&(l.cameras.length=0,P=!0);for(let O=0;O<_.length;O++){const m=_[O];let QA=null;if(s!==null)QA=s.getViewport(m);else{const tA=t.getViewSubImage(a,m);QA=tA.viewport,O===0&&(A.setRenderTargetTextures(r,tA.colorTexture,a.ignoreDepthValues?void 0:tA.depthStencilTexture),A.setRenderTarget(r))}let X=U[O];X===void 0&&(X=new hg,X.layers.enable(O),X.viewport=new wI,U[O]=X),X.matrix.fromArray(m.transform.matrix),X.projectionMatrix.fromArray(m.projectionMatrix),X.viewport.set(QA.x,QA.y,QA.width,QA.height),O===0&&l.matrix.copy(X.matrix),P===!0&&l.cameras.push(X)}}for(let _=0;_<G.length;_++){const P=w[_],O=G[_];P!==null&&O!==void 0&&O.update(P,J,o||i)}if(Z&&Z(F,J),J.detectedPlanes){g.dispatchEvent({type:"planesdetected",data:J.detectedPlanes});let _=null;for(const P of S)J.detectedPlanes.has(P)||(_===null&&(_=[]),_.push(P));if(_!==null)for(const P of _)S.delete(P),y.delete(P),g.dispatchEvent({type:"planeremoved",data:P});for(const P of J.detectedPlanes)if(!S.has(P))S.add(P),y.set(P,J.lastChangedTime),g.dispatchEvent({type:"planeadded",data:P});else{const O=y.get(P);P.lastChangedTime>O&&(y.set(P,P.lastChangedTime),g.dispatchEvent({type:"planechanged",data:P}))}}n=null}const T=new Pa;T.setAnimationLoop(x),this.setAnimationLoop=function(F){Z=F},this.dispose=function(){}}}function oS(E,A){function I(D,r){r.color.getRGB(D.fogColor.value,va(E)),r.isFog?(D.fogNear.value=r.near,D.fogFar.value=r.far):r.isFogExp2&&(D.fogDensity.value=r.density)}function g(D,r,G,w,S){r.isMeshBasicMaterial||r.isMeshLambertMaterial?C(D,r):r.isMeshToonMaterial?(C(D,r),t(D,r)):r.isMeshPhongMaterial?(C(D,r),e(D,r)):r.isMeshStandardMaterial?(C(D,r),a(D,r),r.isMeshPhysicalMaterial&&s(D,r,S)):r.isMeshMatcapMaterial?(C(D,r),n(D,r)):r.isMeshDepthMaterial?C(D,r):r.isMeshDistanceMaterial?(C(D,r),h(D,r)):r.isMeshNormalMaterial?C(D,r):r.isLineBasicMaterial?(B(D,r),r.isLineDashedMaterial&&i(D,r)):r.isPointsMaterial?Q(D,r,G,w):r.isSpriteMaterial?o(D,r):r.isShadowMaterial?(D.color.value.copy(r.color),D.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function C(D,r){D.opacity.value=r.opacity,r.color&&D.diffuse.value.copy(r.color),r.emissive&&D.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(D.map.value=r.map),r.alphaMap&&(D.alphaMap.value=r.alphaMap),r.bumpMap&&(D.bumpMap.value=r.bumpMap,D.bumpScale.value=r.bumpScale,r.side===ag&&(D.bumpScale.value*=-1)),r.displacementMap&&(D.displacementMap.value=r.displacementMap,D.displacementScale.value=r.displacementScale,D.displacementBias.value=r.displacementBias),r.emissiveMap&&(D.emissiveMap.value=r.emissiveMap),r.normalMap&&(D.normalMap.value=r.normalMap,D.normalScale.value.copy(r.normalScale),r.side===ag&&D.normalScale.value.negate()),r.specularMap&&(D.specularMap.value=r.specularMap),r.alphaTest>0&&(D.alphaTest.value=r.alphaTest);const G=A.get(r).envMap;if(G&&(D.envMap.value=G,D.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1,D.reflectivity.value=r.reflectivity,D.ior.value=r.ior,D.refractionRatio.value=r.refractionRatio),r.lightMap){D.lightMap.value=r.lightMap;const y=E.physicallyCorrectLights!==!0?Math.PI:1;D.lightMapIntensity.value=r.lightMapIntensity*y}r.aoMap&&(D.aoMap.value=r.aoMap,D.aoMapIntensity.value=r.aoMapIntensity);let w;r.map?w=r.map:r.specularMap?w=r.specularMap:r.displacementMap?w=r.displacementMap:r.normalMap?w=r.normalMap:r.bumpMap?w=r.bumpMap:r.roughnessMap?w=r.roughnessMap:r.metalnessMap?w=r.metalnessMap:r.alphaMap?w=r.alphaMap:r.emissiveMap?w=r.emissiveMap:r.clearcoatMap?w=r.clearcoatMap:r.clearcoatNormalMap?w=r.clearcoatNormalMap:r.clearcoatRoughnessMap?w=r.clearcoatRoughnessMap:r.iridescenceMap?w=r.iridescenceMap:r.iridescenceThicknessMap?w=r.iridescenceThicknessMap:r.specularIntensityMap?w=r.specularIntensityMap:r.specularColorMap?w=r.specularColorMap:r.transmissionMap?w=r.transmissionMap:r.thicknessMap?w=r.thicknessMap:r.sheenColorMap?w=r.sheenColorMap:r.sheenRoughnessMap&&(w=r.sheenRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),D.uvTransform.value.copy(w.matrix));let S;r.aoMap?S=r.aoMap:r.lightMap&&(S=r.lightMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),D.uv2Transform.value.copy(S.matrix))}function B(D,r){D.diffuse.value.copy(r.color),D.opacity.value=r.opacity}function i(D,r){D.dashSize.value=r.dashSize,D.totalSize.value=r.dashSize+r.gapSize,D.scale.value=r.scale}function Q(D,r,G,w){D.diffuse.value.copy(r.color),D.opacity.value=r.opacity,D.size.value=r.size*G,D.scale.value=w*.5,r.map&&(D.map.value=r.map),r.alphaMap&&(D.alphaMap.value=r.alphaMap),r.alphaTest>0&&(D.alphaTest.value=r.alphaTest);let S;r.map?S=r.map:r.alphaMap&&(S=r.alphaMap),S!==void 0&&(S.matrixAutoUpdate===!0&&S.updateMatrix(),D.uvTransform.value.copy(S.matrix))}function o(D,r){D.diffuse.value.copy(r.color),D.opacity.value=r.opacity,D.rotation.value=r.rotation,r.map&&(D.map.value=r.map),r.alphaMap&&(D.alphaMap.value=r.alphaMap),r.alphaTest>0&&(D.alphaTest.value=r.alphaTest);let G;r.map?G=r.map:r.alphaMap&&(G=r.alphaMap),G!==void 0&&(G.matrixAutoUpdate===!0&&G.updateMatrix(),D.uvTransform.value.copy(G.matrix))}function e(D,r){D.specular.value.copy(r.specular),D.shininess.value=Math.max(r.shininess,1e-4)}function t(D,r){r.gradientMap&&(D.gradientMap.value=r.gradientMap)}function a(D,r){D.roughness.value=r.roughness,D.metalness.value=r.metalness,r.roughnessMap&&(D.roughnessMap.value=r.roughnessMap),r.metalnessMap&&(D.metalnessMap.value=r.metalnessMap),A.get(r).envMap&&(D.envMapIntensity.value=r.envMapIntensity)}function s(D,r,G){D.ior.value=r.ior,r.sheen>0&&(D.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),D.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(D.sheenColorMap.value=r.sheenColorMap),r.sheenRoughnessMap&&(D.sheenRoughnessMap.value=r.sheenRoughnessMap)),r.clearcoat>0&&(D.clearcoat.value=r.clearcoat,D.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(D.clearcoatMap.value=r.clearcoatMap),r.clearcoatRoughnessMap&&(D.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap),r.clearcoatNormalMap&&(D.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),D.clearcoatNormalMap.value=r.clearcoatNormalMap,r.side===ag&&D.clearcoatNormalScale.value.negate())),r.iridescence>0&&(D.iridescence.value=r.iridescence,D.iridescenceIOR.value=r.iridescenceIOR,D.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(D.iridescenceMap.value=r.iridescenceMap),r.iridescenceThicknessMap&&(D.iridescenceThicknessMap.value=r.iridescenceThicknessMap)),r.transmission>0&&(D.transmission.value=r.transmission,D.transmissionSamplerMap.value=G.texture,D.transmissionSamplerSize.value.set(G.width,G.height),r.transmissionMap&&(D.transmissionMap.value=r.transmissionMap),D.thickness.value=r.thickness,r.thicknessMap&&(D.thicknessMap.value=r.thicknessMap),D.attenuationDistance.value=r.attenuationDistance,D.attenuationColor.value.copy(r.attenuationColor)),D.specularIntensity.value=r.specularIntensity,D.specularColor.value.copy(r.specularColor),r.specularIntensityMap&&(D.specularIntensityMap.value=r.specularIntensityMap),r.specularColorMap&&(D.specularColorMap.value=r.specularColorMap)}function n(D,r){r.matcap&&(D.matcap.value=r.matcap)}function h(D,r){D.referencePosition.value.copy(r.referencePosition),D.nearDistance.value=r.nearDistance,D.farDistance.value=r.farDistance}return{refreshFogUniforms:I,refreshMaterialUniforms:g}}function eS(E,A,I,g){let C={},B={},i=[];const Q=I.isWebGL2?E.getParameter(35375):0;function o(w,S){const y=S.program;g.uniformBlockBinding(w,y)}function e(w,S){let y=C[w.id];y===void 0&&(h(w),y=t(w),C[w.id]=y,w.addEventListener("dispose",r));const M=S.program;g.updateUBOMapping(w,M);const p=A.render.frame;B[w.id]!==p&&(s(w),B[w.id]=p)}function t(w){const S=a();w.__bindingPointIndex=S;const y=E.createBuffer(),M=w.__size,p=w.usage;return E.bindBuffer(35345,y),E.bufferData(35345,M,p),E.bindBuffer(35345,null),E.bindBufferBase(35345,S,y),y}function a(){for(let w=0;w<Q;w++)if(i.indexOf(w)===-1)return i.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function s(w){const S=C[w.id],y=w.uniforms,M=w.__cache;E.bindBuffer(35345,S);for(let p=0,U=y.length;p<U;p++){const l=y[p];if(n(l,p,M)===!0){const N=l.__offset,Y=Array.isArray(l.value)?l.value:[l.value];let z=0;for(let q=0;q<Y.length;q++){const f=Y[q],K=D(f);typeof f=="number"?(l.__data[0]=f,E.bufferSubData(35345,N+z,l.__data)):f.isMatrix3?(l.__data[0]=f.elements[0],l.__data[1]=f.elements[1],l.__data[2]=f.elements[2],l.__data[3]=f.elements[0],l.__data[4]=f.elements[3],l.__data[5]=f.elements[4],l.__data[6]=f.elements[5],l.__data[7]=f.elements[0],l.__data[8]=f.elements[6],l.__data[9]=f.elements[7],l.__data[10]=f.elements[8],l.__data[11]=f.elements[0]):(f.toArray(l.__data,z),z+=K.storage/Float32Array.BYTES_PER_ELEMENT)}E.bufferSubData(35345,N,l.__data)}}E.bindBuffer(35345,null)}function n(w,S,y){const M=w.value;if(y[S]===void 0){if(typeof M=="number")y[S]=M;else{const p=Array.isArray(M)?M:[M],U=[];for(let l=0;l<p.length;l++)U.push(p[l].clone());y[S]=U}return!0}else if(typeof M=="number"){if(y[S]!==M)return y[S]=M,!0}else{const p=Array.isArray(y[S])?y[S]:[y[S]],U=Array.isArray(M)?M:[M];for(let l=0;l<p.length;l++){const N=p[l];if(N.equals(U[l])===!1)return N.copy(U[l]),!0}}return!1}function h(w){const S=w.uniforms;let y=0;const M=16;let p=0;for(let U=0,l=S.length;U<l;U++){const N=S[U],Y={boundary:0,storage:0},z=Array.isArray(N.value)?N.value:[N.value];for(let q=0,f=z.length;q<f;q++){const K=z[q],H=D(K);Y.boundary+=H.boundary,Y.storage+=H.storage}if(N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,U>0){p=y%M;const q=M-p;p!==0&&q-Y.boundary<0&&(y+=M-p,N.__offset=y)}y+=Y.storage}return p=y%M,p>0&&(y+=M-p),w.__size=y,w.__cache={},this}function D(w){const S={boundary:0,storage:0};return typeof w=="number"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),S}function r(w){const S=w.target;S.removeEventListener("dispose",r);const y=i.indexOf(S.__bindingPointIndex);i.splice(y,1),E.deleteBuffer(C[S.id]),delete C[S.id],delete B[S.id]}function G(){for(const w in C)E.deleteBuffer(C[w]);i=[],C={},B={}}return{bind:o,update:e,dispose:G}}function tS(){const E=pi("canvas");return E.style.display="block",E}function $a(E={}){this.isWebGLRenderer=!0;const A=E.canvas!==void 0?E.canvas:tS(),I=E.context!==void 0?E.context:null,g=E.depth!==void 0?E.depth:!0,C=E.stencil!==void 0?E.stencil:!0,B=E.antialias!==void 0?E.antialias:!1,i=E.premultipliedAlpha!==void 0?E.premultipliedAlpha:!0,Q=E.preserveDrawingBuffer!==void 0?E.preserveDrawingBuffer:!1,o=E.powerPreference!==void 0?E.powerPreference:"default",e=E.failIfMajorPerformanceCaveat!==void 0?E.failIfMajorPerformanceCaveat:!1;let t;I!==null?t=I.getContextAttributes().alpha:t=E.alpha!==void 0?E.alpha:!1;let a=null,s=null;const n=[],h=[];this.domElement=A,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=YC,this.physicallyCorrectLights=!1,this.toneMapping=Zg,this.toneMappingExposure=1;const D=this;let r=!1,G=0,w=0,S=null,y=-1,M=null;const p=new wI,U=new wI;let l=null,N=A.width,Y=A.height,z=1,q=null,f=null;const K=new wI(0,0,N,Y),H=new wI(0,0,N,Y);let j=!1;const EA=new bo;let Z=!1,x=!1,T=null;const F=new pI,J=new gI,_=new V,P={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function O(){return S===null?z:1}let m=I;function QA(R,W){for(let BA=0;BA<R.length;BA++){const v=R[BA],oA=A.getContext(v,W);if(oA!==null)return oA}return null}try{const R={alpha:!0,depth:g,stencil:C,antialias:B,premultipliedAlpha:i,preserveDrawingBuffer:Q,powerPreference:o,failIfMajorPerformanceCaveat:e};if("setAttribute"in A&&A.setAttribute("data-engine",`three.js r${Yo}`),A.addEventListener("webglcontextlost",SA,!1),A.addEventListener("webglcontextrestored",lA,!1),A.addEventListener("webglcontextcreationerror",qA,!1),m===null){const W=["webgl2","webgl","experimental-webgl"];if(D.isWebGL1Renderer===!0&&W.shift(),m=QA(W,R),m===null)throw QA(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}m.getShaderPrecisionFormat===void 0&&(m.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let X,tA,eA,hA,iA,MA,LA,dA,UA,mA,rA,RA,KA,DA,k,d,b,$,aA,cA,wA,sA,gA,JA;function GA(){X=new yw(m),tA=new cw(m,X,E),X.init(tA),sA=new CS(m,X,tA),eA=new IS(m,X,tA),hA=new Rw,iA=new TG,MA=new gS(m,X,eA,iA,tA,sA,hA),LA=new ww(D),dA=new dw(D),UA=new qh(m,tA),gA=new Dw(m,X,UA,tA),mA=new Mw(m,UA,hA,gA),rA=new Uw(m,mA,UA,hA),aA=new Nw(m,tA,MA),d=new lw(iA),RA=new xG(D,LA,dA,X,tA,gA,d),KA=new oS(D,iA),DA=new PG,k=new zG(X,tA),$=new rw(D,LA,dA,eA,rA,t,i),b=new AS(D,rA,tA),JA=new eS(m,hA,tA,eA),cA=new hw(m,X,hA,tA),wA=new kw(m,X,hA,tA),hA.programs=RA.programs,D.capabilities=tA,D.extensions=X,D.properties=iA,D.renderLists=DA,D.shadowMap=b,D.state=eA,D.info=hA}GA();const kA=new ES(D,m);this.xr=kA,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const R=X.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=X.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(R){R!==void 0&&(z=R,this.setSize(N,Y,!1))},this.getSize=function(R){return R.set(N,Y)},this.setSize=function(R,W,BA){if(kA.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=R,Y=W,A.width=Math.floor(R*z),A.height=Math.floor(W*z),BA!==!1&&(A.style.width=R+"px",A.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(N*z,Y*z).floor()},this.setDrawingBufferSize=function(R,W,BA){N=R,Y=W,z=BA,A.width=Math.floor(R*BA),A.height=Math.floor(W*BA),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(p)},this.getViewport=function(R){return R.copy(K)},this.setViewport=function(R,W,BA,v){R.isVector4?K.set(R.x,R.y,R.z,R.w):K.set(R,W,BA,v),eA.viewport(p.copy(K).multiplyScalar(z).floor())},this.getScissor=function(R){return R.copy(H)},this.setScissor=function(R,W,BA,v){R.isVector4?H.set(R.x,R.y,R.z,R.w):H.set(R,W,BA,v),eA.scissor(U.copy(H).multiplyScalar(z).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(R){eA.setScissorTest(j=R)},this.setOpaqueSort=function(R){q=R},this.setTransparentSort=function(R){f=R},this.getClearColor=function(R){return R.copy($.getClearColor())},this.setClearColor=function(){$.setClearColor.apply($,arguments)},this.getClearAlpha=function(){return $.getClearAlpha()},this.setClearAlpha=function(){$.setClearAlpha.apply($,arguments)},this.clear=function(R=!0,W=!0,BA=!0){let v=0;R&&(v|=16384),W&&(v|=256),BA&&(v|=1024),m.clear(v)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){A.removeEventListener("webglcontextlost",SA,!1),A.removeEventListener("webglcontextrestored",lA,!1),A.removeEventListener("webglcontextcreationerror",qA,!1),DA.dispose(),k.dispose(),iA.dispose(),LA.dispose(),dA.dispose(),rA.dispose(),gA.dispose(),JA.dispose(),RA.dispose(),kA.dispose(),kA.removeEventListener("sessionstart",NA),kA.removeEventListener("sessionend",uA),T&&(T.dispose(),T=null),VA.stop()};function SA(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),r=!0}function lA(){console.log("THREE.WebGLRenderer: Context Restored."),r=!1;const R=hA.autoReset,W=b.enabled,BA=b.autoUpdate,v=b.needsUpdate,oA=b.type;GA(),hA.autoReset=R,b.enabled=W,b.autoUpdate=BA,b.needsUpdate=v,b.type=oA}function qA(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function HA(R){const W=R.target;W.removeEventListener("dispose",HA),_A(W)}function _A(R){u(R),iA.remove(R)}function u(R){const W=iA.get(R).programs;W!==void 0&&(W.forEach(function(BA){RA.releaseProgram(BA)}),R.isShaderMaterial&&RA.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,BA,v,oA,fA){W===null&&(W=P);const bA=oA.isMesh&&oA.matrixWorld.determinant()<0,OA=_I(R,W,BA,v,oA);eA.setMaterial(v,bA);let PA=BA.index,XA=1;v.wireframe===!0&&(PA=mA.getWireframeAttribute(BA),XA=2);const ZA=BA.drawRange,$A=BA.attributes.position;let dI=ZA.start*XA,YI=(ZA.start+ZA.count)*XA;fA!==null&&(dI=Math.max(dI,fA.start*XA),YI=Math.min(YI,(fA.start+fA.count)*XA)),PA!==null?(dI=Math.max(dI,0),YI=Math.min(YI,PA.count)):$A!=null&&(dI=Math.max(dI,0),YI=Math.min(YI,$A.count));const Qg=YI-dI;if(Qg<0||Qg===1/0)return;gA.setup(oA,v,OA,BA,PA);let wg,FA=cA;if(PA!==null&&(wg=UA.get(PA),FA=wA,FA.setIndex(wg)),oA.isMesh)v.wireframe===!0?(eA.setLineWidth(v.wireframeLinewidth*O()),FA.setMode(1)):FA.setMode(4);else if(oA.isLine){let WA=v.linewidth;WA===void 0&&(WA=1),eA.setLineWidth(WA*O()),oA.isLineSegments?FA.setMode(1):oA.isLineLoop?FA.setMode(2):FA.setMode(3)}else oA.isPoints?FA.setMode(0):oA.isSprite&&FA.setMode(4);if(oA.isInstancedMesh)FA.renderInstances(dI,Qg,oA.count);else if(BA.isInstancedBufferGeometry){const WA=BA._maxInstanceCount!==void 0?BA._maxInstanceCount:1/0,UB=Math.min(BA.instanceCount,WA);FA.renderInstances(dI,Qg,UB)}else FA.render(dI,Qg)},this.compile=function(R,W){function BA(v,oA,fA){v.transparent===!0&&v.side===HQ?(v.side=ag,v.needsUpdate=!0,AI(v,oA,fA),v.side=hC,v.needsUpdate=!0,AI(v,oA,fA),v.side=HQ):AI(v,oA,fA)}s=k.get(R),s.init(),h.push(s),R.traverseVisible(function(v){v.isLight&&v.layers.test(W.layers)&&(s.pushLight(v),v.castShadow&&s.pushShadow(v))}),s.setupLights(D.physicallyCorrectLights),R.traverse(function(v){const oA=v.material;if(oA)if(Array.isArray(oA))for(let fA=0;fA<oA.length;fA++){const bA=oA[fA];BA(bA,R,v)}else BA(oA,R,v)}),h.pop(),s=null};let IA=null;function nA(R){IA&&IA(R)}function NA(){VA.stop()}function uA(){VA.start()}const VA=new Pa;VA.setAnimationLoop(nA),typeof self<"u"&&VA.setContext(self),this.setAnimationLoop=function(R){IA=R,kA.setAnimationLoop(R),R===null?VA.stop():VA.start()},kA.addEventListener("sessionstart",NA),kA.addEventListener("sessionend",uA),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(r===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),kA.enabled===!0&&kA.isPresenting===!0&&(kA.cameraAutoUpdate===!0&&kA.updateCamera(W),W=kA.getCamera()),R.isScene===!0&&R.onBeforeRender(D,R,W,S),s=k.get(R,h.length),s.init(),h.push(s),F.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),EA.setFromProjectionMatrix(F),x=this.localClippingEnabled,Z=d.init(this.clippingPlanes,x,W),a=DA.get(R,n.length),a.init(),n.push(a),iI(R,W,0,D.sortObjects),a.finish(),D.sortObjects===!0&&a.sort(q,f),Z===!0&&d.beginShadows();const BA=s.state.shadowsArray;if(b.render(BA,R,W),Z===!0&&d.endShadows(),this.info.autoReset===!0&&this.info.reset(),$.render(a,R),s.setupLights(D.physicallyCorrectLights),W.isArrayCamera){const v=W.cameras;for(let oA=0,fA=v.length;oA<fA;oA++){const bA=v[oA];eI(a,R,bA,bA.viewport)}}else eI(a,R,W);S!==null&&(MA.updateMultisampleRenderTarget(S),MA.updateRenderTargetMipmap(S)),R.isScene===!0&&R.onAfterRender(D,R,W),gA.resetDefaultState(),y=-1,M=null,h.pop(),h.length>0?s=h[h.length-1]:s=null,n.pop(),n.length>0?a=n[n.length-1]:a=null};function iI(R,W,BA,v){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)BA=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)s.pushLight(R),R.castShadow&&s.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||EA.intersectsSprite(R)){v&&_.setFromMatrixPosition(R.matrixWorld).applyMatrix4(F);const bA=rA.update(R),OA=R.material;OA.visible&&a.push(R,bA,OA,BA,_.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(R.isSkinnedMesh&&R.skeleton.frame!==hA.render.frame&&(R.skeleton.update(),R.skeleton.frame=hA.render.frame),!R.frustumCulled||EA.intersectsObject(R))){v&&_.setFromMatrixPosition(R.matrixWorld).applyMatrix4(F);const bA=rA.update(R),OA=R.material;if(Array.isArray(OA)){const PA=bA.groups;for(let XA=0,ZA=PA.length;XA<ZA;XA++){const $A=PA[XA],dI=OA[$A.materialIndex];dI&&dI.visible&&a.push(R,bA,dI,BA,_.z,$A)}}else OA.visible&&a.push(R,bA,OA,BA,_.z,null)}}const fA=R.children;for(let bA=0,OA=fA.length;bA<OA;bA++)iI(fA[bA],W,BA,v)}function eI(R,W,BA,v){const oA=R.opaque,fA=R.transmissive,bA=R.transparent;s.setupLightsView(BA),fA.length>0&&tI(oA,W,BA),v&&eA.viewport(p.copy(v)),oA.length>0&&aI(oA,W,BA),fA.length>0&&aI(fA,W,BA),bA.length>0&&aI(bA,W,BA),eA.buffers.depth.setTest(!0),eA.buffers.depth.setMask(!0),eA.buffers.color.setMask(!0),eA.setPolygonOffset(!1)}function tI(R,W,BA){const v=tA.isWebGL2;T===null&&(T=new mC(1,1,{generateMipmaps:!0,type:X.has("EXT_color_buffer_half_float")?sQ:qC,minFilter:aQ,samples:v&&B===!0?4:0})),D.getDrawingBufferSize(J),v?T.setSize(J.x,J.y):T.setSize(oo(J.x),oo(J.y));const oA=D.getRenderTarget();D.setRenderTarget(T),D.clear();const fA=D.toneMapping;D.toneMapping=Zg,aI(R,W,BA),D.toneMapping=fA,MA.updateMultisampleRenderTarget(T),MA.updateRenderTargetMipmap(T),D.setRenderTarget(oA)}function aI(R,W,BA){const v=W.isScene===!0?W.overrideMaterial:null;for(let oA=0,fA=R.length;oA<fA;oA++){const bA=R[oA],OA=bA.object,PA=bA.geometry,XA=v===null?bA.material:v,ZA=bA.group;OA.layers.test(BA.layers)&&EI(OA,W,BA,PA,XA,ZA)}}function EI(R,W,BA,v,oA,fA){R.onBeforeRender(D,W,BA,v,oA,fA),R.modelViewMatrix.multiplyMatrices(BA.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),oA.onBeforeRender(D,W,BA,v,R,fA),oA.transparent===!0&&oA.side===HQ?(oA.side=ag,oA.needsUpdate=!0,D.renderBufferDirect(BA,W,v,oA,R,fA),oA.side=hC,oA.needsUpdate=!0,D.renderBufferDirect(BA,W,v,oA,R,fA),oA.side=HQ):D.renderBufferDirect(BA,W,v,oA,R,fA),R.onAfterRender(D,W,BA,v,oA,fA)}function AI(R,W,BA){W.isScene!==!0&&(W=P);const v=iA.get(R),oA=s.state.lights,fA=s.state.shadowsArray,bA=oA.state.version,OA=RA.getParameters(R,oA.state,fA,W,BA),PA=RA.getProgramCacheKey(OA);let XA=v.programs;v.environment=R.isMeshStandardMaterial?W.environment:null,v.fog=W.fog,v.envMap=(R.isMeshStandardMaterial?dA:LA).get(R.envMap||v.environment),XA===void 0&&(R.addEventListener("dispose",HA),XA=new Map,v.programs=XA);let ZA=XA.get(PA);if(ZA!==void 0){if(v.currentProgram===ZA&&v.lightsStateVersion===bA)return Ag(R,OA),ZA}else OA.uniforms=RA.getUniforms(R),R.onBuild(BA,OA,D),R.onBeforeCompile(OA,D),ZA=RA.acquireProgram(OA,PA),XA.set(PA,ZA),v.uniforms=OA.uniforms;const $A=v.uniforms;(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&($A.clippingPlanes=d.uniform),Ag(R,OA),v.needsLights=JI(R),v.lightsStateVersion=bA,v.needsLights&&($A.ambientLightColor.value=oA.state.ambient,$A.lightProbe.value=oA.state.probe,$A.directionalLights.value=oA.state.directional,$A.directionalLightShadows.value=oA.state.directionalShadow,$A.spotLights.value=oA.state.spot,$A.spotLightShadows.value=oA.state.spotShadow,$A.rectAreaLights.value=oA.state.rectArea,$A.ltc_1.value=oA.state.rectAreaLTC1,$A.ltc_2.value=oA.state.rectAreaLTC2,$A.pointLights.value=oA.state.point,$A.pointLightShadows.value=oA.state.pointShadow,$A.hemisphereLights.value=oA.state.hemi,$A.directionalShadowMap.value=oA.state.directionalShadowMap,$A.directionalShadowMatrix.value=oA.state.directionalShadowMatrix,$A.spotShadowMap.value=oA.state.spotShadowMap,$A.spotLightMatrix.value=oA.state.spotLightMatrix,$A.spotLightMap.value=oA.state.spotLightMap,$A.pointShadowMap.value=oA.state.pointShadowMap,$A.pointShadowMatrix.value=oA.state.pointShadowMatrix);const dI=ZA.getUniforms(),YI=ri.seqWithValue(dI.seq,$A);return v.currentProgram=ZA,v.uniformsList=YI,ZA}function Ag(R,W){const BA=iA.get(R);BA.outputEncoding=W.outputEncoding,BA.instancing=W.instancing,BA.skinning=W.skinning,BA.morphTargets=W.morphTargets,BA.morphNormals=W.morphNormals,BA.morphColors=W.morphColors,BA.morphTargetsCount=W.morphTargetsCount,BA.numClippingPlanes=W.numClippingPlanes,BA.numIntersection=W.numClipIntersection,BA.vertexAlphas=W.vertexAlphas,BA.vertexTangents=W.vertexTangents,BA.toneMapping=W.toneMapping}function _I(R,W,BA,v,oA){W.isScene!==!0&&(W=P),MA.resetTextureUnits();const fA=W.fog,bA=v.isMeshStandardMaterial?W.environment:null,OA=S===null?D.outputEncoding:S.isXRRenderTarget===!0?S.texture.encoding:YC,PA=(v.isMeshStandardMaterial?dA:LA).get(v.envMap||bA),XA=v.vertexColors===!0&&!!BA.attributes.color&&BA.attributes.color.itemSize===4,ZA=!!v.normalMap&&!!BA.attributes.tangent,$A=!!BA.morphAttributes.position,dI=!!BA.morphAttributes.normal,YI=!!BA.morphAttributes.color,Qg=v.toneMapped?D.toneMapping:Zg,wg=BA.morphAttributes.position||BA.morphAttributes.normal||BA.morphAttributes.color,FA=wg!==void 0?wg.length:0,WA=iA.get(v),UB=s.state.lights;if(Z===!0&&(x===!0||R!==M)){const bI=R===M&&v.id===y;d.setState(v,R,bI)}let yI=!1;v.version===WA.__version?(WA.needsLights&&WA.lightsStateVersion!==UB.state.version||WA.outputEncoding!==OA||oA.isInstancedMesh&&WA.instancing===!1||!oA.isInstancedMesh&&WA.instancing===!0||oA.isSkinnedMesh&&WA.skinning===!1||!oA.isSkinnedMesh&&WA.skinning===!0||WA.envMap!==PA||v.fog===!0&&WA.fog!==fA||WA.numClippingPlanes!==void 0&&(WA.numClippingPlanes!==d.numPlanes||WA.numIntersection!==d.numIntersection)||WA.vertexAlphas!==XA||WA.vertexTangents!==ZA||WA.morphTargets!==$A||WA.morphNormals!==dI||WA.morphColors!==YI||WA.toneMapping!==Qg||tA.isWebGL2===!0&&WA.morphTargetsCount!==FA)&&(yI=!0):(yI=!0,WA.__version=v.version);let qg=WA.currentProgram;yI===!0&&(qg=AI(v,W,oA));let bC=!1,Yg=!1,gC=!1;const mI=qg.getUniforms(),ng=WA.uniforms;if(eA.useProgram(qg.program)&&(bC=!0,Yg=!0,gC=!0),v.id!==y&&(y=v.id,Yg=!0),bC||M!==R){if(mI.setValue(m,"projectionMatrix",R.projectionMatrix),tA.logarithmicDepthBuffer&&mI.setValue(m,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),M!==R&&(M=R,Yg=!0,gC=!0),v.isShaderMaterial||v.isMeshPhongMaterial||v.isMeshToonMaterial||v.isMeshStandardMaterial||v.envMap){const bI=mI.map.cameraPosition;bI!==void 0&&bI.setValue(m,_.setFromMatrixPosition(R.matrixWorld))}(v.isMeshPhongMaterial||v.isMeshToonMaterial||v.isMeshLambertMaterial||v.isMeshBasicMaterial||v.isMeshStandardMaterial||v.isShaderMaterial)&&mI.setValue(m,"isOrthographic",R.isOrthographicCamera===!0),(v.isMeshPhongMaterial||v.isMeshToonMaterial||v.isMeshLambertMaterial||v.isMeshBasicMaterial||v.isMeshStandardMaterial||v.isShaderMaterial||v.isShadowMaterial||oA.isSkinnedMesh)&&mI.setValue(m,"viewMatrix",R.matrixWorldInverse)}if(oA.isSkinnedMesh){mI.setOptional(m,oA,"bindMatrix"),mI.setOptional(m,oA,"bindMatrixInverse");const bI=oA.skeleton;bI&&(tA.floatVertexTextures?(bI.boneTexture===null&&bI.computeBoneTexture(),mI.setValue(m,"boneTexture",bI.boneTexture,MA),mI.setValue(m,"boneTextureSize",bI.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const vC=BA.morphAttributes;if((vC.position!==void 0||vC.normal!==void 0||vC.color!==void 0&&tA.isWebGL2===!0)&&aA.update(oA,BA,v,qg),(Yg||WA.receiveShadow!==oA.receiveShadow)&&(WA.receiveShadow=oA.receiveShadow,mI.setValue(m,"receiveShadow",oA.receiveShadow)),v.isMeshGouraudMaterial&&v.envMap!==null&&(ng.envMap.value=PA,ng.flipEnvMap.value=PA.isCubeTexture&&PA.isRenderTargetTexture===!1?-1:1),Yg&&(mI.setValue(m,"toneMappingExposure",D.toneMappingExposure),WA.needsLights&&rI(ng,gC),fA&&v.fog===!0&&KA.refreshFogUniforms(ng,fA),KA.refreshMaterialUniforms(ng,v,z,Y,T),ri.upload(m,WA.uniformsList,ng,MA)),v.isShaderMaterial&&v.uniformsNeedUpdate===!0&&(ri.upload(m,WA.uniformsList,ng,MA),v.uniformsNeedUpdate=!1),v.isSpriteMaterial&&mI.setValue(m,"center",oA.center),mI.setValue(m,"modelViewMatrix",oA.modelViewMatrix),mI.setValue(m,"normalMatrix",oA.normalMatrix),mI.setValue(m,"modelMatrix",oA.matrixWorld),v.isShaderMaterial||v.isRawShaderMaterial){const bI=v.uniformsGroups;for(let xC=0,cC=bI.length;xC<cC;xC++)if(tA.isWebGL2){const TC=bI[xC];JA.update(TC,qg),JA.bind(TC,qg)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return qg}function rI(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function JI(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(R,W,BA){iA.get(R.texture).__webglTexture=W,iA.get(R.depthTexture).__webglTexture=BA;const v=iA.get(R);v.__hasExternalTextures=!0,v.__hasExternalTextures&&(v.__autoAllocateDepthBuffer=BA===void 0,v.__autoAllocateDepthBuffer||X.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),v.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,W){const BA=iA.get(R);BA.__webglFramebuffer=W,BA.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,BA=0){S=R,G=W,w=BA;let v=!0,oA=null,fA=!1,bA=!1;if(R){const PA=iA.get(R);PA.__useDefaultFramebuffer!==void 0?(eA.bindFramebuffer(36160,null),v=!1):PA.__webglFramebuffer===void 0?MA.setupRenderTarget(R):PA.__hasExternalTextures&&MA.rebindTextures(R,iA.get(R.texture).__webglTexture,iA.get(R.depthTexture).__webglTexture);const XA=R.texture;(XA.isData3DTexture||XA.isDataArrayTexture||XA.isCompressedArrayTexture)&&(bA=!0);const ZA=iA.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(oA=ZA[W],fA=!0):tA.isWebGL2&&R.samples>0&&MA.useMultisampledRTT(R)===!1?oA=iA.get(R).__webglMultisampledFramebuffer:oA=ZA,p.copy(R.viewport),U.copy(R.scissor),l=R.scissorTest}else p.copy(K).multiplyScalar(z).floor(),U.copy(H).multiplyScalar(z).floor(),l=j;if(eA.bindFramebuffer(36160,oA)&&tA.drawBuffers&&v&&eA.drawBuffers(R,oA),eA.viewport(p),eA.scissor(U),eA.setScissorTest(l),fA){const PA=iA.get(R.texture);m.framebufferTexture2D(36160,36064,34069+W,PA.__webglTexture,BA)}else if(bA){const PA=iA.get(R.texture),XA=W||0;m.framebufferTextureLayer(36160,36064,PA.__webglTexture,BA||0,XA)}y=-1},this.readRenderTargetPixels=function(R,W,BA,v,oA,fA,bA){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let OA=iA.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&bA!==void 0&&(OA=OA[bA]),OA){eA.bindFramebuffer(36160,OA);try{const PA=R.texture,XA=PA.format,ZA=PA.type;if(XA!==Ng&&sA.convert(XA)!==m.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const $A=ZA===sQ&&(X.has("EXT_color_buffer_half_float")||tA.isWebGL2&&X.has("EXT_color_buffer_float"));if(ZA!==qC&&sA.convert(ZA)!==m.getParameter(35738)&&!(ZA===pC&&(tA.isWebGL2||X.has("OES_texture_float")||X.has("WEBGL_color_buffer_float")))&&!$A){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-v&&BA>=0&&BA<=R.height-oA&&m.readPixels(W,BA,v,oA,sA.convert(XA),sA.convert(ZA),fA)}finally{const PA=S!==null?iA.get(S).__webglFramebuffer:null;eA.bindFramebuffer(36160,PA)}}},this.copyFramebufferToTexture=function(R,W,BA=0){const v=Math.pow(2,-BA),oA=Math.floor(W.image.width*v),fA=Math.floor(W.image.height*v);MA.setTexture2D(W,0),m.copyTexSubImage2D(3553,BA,0,0,R.x,R.y,oA,fA),eA.unbindTexture()},this.copyTextureToTexture=function(R,W,BA,v=0){const oA=W.image.width,fA=W.image.height,bA=sA.convert(BA.format),OA=sA.convert(BA.type);MA.setTexture2D(BA,0),m.pixelStorei(37440,BA.flipY),m.pixelStorei(37441,BA.premultiplyAlpha),m.pixelStorei(3317,BA.unpackAlignment),W.isDataTexture?m.texSubImage2D(3553,v,R.x,R.y,oA,fA,bA,OA,W.image.data):W.isCompressedTexture?m.compressedTexSubImage2D(3553,v,R.x,R.y,W.mipmaps[0].width,W.mipmaps[0].height,bA,W.mipmaps[0].data):m.texSubImage2D(3553,v,R.x,R.y,bA,OA,W.image),v===0&&BA.generateMipmaps&&m.generateMipmap(3553),eA.unbindTexture()},this.copyTextureToTexture3D=function(R,W,BA,v,oA=0){if(D.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fA=R.max.x-R.min.x+1,bA=R.max.y-R.min.y+1,OA=R.max.z-R.min.z+1,PA=sA.convert(v.format),XA=sA.convert(v.type);let ZA;if(v.isData3DTexture)MA.setTexture3D(v,0),ZA=32879;else if(v.isDataArrayTexture)MA.setTexture2DArray(v,0),ZA=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}m.pixelStorei(37440,v.flipY),m.pixelStorei(37441,v.premultiplyAlpha),m.pixelStorei(3317,v.unpackAlignment);const $A=m.getParameter(3314),dI=m.getParameter(32878),YI=m.getParameter(3316),Qg=m.getParameter(3315),wg=m.getParameter(32877),FA=BA.isCompressedTexture?BA.mipmaps[0]:BA.image;m.pixelStorei(3314,FA.width),m.pixelStorei(32878,FA.height),m.pixelStorei(3316,R.min.x),m.pixelStorei(3315,R.min.y),m.pixelStorei(32877,R.min.z),BA.isDataTexture||BA.isData3DTexture?m.texSubImage3D(ZA,oA,W.x,W.y,W.z,fA,bA,OA,PA,XA,FA.data):BA.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),m.compressedTexSubImage3D(ZA,oA,W.x,W.y,W.z,fA,bA,OA,PA,FA.data)):m.texSubImage3D(ZA,oA,W.x,W.y,W.z,fA,bA,OA,PA,XA,FA),m.pixelStorei(3314,$A),m.pixelStorei(32878,dI),m.pixelStorei(3316,YI),m.pixelStorei(3315,Qg),m.pixelStorei(32877,wg),oA===0&&v.generateMipmaps&&m.generateMipmap(ZA),eA.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?MA.setTextureCube(R,0):R.isData3DTexture?MA.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?MA.setTexture2DArray(R,0):MA.setTexture2D(R,0),eA.unbindTexture()},this.resetState=function(){G=0,w=0,S=null,eA.reset(),gA.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class aS extends $a{}aS.prototype.isWebGL1Renderer=!0;class xo extends Bg{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(A,I){return super.copy(A,I),A.background!==null&&(this.background=A.background.clone()),A.environment!==null&&(this.environment=A.environment.clone()),A.fog!==null&&(this.fog=A.fog.clone()),this.backgroundBlurriness=A.backgroundBlurriness,this.backgroundIntensity=A.backgroundIntensity,A.overrideMaterial!==null&&(this.overrideMaterial=A.overrideMaterial.clone()),this.matrixAutoUpdate=A.matrixAutoUpdate,this}toJSON(A){const I=super.toJSON(A);return this.fog!==null&&(I.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(I.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(I.backgroundIntensity=this.backgroundIntensity),I}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(A){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=A}}class sS extends Kg{constructor(A,I,g,C=1){super(A,I,g),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=C}copy(A){return super.copy(A),this.meshPerAttribute=A.meshPerAttribute,this}toJSON(){const A=super.toJSON();return A.meshPerAttribute=this.meshPerAttribute,A.isInstancedBufferAttribute=!0,A}}class nS extends XI{constructor(A,I,g,C,B,i,Q,o,e){super(A,I,g,C,B,i,Q,o,e),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rS extends MQ{constructor(A){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new II(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new II(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new gI(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.lightMap=A.lightMap,this.lightMapIntensity=A.lightMapIntensity,this.aoMap=A.aoMap,this.aoMapIntensity=A.aoMapIntensity,this.emissive.copy(A.emissive),this.emissiveMap=A.emissiveMap,this.emissiveIntensity=A.emissiveIntensity,this.bumpMap=A.bumpMap,this.bumpScale=A.bumpScale,this.normalMap=A.normalMap,this.normalMapType=A.normalMapType,this.normalScale.copy(A.normalScale),this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this.specularMap=A.specularMap,this.alphaMap=A.alphaMap,this.envMap=A.envMap,this.combine=A.combine,this.reflectivity=A.reflectivity,this.refractionRatio=A.refractionRatio,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.wireframeLinecap=A.wireframeLinecap,this.wireframeLinejoin=A.wireframeLinejoin,this.flatShading=A.flatShading,this.fog=A.fog,this}}class As extends Bg{constructor(A,I=1){super(),this.isLight=!0,this.type="Light",this.color=new II(A),this.intensity=I}dispose(){}copy(A,I){return super.copy(A,I),this.color.copy(A.color),this.intensity=A.intensity,this}toJSON(A){const I=super.toJSON(A);return I.object.color=this.color.getHex(),I.object.intensity=this.intensity,this.groundColor!==void 0&&(I.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(I.object.distance=this.distance),this.angle!==void 0&&(I.object.angle=this.angle),this.decay!==void 0&&(I.object.decay=this.decay),this.penumbra!==void 0&&(I.object.penumbra=this.penumbra),this.shadow!==void 0&&(I.object.shadow=this.shadow.toJSON()),I}}const TE=new pI,Nt=new V,Ut=new V;class DS{constructor(A){this.camera=A,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gI(512,512),this.map=null,this.mapPass=null,this.matrix=new pI,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bo,this._frameExtents=new gI(1,1),this._viewportCount=1,this._viewports=[new wI(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(A){const I=this.camera,g=this.matrix;Nt.setFromMatrixPosition(A.matrixWorld),I.position.copy(Nt),Ut.setFromMatrixPosition(A.target.matrixWorld),I.lookAt(Ut),I.updateMatrixWorld(),TE.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),this._frustum.setFromProjectionMatrix(TE),g.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),g.multiply(TE)}getViewport(A){return this._viewports[A]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(A){return this.camera=A.camera.clone(),this.bias=A.bias,this.radius=A.radius,this.mapSize.copy(A.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const A={};return this.bias!==0&&(A.bias=this.bias),this.normalBias!==0&&(A.normalBias=this.normalBias),this.radius!==1&&(A.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(A.mapSize=this.mapSize.toArray()),A.camera=this.camera.toJSON(!1).object,delete A.camera.matrix,A}}const Kt=new pI,_B=new V,OE=new V;class hS extends DS{constructor(){super(new hg(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new gI(4,2),this._viewportCount=6,this._viewports=[new wI(2,1,1,1),new wI(0,1,1,1),new wI(3,1,1,1),new wI(1,1,1,1),new wI(3,0,1,1),new wI(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(A,I=0){const g=this.camera,C=this.matrix,B=A.distance||g.far;B!==g.far&&(g.far=B,g.updateProjectionMatrix()),_B.setFromMatrixPosition(A.matrixWorld),g.position.copy(_B),OE.copy(g.position),OE.add(this._cubeDirections[I]),g.up.copy(this._cubeUps[I]),g.lookAt(OE),g.updateMatrixWorld(),C.makeTranslation(-_B.x,-_B.y,-_B.z),Kt.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kt)}}class cS extends As{constructor(A,I,g=0,C=2){super(A,I),this.isPointLight=!0,this.type="PointLight",this.distance=g,this.decay=C,this.shadow=new hS}get power(){return this.intensity*4*Math.PI}set power(A){this.intensity=A/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(A,I){return super.copy(A,I),this.distance=A.distance,this.decay=A.decay,this.shadow=A.shadow.clone(),this}}class To extends As{constructor(A,I){super(A,I),this.isAmbientLight=!0,this.type="AmbientLight"}}class lS extends AC{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(A){return super.copy(A),this.instanceCount=A.instanceCount,this}toJSON(){const A=super.toJSON();return A.instanceCount=this.instanceCount,A.isInstancedBufferGeometry=!0,A}}class Jt{constructor(A,I,g=0,C=1/0){this.ray=new La(A,I),this.near=g,this.far=C,this.camera=null,this.layers=new Lo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(A,I){this.ray.set(A,I)}setFromCamera(A,I){I.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(I.matrixWorld),this.ray.direction.set(A.x,A.y,.5).unproject(I).sub(this.ray.origin).normalize(),this.camera=I):I.isOrthographicCamera?(this.ray.origin.set(A.x,A.y,(I.near+I.far)/(I.near-I.far)).unproject(I),this.ray.direction.set(0,0,-1).transformDirection(I.matrixWorld),this.camera=I):console.error("THREE.Raycaster: Unsupported camera type: "+I.type)}intersectObject(A,I=!0,g=[]){return to(A,this,g,I),g.sort(ut),g}intersectObjects(A,I=!0,g=[]){for(let C=0,B=A.length;C<B;C++)to(A[C],this,g,I);return g.sort(ut),g}}function ut(E,A){return E.distance-A.distance}function to(E,A,I,g){if(E.layers.test(A.layers)&&E.raycast(A,I),g===!0){const C=E.children;for(let B=0,i=C.length;B<i;B++)to(C[B],A,I,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yo);const Oo="Interact",Po="MoveUp",Wo="MoveDown",jo="MoveLeft",_o="MoveRight",Pi="Escape",Ni="axisX",Ui="axisY";class wS{eventBus;keyMap={KeyW:Po,KeyS:Wo,KeyA:jo,KeyD:_o,KeyE:Oo,Escape:Pi};constructor(A){this.eventBus=A,window.addEventListener("keydown",this.handleKeyUpDown(!0)),window.addEventListener("keyup",this.handleKeyUpDown(!1))}handleKeyUpDown=A=>I=>{this.keyMap.hasOwnProperty(I.code)&&this.eventBus.publish(this.keyMap[I.code],A)}}class oI extends kI{mesh;texture;normalMap=null;width;height;renderOrder;scale;lastModifer="buffer";modifier="buffer";material;constructor(A,I){super();const g=Object.assign({renderOrder:10,scale:1},I);this.renderOrder=g.renderOrder*10,this.scale=g.scale,this.width=A.width*this.scale,this.height=A.height*this.scale,this.texture=new nS(A.buffer.canvas),this.texture.minFilter=xI,this.texture.magFilter=xI,this.texture.wrapS=tQ,this.texture.wrapT=tQ,this.material=new rS({map:this.texture,transparent:!0});const C=new HC(this.width,this.height),B=new cg(C,this.material);this.mesh=B}destroy(){this.mesh.geometry.dispose(),this.mesh.removeFromParent()}}oI.register();const GS=function(E,A,I,g){var C=I-A;return(E/=g/2)<1?C/2*E*E+A:-C/2*(--E*(E-2)-1)+A};class Ug extends kI{relativePosition;center;constructor(A,I){super(),this.relativePosition=A??{x:0,y:0},this.center=I??{x:0,y:0}}moveTo(A,I,g){const C=this;return new Promise(B=>{eC.add(function*(){let i=0;for(;C.relativePosition.y!=I;)C.relativePosition.y=GS(i,A,I,g),i++,yield;B()})})}}Ug.register();const SS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVR42mNgoBZgY+P4TwrG0Px1wfT/e7xmgzGI/SKrGEyDMAjA2DB1KIaAOMiaYTi3tBcD4zUAZhsIgBRv3nkRjkFASUYK7joMA2ASuDSDxEAGwLyDYQDMz7g0EzQAn83IBuD0AjGaYbZjDURiNMMAVhcQpfmqI5yJ1QCCmmEYmwH4/EyUC7BphkUtKNCQAUYgUpyZKAEAus7mhewu/wUAAAAASUVORK5CYII=",Is=Object.freeze(Object.defineProperty({__proto__:null,default:SS},Symbol.toStringTag,{value:"Module"})),dS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApUlEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbJB+OuC6XA2iiEwA0AakLGSjNT/3NJeFAwzFMMAZI0gm0CaN++8CMcgABIDyYHU4HQBSAG6ASAAsh1mAE4vwDSCaJAGdM0gjNMLyLbCFKPbDHM+Vi9g8zMs4NANwOoCXJqRDYCFEVYXENKM7HycLiBGM84wwOds9DSC1QXYNONL2ljzA9mZiRIAAOGtoXPEv/CWAAAAAElFTkSuQmCC",gs=Object.freeze(Object.defineProperty({__proto__:null,default:dS},Symbol.toStringTag,{value:"Module"})),yS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlklEQVR42mNgoBZgY+P4TwrG0Bx50BSOr31KQWGjY5A4iiEgjlSVHVgCRCPj3NJeFDYIgwzBMADdBSAMUrx550U4BgElGSnsBsCchk8zSAynATBngiSRvYCsGa8BMNtx2UzQAFI044wFmJNBNLpmZIDVAHw2w8FVRzgTpwHYnA3XDMO4DMDlZ6JcgEszDOMNA4ozEyUAAHjqyy/cMsB1AAAAAElFTkSuQmCC",Cs=Object.freeze(Object.defineProperty({__proto__:null,default:yS},Symbol.toStringTag,{value:"Module"})),MS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnElEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKwfTXBdPhbHQ5EEYxBGYASAEIgzRvUdCCGwITg9FYDYBJwjDMAHQ+zECsLiDWALxegCmGYWx8nF7AZQAIIPPxegFZMwwryUjBaZwuQDYA2UaYrTDNBAMRRCNrRg9cgtEIsglmCIiG2QzDeF2AbAgMIycgvC5ATq7oNhJMyhRnJkoAACqmk82VLox6AAAAAElFTkSuQmCC",Bs=Object.freeze(Object.defineProperty({__proto__:null,default:MS},Symbol.toStringTag,{value:"Module"})),kS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlklEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbLR+SiGwAwAKUDGXxdMxxCDGYJhALICIQUFOAYZAmMjq8HpApBCZAAyAAZghuD0ArpmmAvQxbAagE0zshfQ5bAacOvBK4IGgNRgNQDmhdzSXrAimEKQATA+SA4WDngDEdkQmAHImmkbjcRgnNGInFzRabxJmeLMRAkAAG7jnJSE+nQ1AAAAAElFTkSuQmCC",Qs=Object.freeze(Object.defineProperty({__proto__:null,default:kS},Symbol.toStringTag,{value:"Module"})),RS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnklEQVR42mNgoBZgY+P4TwrG0Bzl5/K/Mj30PwgsaEuCs0EAxAaJwdggtSiGgDggCWSF/z4fQMHIBoMwhgEwBcgakAFMHGYBhgEwTdg0IxsCozEMgNlOCMBcgTUMiAU4w4BYF+AMA1wBiB6QOMMAPQrRNcJiCm8YwAIJOVDR+XjDAJaYkA1EFsMbBrDkDKJBGKYYxofJYYQBxZmJEgAAh7YcOal4sO0AAAAASUVORK5CYII=",is=Object.freeze(Object.defineProperty({__proto__:null,default:RS},Symbol.toStringTag,{value:"Module"})),FS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVR42mNgoBZgY+P4TwrG0Fxp1QDGe7xmY2Wj81EMgRkAUgDCL7KK/6MDkBhMHqsB2DTfevAKjGFsZENwugCkCKYRxIYZiGwAXi/ANCFjogyAOQ3dEGTvEO0FXJpJ9gK6ZqJcgCsciI5G9OgEuQBdjqALYBgWnejiOMMAObmi03iTMsWZiRIAANAWx1cOuzr3AAAAAElFTkSuQmCC",Es=Object.freeze(Object.defineProperty({__proto__:null,default:FS},Symbol.toStringTag,{value:"Module"})),pS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAo0lEQVR42q2TwQ2AIAxFPRHnMG6gA+jVq+O5imu4jUmFpiWVthijP2kE0j76QZrmL4XQwptQxX03AhwzwDnBNKw45285TnGDMAAhEZBAqcCKKoCTUAZEdqcAmEBFaEVALJgJKHcr7chx3QIdplR5DgrA/rLIxr5sN+BjB5YyhADuLXCyLOCivB7l3wIBvH+AAa4FDyC7cDtggLe7hCnA58f0RRcP3Iu6uxWPbQAAAABJRU5ErkJggg==",os=Object.freeze(Object.defineProperty({__proto__:null,default:pS},Symbol.toStringTag,{value:"Module"})),NS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVR42mNgoBZgY+P4TwrG0LxFQeu/crrff6OWlP9nvz8C08hsGA1SA8IohoA4IEGQISCFMIzMh7FhhmAYAJIAKYIpBNH37ZTBGF0cpBbDAGRbYJpBAEajuw6rC9A1IwNkA7C6ABYG2DQryUjBMU4XwPwJ8zM2zTCMMxCR/QgyCJtmEMYZiMhhAGKDFCO7AsbGG4jImCQXIKdCQgbgTInYkjI2zRgGUJyZKAEAdXKV0kCKxsMAAAAASUVORK5CYII=",es=Object.freeze(Object.defineProperty({__proto__:null,default:NS},Symbol.toStringTag,{value:"Module"})),US="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVR42mNgoBZgY+P4TwrG0Fxp1QDGe7xmY2Wj81EMgRkAUoCMX2QVw9kgAGNjNQBZoZCCApwNMwQmBsM4XQDSAFIMo5HZMMOwugBmA0gRsmZkQ2C2g/hYDUDHMIBNDqsXYJqQaWxiOL1AkQuQQxmbJlgYwOTwRiNybMA0I6cDvNGIrpDohISeXNFpvEmZ4sxECQAAGyt/fCIFT4kAAAAASUVORK5CYII=",ts=Object.freeze(Object.defineProperty({__proto__:null,default:US},Symbol.toStringTag,{value:"Module"})),KS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVR42mNgoBZgY+P4TwrG0PxzsTQc/7/qiMFGFgNhFENgBoBAbmkvGIMBUBMMIIvjNACk4NaDV2AM0wDDm3deBGMQG6sBINtgCmGGgDBMI0wzzBU4XQBTjG4AsmtwukBJRgrFRnSNIAxSgzMMQJLIrkA3wCskCawGZBnOWEA3BCVWoACnF2DeQA55FM1I0YrdBVAFyIaAnA3XDMO4DEA3BIaJdgG+5Is3DCjOTJQAAO6w2PnlboH3AAAAAElFTkSuQmCC",as=Object.freeze(Object.defineProperty({__proto__:null,default:KS},Symbol.toStringTag,{value:"Module"})),JS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuUlEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbLR+SiGwAz4umD6/9zSXjAGsZExsjhWA0CmgxTcevAKjEEKvUKS4Bo377wIxiA2SC1WF8AUwgxQkpGCa4RpBmGcXkC2Cd0QmGacBoCchWwjyPno3gBhkBqcXgBJIrsCpBkmBsIwPt5YQDcExodpBqnB6QJkA2CGwDQjG4AzDEAY3RB0zTB1WF2AbggyRtaMMwyQkys6jTcpU5yZKAEAIj6Jsuiz3QwAAAAASUVORK5CYII=",ss=Object.freeze(Object.defineProperty({__proto__:null,default:JS},Symbol.toStringTag,{value:"Module"})),uS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtElEQVR42mNgoBZgY+P4TwrG0Jxb2gvHXiFJ/4vFdf+/yCoG0zCMzEcxBMQBAXRDvi6YDtaEjrEasHnnRbyGoBuG1QBchoAAyACYIThdgM0QmCuQXYDVACUZKbBmEA3CMENgBoAAslcwDACZCtIIsw1mEIxP0AsgQXTFMJtBNMglIIwzEGHxjO5cmGuQvYPVBchRhBxgsLABAaJcgIxhzoeFB8wAnGGAnFzRabxJmeLMRAkAABbmqHwuhHTsAAAAAElFTkSuQmCC",ns=Object.freeze(Object.defineProperty({__proto__:null,default:uS},Symbol.toStringTag,{value:"Module"})),fS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVR42q1TuQ2AMAykipiHfegYhZaGRejZgQ2oWIIy6JBOuiROIp6TLBxjn584TfMXnGv9E0mCu3HwAL79Mt0CPT7TJyAhAR3gPO9rILAxOEvATMB2Hp6grpUkBPyJbHEAoJVAigQMJpQkWwFbqCFbAaEtKGBjddUhahtx+cUhWv1aczFbACsdrVugDT7ZFvS6dGksuzlEXV1k5Bm6rjZgvofXj+kLLlRR7oG8nboyAAAAAElFTkSuQmCC",rs=Object.freeze(Object.defineProperty({__proto__:null,default:fS},Symbol.toStringTag,{value:"Module"})),qS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyElEQVR42mNgoBZgY+P4TwrG0PxzsTQY/7/q+B8EkPlgGgSgbBBGMQRmAEyzRswRuAaY2K8sLhRDMAyAKVSZfw+M4YZANcMwzBBMA6A2L/tzG24ACMM0gmxFNgSnAciaYQbA/A0zBKsBsIBC1gwD2AITZxgoyUjBMQzklvbCMcxArF6I8nP5v6AtCUyDMMiQ7snr/6MDggaAMMwVKAZAXYkzEEEa0A2BGwBLE1BDcAYizBDkMCDKBfCki+ZXlNCHApge6mUmSgAAUADfbUlt0HUAAAAASUVORK5CYII=",Ds=Object.freeze(Object.defineProperty({__proto__:null,default:qS},Symbol.toStringTag,{value:"Module"})),YS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtElEQVR42mNgoBZgY+P4TwrG0Pz/qiMY/1wsDcdgMSDwCkkC03AxIEYxBNkAmCEwzbmlvRiasRqArgDddmQxEMBqAIohUKCiZALGMAByEchQ/C4AghdZxf/3eM0GawBhkCFw12BzAbrmrwumww2ptGqAa8QfiEAA0gDCyJrhXiAYiEhOh2nGZgBILU4DQBoIacZrgINxMBijhD5a9GI1AD360AONYELCmZRxiGHND2RnJkoAANi/35dDMBG3AAAAAElFTkSuQmCC",hs=Object.freeze(Object.defineProperty({__proto__:null,default:YS},Symbol.toStringTag,{value:"Module"})),mS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApklEQVR42q1TQQ5AMBB0EmdXl/7DhSd5k084+gQfcSKidGNl1K4SmkyKzUx3xjaK/lpxnNg3uJDHOiPYrjx2OxcEv+ZwEmEBIjE2YlXmBBKCmiggkZehJUgiuoBHlkR0C0Ce+samxhDcM4roFrYiE9zOGeA37uLWApOxfSSLAvjr0IbffjADd5KWQdiClwEP0qMM0AKfjAJIVi2oI7y/q6P8+TJ9WSul5sR8Z5rQSwAAAABJRU5ErkJggg==",cs=Object.freeze(Object.defineProperty({__proto__:null,default:mS},Symbol.toStringTag,{value:"Module"})),LS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAu0lEQVR42q1TwQnDMAzMK2SDPvoJ9FfICiGdKSN1ha7Sd+coBNyc8JmLLQdKIjgky7qzYitNc5a1bRf+QUGeL0N49Xfzn/FmMTyAnOYRb0SwwIaSgO/zWqxZ5wqgKLwfiaCxwhXwTg3LtBHSPVdACxATuZAroJ8AAon5PSBXvYN04iqSC2jsvgKfCYXswjzFot8VYBckmkgUInn3GQm2n7CazoArwA4Is0jWfHUSOa4s8Ej0hcDhn+mI/QCXzI2zeKKWigAAAABJRU5ErkJggg==",ls=Object.freeze(Object.defineProperty({__proto__:null,default:LS},Symbol.toStringTag,{value:"Module"})),HS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVR42mNgoBZgY+P4TwrG0FwsrgvH9+2U4XiLghYcI6tBMQTZAJCmn4ulwRjZAJiBeA34f9URrBFEo2tGNhBEYxgAkgCDPw4oCrFpBvGxugCmAFkhsneQXYfTAHTNyN4BuQ4kBmJj9QI2zeiBCYsNrC5AdiZMM8xGggaAJOCaQQCL7ciGYY9GoB9hMYEcGzD/E/QC2BAoQHc2emrEaQAsNtDZeJMyxZmJEgAAkcJ7a7A2HjUAAAAASUVORK5CYII=",ws=Object.freeze(Object.defineProperty({__proto__:null,default:HS},Symbol.toStringTag,{value:"Module"})),bS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVR42mNgoBZgY+P4TwrG0Pzk0qr/xzd0/4cBfGyQWhRDQByYolsPXoExjN09eT2YDaJhbJBaDANApiIrhOHc0l4UTLQBIMUw2iskCcUArF5ANgCmEKYZBGCGEG0AzP8wlxA0ABaIQgoKOA0AyREMA5AidFfAbIcZgNMFuLyB7nycLsDmCmy2Y3VBZXooGGMzBFkzTB1WF6AbggzQ5bHmB7IzEyUAALXA5Ksb9J7eAAAAAElFTkSuQmCC",Gs=Object.freeze(Object.defineProperty({__proto__:null,default:bS},Symbol.toStringTag,{value:"Module"})),vS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjUlEQVR42mNgoBZgY+P4TwrG0OxgHAzHlVYNYLzHazYYw/jIalAMQTYApgFE//t8AIyRxfAaALMRphkGYIbAMFYDkJ0NAugugInB1OF0AQwg24gujtUFyE6HOR9ZM7JrQBivAcg0LjGCgYgNwwzAG4joNqPHAMFAxBeNeF2AKyEh20wwIZGdlCnOTJQAAPRTtMSOtvn9AAAAAElFTkSuQmCC",Ss=Object.freeze(Object.defineProperty({__proto__:null,default:vS},Symbol.toStringTag,{value:"Module"})),xS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVR42mNgoBZgY+P4TwrG0Fxp1QDGe7xmw9kvsorhbHQ5FENgBoAASBFIo4hJChyD+CBxmDxWA0ASyJqX/bkNxyA+MgCpw+oCbJpBWGX+PbghOF2AbIDCteNgDNIMo5G9gtMLMAM0Yo6AbYUZAGKDxEBsmEFYXQBzPkghzBBkg0BiQgoKuL2A7HyYreiuABmA1wUgxSCA7AJ0zXjDABkga4RphkU3VhcgGwLTBNOInJhwhgFycoU5FTk540zKFGcmSgAASaek9f3laZcAAAAASUVORK5CYII=",ds=Object.freeze(Object.defineProperty({__proto__:null,default:xS},Symbol.toStringTag,{value:"Module"})),TS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVR42mNgoBZgY+P4TwrG0CxikgLHGjFH4Oxlf25jiIEwiiHIBoA0gBTjwjADMQzApRhmILLBeA2AKUQH6C7DMADdJlwGwGisLoABXAYgy2N1AbEApJb6BuDzP7aAxJoO8GlG9j/OhIRsALJt6N4jGAswzchJG28sUJyZKAEAdwzxEouwL4IAAAAASUVORK5CYII=",ys=Object.freeze(Object.defineProperty({__proto__:null,default:TS},Symbol.toStringTag,{value:"Module"})),OS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVR42mNgoBZgY+P4TwrG0Lzsz20wVpl/D47xiaEYgmwATAMyH5sYhgHoCv5fdfz//48DBAPZ6IZhNQBmCFgTOgCKIXsHrwvwGYDTBRjORwdo3qC+AVgDEYdmgoEIwt2T1//fvPMiGIPY6GmCoAtyS3v/e4UkgTGITdAFFCckipIyxZmJEgAAGEgLLTY0+7kAAAAASUVORK5CYII=",Ms=Object.freeze(Object.defineProperty({__proto__:null,default:OS},Symbol.toStringTag,{value:"Module"})),PS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVR42mNgoBZgY+P4TwrG0KwSZP1fqsruv8gCPTgG8WFiyDRILYohIA5MQeRBUzD9/48DnA2jkQ3GMACmEIRBmsEAagg6DVKLYQBM87VPKWAMUjzntjMYw/jIhmL1AkwSZhBYExCD2MguwOoFFJuQNKG7DMQGqcVqANyZUKciGwjTCPMaTi8gG4DsAphmkKFYvQAShLsCKdSRAxVmMFYDkG1C1wCLDWRX4U0HyOkBW8BidQFyUoYlYeSkjTcpU5yZKAEAxemqSkB41HMAAAAASUVORK5CYII=",ks=Object.freeze(Object.defineProperty({__proto__:null,default:PS},Symbol.toStringTag,{value:"Module"})),WS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAk0lEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbLR+SiGwAwAKUDGXxdMxxCDGYJhALICIQUFrBhZDU4X4NKMbAheL4AUHd/QDcYwTch8gl4AKXpyaRVWjOwNorywoC0JjEn2AsUuAPkXpKEvKAiMQWyiwwDZEBgfWTNBF6CnhWV/bmNoxhkGyMkVncablCnOTJQAAKI7eWQLCaydAAAAAElFTkSuQmCC",Rs=Object.freeze(Object.defineProperty({__proto__:null,default:WS},Symbol.toStringTag,{value:"Module"})),jS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVR42q1TOwrDMAzNFDKHHsBDhhwgx+nYe2XLSQq5QZZAT1JIecMzz5Y0FEfwkI30nj7YXXeX9f1w/QNDHlO6YPCP5VV4GM9EIYKLGpIjhAJaCZjWTxbcvqcRMQKaoERCY/CuAKuSlI49Q8kwIwCyR8R9fr6LDtwRSIBQDW+ZrgBH0MocifFwiQiCwE5wrkfSUYwAEilCcj0WOwp3ULdMsi4yfEgRmcJA+JSbP1OL/QDiSZvrYv+rGAAAAABJRU5ErkJggg==",Fs=Object.freeze(Object.defineProperty({__proto__:null,default:jS},Symbol.toStringTag,{value:"Module"})),_S="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoklEQVR42mNgoBZgY+P4TwrG0CxVZfc/8qApGF/7lAKmYQBZDIRBalEMAXGQNYMwCET5uYAxCMDEYeqwGgDTCNO8oC0JjGGGwAzCagBMs1dIEl4MMwTDAJjm3NJeMO6evB4D33rwCm4IXgNwaaafAdgMQQcEAxEWhcgx8P+qI24DsEUjigEgzTCMywBkQ2DpgGgXICdlfAkJBDCSMsWZiRIAAEaz1VyW1m/wAAAAAElFTkSuQmCC",ps=Object.freeze(Object.defineProperty({__proto__:null,default:_S},Symbol.toStringTag,{value:"Module"})),VS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAj0lEQVR42mNgoBZgY+P4TwrG0FyZHgrHTy6tguMFbUlgMRgNwyiGIBsAAkIKCnAMAiDNMIzXAJCNyJphGOYSZEMwDABJoNuOyxUgjNUFxBqA0wsgSXRvgPjIAOYdrF6AYZhLYDGBLUyIdgE2b4EAVhfgigWiDMAXiER7AV8sILNJTkiw0AdhrCmR4sxECQAAGvh0YwuEn50AAAAASUVORK5CYII=",Ns=Object.freeze(Object.defineProperty({__proto__:null,default:VS},Symbol.toStringTag,{value:"Module"})),ZS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoUlEQVR42q2TMQqAMAxFOxXPIE5Ogpsn0PvP3kaopiTht00DooEPbeh/TWIN4a+IcUhv1JjnaVRt66LrdB5ZmCMVEARkw7VnQ15LMKgLkFtEYtY9xnNBA7DMCCUTVmO2oGY6zIYCTDluow+oTVVrIreFAsCBObcCNfGXsCAmoDjMZYtJBwjtuEO0BoczcR9SbxZYfhcgdDmIBvcpf/6ZvsQNfGtlzvaUSzwAAAAASUVORK5CYII=",Us=Object.freeze(Object.defineProperty({__proto__:null,default:ZS},Symbol.toStringTag,{value:"Module"})),zS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVR42mNgoBZgY+P4TwrG0CxikvJfZf69/8hg2Z/bYIwMQGpAalEMAXFgmufcdgbjyIOmcE3oYiC1GAaAgMgCPbAiGIYBZDGQGhDAaoCQggLcEBAtVWUHxshiBA0AaQDRIAxzOowPk8NqAEZgBVnDnQ1iowcuVhcgBxaIRvYCekASDERYGIBsRw8HgoEI0wziwwyAGYIzDGDpABZgyIYhi+FMByBB9JQIsxU9JWI1AJaUQRg5CSMbApPHSMoUZyZKAAA1dq+V1bDcZAAAAABJRU5ErkJggg==",Ks=Object.freeze(Object.defineProperty({__proto__:null,default:zS},Symbol.toStringTag,{value:"Module"})),XS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVR42mNgoBZgY+P4TwrG0CxikgLGGjFH/qvMvwemQXwYe9mf23AxEEYxBGYATDMujGwIhgEgCRAAKYIpRsYgMRCAuQjDAJgimGaYYphGZHkQxuoCbJqxGYLVBTDNyE7FZhhIDGcgojsTBtANpZ0XiA1EEBuvC3BFI8xgrC6AJSRszkfGOBMSclKGpTiQBmzJG8MAijMTJQAAC6HHZPoQKAgAAAAASUVORK5CYII=",Js=Object.freeze(Object.defineProperty({__proto__:null,default:XS},Symbol.toStringTag,{value:"Module"})),$S="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnUlEQVR42q1TQQqAMAzzJD7Dgwcf5d+8+RLBH3gRfImgRAjErp3ILITh1ibpVqvqr6jr5vyCpLgf5gTturj7wINECbpxvzEd24nAim+ehQRIhCKSsJKAJNzjueuA6upAXRCuAxZZ9chFQkD7Vt1z4bag/UehOeEdeOrWRfYV3giY47aQc6HqYQs6eaoG2OkMJ5GFtoBk7iQW/0wlcQHOPurBXIvmigAAAABJRU5ErkJggg==",us=Object.freeze(Object.defineProperty({__proto__:null,default:$S},Symbol.toStringTag,{value:"Module"})),Ad="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAk0lEQVR42q2TQQqAIBBFW0nrtm08Sp21M3WYIJiaUPk6X6Tsw2A0M8/5isPwl5wb5U2YZtlXObY5rRhyLiaXQR4AFLGGEmQAqUgBKl3jN8JDUEAquBsm77OI/+NU1gI0qygApqFnkIoZAPPMAhu7FlpLLXQDav7RWvUW4gk3dw8QPgHsXqptobgFJszT9/D5MfXoAvYElGMPDu0IAAAAAElFTkSuQmCC",fs=Object.freeze(Object.defineProperty({__proto__:null,default:Ad},Symbol.toStringTag,{value:"Module"})),Id="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAw0lEQVR42q2TPQrCQBBGUwVrW5tAbmEh1h7F1sou90jpNbyLrVcQhOg3+MK3ZleUODDMMDvz5oekqv4ldb0YftFJ8XHdhZ53/ehfNm1i/S2BAFCiktDbaZVYNAvwxOv+ELDhvo2YLHByshOQIIAsxQAUl/9xBRXRfdk0oUyiOPfIrhDdnkLnEWAxVslOIKEA3yeQX5wgANaVAocQL07ADRzkQMnXN3jv7Lco3+CVDCjE9ueteAPvxBeH9aNOALN/pjnyAEjGlh3XvpdWAAAAAElFTkSuQmCC",qs=Object.freeze(Object.defineProperty({__proto__:null,default:Id},Symbol.toStringTag,{value:"Module"})),gd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVR42mNgoBZgY+P4TwrG0Fxp1QDGe7xmY2Wj81EMgRkgpKAAxyDF6HwYxmoATMP/Pw5gDNOIzEc2BKsLYIb8XCyNYggyH6cLkA0A23zVEdUlSHz8XgApRMLoYjBXEPYCVDE6n6AXXmQVwzWBMLIhMD5eF6AbghyVMD7OMEDGMENAGJlNMBqJwTjDADm5otN4kzLFmYkSAABs4njrND1JuwAAAABJRU5ErkJggg==",Ys=Object.freeze(Object.defineProperty({__proto__:null,default:gd},Symbol.toStringTag,{value:"Module"})),Cd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVR42mNgoBZgY+P4TwrG0Bx50BSM59x2BmNkPoxGBiiGwAyAaUbG1z6lwDWB+CIL9LAbgKwBhJE1gwwHaQRhIQUF4gyAaQaJdU9eD9acW9oLF8PrBWSbQZpBGkEYZjtIHKcByH7GphlmCU4vwDTCNIM0ImsGWYDVBTCbQRpBGpBtBQFYwOJ0AchUXM5GDliCBhhbOoIxsmb06MVpAMwQXM5GTqU4DUBPvriSONb8QHZmogQAAGsZx4SpkYDiAAAAAElFTkSuQmCC",ms=Object.freeze(Object.defineProperty({__proto__:null,default:Cd},Symbol.toStringTag,{value:"Module"})),Bd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAr0lEQVR42mNgoBZgY+P4TwrG0Fxp1QDGe7xmY2Wj81EMgRkAUoCMX2QVY4jBDMEwACYpskAPjGEGgPC1TylwMRjG6gKQIpDiyIOm/6Wq7OAGgMRhfJwugBkA0oysARkT5QWQRnTbkTFeLyD7G6YZBGDegrkObyzANMJokGZkA0Cuw+sCZFeAFMM0IocN3jBANgSkGDlgYQYQdAEyhgUqDOONRuTkik7jTcoUZyZKAAACKYrsEMrR8wAAAABJRU5ErkJggg==",Ls=Object.freeze(Object.defineProperty({__proto__:null,default:Bd},Symbol.toStringTag,{value:"Module"})),Qd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVR42q1TsQ2AMAzrVDEzMvUJVv5g5wouY+UJDmFkKTKSpTQkRQgsWaA0tkxSQvgLMTb5DW/iY1sKAnxa74UJDWSDxW2f8rj2vkFNSHE3D7YBwWaZSIrblK6amQBNoDShmAZuAhRxKE0ALUaC6gzQQJEUo8745ifIVbFZDk3zcQsAY+v1ukPUQApt4l4kDzTR+Nfg88/0BSfItP6SGMpGNwAAAABJRU5ErkJggg==",Hs=Object.freeze(Object.defineProperty({__proto__:null,default:Qd},Symbol.toStringTag,{value:"Module"})),id="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeUlEQVR42mNgoBZgY+P4TwrG0Fxp1QDGe7xmY2Wj81EMgRkAUgDD6ABZDqsBuDTiMginC4gxAKcXiAG3HrzC7QUYyC3txUrDDMDpBYpcQEwYwGwnKxBBmkFewRuN6IqRMXI6wBsGyM7EhXGGAXJyRafxJmWKMxMlAAAIh/fRi2gXnQAAAABJRU5ErkJggg==",bs=Object.freeze(Object.defineProperty({__proto__:null,default:id},Symbol.toStringTag,{value:"Module"})),Ed="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbKFFBTAGMZHMQRmAEgDMv66YDqYBmmEAZghGAYga4TZho6RDcHpAnyakL2B14DjG7rBGJshsHDB6QWQoieXVmHFMANAmCgvLGhLAmNkMZwuQDaAYheA/I+uGRYmBMMAmyHImgm6AFdaQJbDGQbIyRedRmdjzQ9kZyZKAACi939TvSDHdQAAAABJRU5ErkJggg==",vs=Object.freeze(Object.defineProperty({__proto__:null,default:Ed},Symbol.toStringTag,{value:"Module"})),od="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkElEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbLR+SiGwAwAKQDhrwumwzFMDCYOMwTDAGRFyABmEIwNAiB1WF0AUyCkoADHMABjw2isBsAUIDsb3RCcBiBrRnYBsiEkGYBOo3sLpwHIXkDXiNcA5DDAh0EAZzRiiwV0zbC0gDch4QJ4ExIxyRdnUqY4M1ECABygj9kT1D/8AAAAAElFTkSuQmCC",xs=Object.freeze(Object.defineProperty({__proto__:null,default:od},Symbol.toStringTag,{value:"Module"})),ed="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAj0lEQVR42mNgoBZgY+P4TwrG0FwsrgvGL7KKsbLR+SiGwAwAKYBhEEDmI2OsBsAkbz14Bdf8dcH0/zAAYiMbgtUFMM0gxegY2RCcXkDWjAyQxfB6AZsB6K4g2QvoLsHrBeRAxBYOyLGDNxphhqB7CSROMBqRDUE2CKYZbxjgSjhEJST05IpO403KFGcmSgAAJg/VB/oroD0AAAAASUVORK5CYII=",Ts=Object.freeze(Object.defineProperty({__proto__:null,default:ed},Symbol.toStringTag,{value:"Module"})),td="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVR42mNgoBZgY+P4TwrG0OxgHAzHlVYN//d4zUZhgzCMDaJRDIEZAJNE1oSMYXIgtXgNwKYZ3RUYBsBMhykAAZgmZDZOA9D9S8gVOA2A+ZHkMEAOYRUlEwzXgDTBxHEGIswGkEIYBmmGsZHDCW8gIhuArhlmEYYB2DThM4igAcheQsdYwwCbRuSkjUxjGEBxZqIEAAD9LWg16EcBJAAAAABJRU5ErkJggg==",Os=Object.freeze(Object.defineProperty({__proto__:null,default:td},Symbol.toStringTag,{value:"Module"})),ad="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVR42mNgoBZgY+P4TwrG0KwSZP1fqsoOjCMPmmKwYTRIHQijGALiXPuUAlYAopHZQgoKcIxsCIYB6DbDMLoBMDVYXQDCIAXIrsBmAAhjGIAsiW47zHVEuQCGkW2G2Q4Tx2oAsi0wDTDNyAbi9QJ6GODyP14X4IoBgoGILRaQNRGMRuSUiB5wyN7BmZCQ457kpExxZqIEAABOrlz3t4woMAAAAABJRU5ErkJggg==",Ps=Object.freeze(Object.defineProperty({__proto__:null,default:ad},Symbol.toStringTag,{value:"Module"})),sd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtklEQVR42q2TPQ7CMAxGO1Xch42pM2tPw8YtGFh6DAbO0Zt0YQn6Kj304TggVCJZSRz7+adu1/1r9f2u/CKV87AfyzJdyulwXkX3x3xbRWfXS94gAGSM4f14fQF01y4dkAqAkwsAnZUdetlWADfyHUCUFBAjA9Du0DQD6sQhlsB7E8ADWRDdgQ6pAETymrMmfgSQgUeP/WgC5IxR9km/9oBpy+qPfWhOoo+yjBlbB6eAzT/TlvUEPLfG89a/xBYAAAAASUVORK5CYII=",Ws=Object.freeze(Object.defineProperty({__proto__:null,default:sd},Symbol.toStringTag,{value:"Module"})),nd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvklEQVR42mNgoBZgY+P4TwrG0LygLQkrjvJzwSqOYgjMgOMbulFolSDr//8+HwDT6PIYBoAEQbaBMEhD5EHT/1JVdmAMYsMMgxmCYQBII0gBCCNrBmmEGYjsEpwGgBQha4b5GWYQSDNWA2CKkDUj+xmEkcWwGoDsdJh/sWGsBoAk0P2ObDuyZrxhgByIsFiBaUSOSpzRCDIAFnUgNiwhoScorGGALSCR0wAsJvAagBxlMIycHmAYa34gOzNRAgCjTI1cYNJFegAAAABJRU5ErkJggg==",js=Object.freeze(Object.defineProperty({__proto__:null,default:nd},Symbol.toStringTag,{value:"Module"})),rd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoklEQVR42q2TwQmAMAxFeyoO4AgeHMBxPLqXNydxC8FJhEoKH36TVJEa+LS2/mcS2xD+ihi79EXG3E9L1jjvxXxYzyy9V0AAkBdY23UkCRkFIiMgBqDNMMIMAWIAvIk5TAzGmpsBf0UbdWkugFPmnnBTqz2QRTFKAFCTmwFS5wywpgFuD/iXMYRN/GwACG2uleOWoA+Nl/7jSXwzVQHNl6klbtdDjehPNCSlAAAAAElFTkSuQmCC",_s=Object.freeze(Object.defineProperty({__proto__:null,default:rd},Symbol.toStringTag,{value:"Module"})),nC=(E,A)=>{const g=document.createElement("canvas").getContext("2d",{alpha:!0});return g.canvas.height=A,g.canvas.width=E??16/9*A,g.imageSmoothingEnabled=!1,g.canvas.style["image-rendering"]="pixelated",g},Vs="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4.25290ca2.png",Dd=Object.freeze(Object.defineProperty({__proto__:null,default:Vs},Symbol.toStringTag,{value:"Module"})),Zs="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4-normals.8550a291.png",hd=Object.freeze(Object.defineProperty({__proto__:null,default:Zs},Symbol.toStringTag,{value:"Module"})),zs="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4-red.1e67c1ad.png",cd=Object.freeze(Object.defineProperty({__proto__:null,default:zs},Symbol.toStringTag,{value:"Module"})),Xs="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4-outline.a2f8ef43.png",ld=Object.freeze(Object.defineProperty({__proto__:null,default:Xs},Symbol.toStringTag,{value:"Module"})),wd=`wall_top_left 16 0 16 16\r
wall_top_mid 32 0 16 16\r
wall_top_right 48 0 16 16\r
\r
wall_left 16 16 16 16\r
wall_mid 32 16 16 16\r
wall_right 48 16 16 16\r
\r
wall_fountain_top 64 0 16 16\r
wall_fountain_mid_red_anim 64 16 16 16 3\r
wall_fountain_basin_red_anim 64 32 16 16 3\r
wall_fountain_mid_blue_anim 64 48 16 16 3\r
wall_fountain_basin_blue_anim 64 64 16 16 3\r
\r
wall_hole_1 48 32 16 16\r
wall_hole_2 48 48 16 16\r
\r
wall_banner_red 16 32 16 16\r
wall_banner_blue 32 32 16 16\r
wall_banner_green 16 48 16 16\r
wall_banner_yellow 32 48 16 16\r
\r
column_top 80 80 16 16\r
column_mid 80 96 16 16\r
coulmn_base 80 112 16 16\r
column 80 80 16 48\r
wall_column_top 96 80 16 16\r
wall_column_mid 96 96 16 16\r
wall_coulmn_base 96 112 16 16\r
\r
wall_goo 64 80 16 16\r
wall_goo_base 64 96 16 16\r
\r
floor_1 16 64 16 16\r
floor_2 32 64 16 16\r
floor_3 48 64 16 16\r
floor_4 16 80 16 16\r
floor_5 32 80 16 16\r
floor_6 48 80 16 16\r
floor_7 16 96 16 16\r
floor_8 32 96 16 16\r
floor_ladder 48 96 16 16\r
\r
floor_spikes_anim 16 176 16 16 4\r
\r
wall_side_top_left 0 112 16 16\r
wall_side_top_right 16 112 16 16\r
wall_side_mid_left 0 128 16 16\r
wall_side_mid_right 16 128 16 16\r
wall_side_front_left 0 144 16 16\r
wall_side_front_right 16 144 16 16\r
\r
wall_corner_top_left 32 112 16 16\r
wall_corner_top_right 48 112 16 16\r
wall_corner_left 32 128 16 16\r
wall_corner_right 48 128 16 16\r
wall_corner_bottom_left 32 144 16 16\r
wall_corner_bottom_right 48 144 16 16\r
wall_corner_front_left 32 160 16 16\r
wall_corner_front_right 48 160 16 16\r
\r
wall_inner_corner_l_top_left 80 128 16 16\r
wall_inner_corner_l_top_rigth 64 128 16 16\r
wall_inner_corner_mid_left 80 144 16 16\r
wall_inner_corner_mid_rigth 64 144 16 16\r
wall_inner_corner_t_top_left 80 160 16 16\r
wall_inner_corner_t_top_rigth 64 160 16 16\r
\r
edge 96 128 16 16\r
hole 96 144 16 16\r
\r
doors_all 16 221 64 35\r
doors_frame_left 16 224 16 32\r
doors_frame_top 32 221 32 3\r
doors_frame_righ 63 224 16 32\r
doors_leaf_closed 32 224 32 32\r
doors_leaf_open 80 224 32 32\r
\r
chest_empty_open_anim 304 288 16 16 3\r
chest_full_open_anim 304 304 16 16 3\r
chest_mimic_open_anim 304 320 16 16 3\r
\r
flask_big_red 288 224 16 16\r
flask_big_blue 304 224 16 16\r
flask_big_green 320 224 16 16\r
flask_big_yellow 336 224 16 16\r
\r
flask_red 288 240 16 16\r
flask_blue 304 240 16 16\r
flask_green 320 240 16 16\r
flask_yellow 336 240 16 16\r
\r
skull 288 320 16 16\r
crate 288 298 16 22\r
\r
coin_anim 288 272 8 8 4\r
\r
ui_heart_full 288 256 16 16\r
ui_heart_half 304 256 16 16\r
ui_heart_empty 320 256 16 16\r
\r
weapon_knife 293 18 6 13\r
weapon_rusty_sword 307 26 10 21\r
weapon_regular_sword 323 26 10 21\r
weapon_red_gem_sword 339 26 10 21\r
weapon_big_hammer 291 42 10 37\r
weapon_hammer 307 55 10 24\r
weapon_baton_with_spikes 323 57 10 22\r
weapon_mace 339 55 10 24\r
weapon_katana 293 82 6 29\r
weapon_saw_sword 307 86 10 25\r
weapon_anime_sword 322 81 12 30\r
weapon_axe 341 90 9 21\r
weapon_machete 294 121 5 22\r
weapon_cleaver 310 124 8 19\r
weapon_duel_sword 325 113 9 30\r
weapon_knight_sword 339 114 10 29\r
weapon_golden_sword 291 153 10 22\r
weapon_lavish_sword 307 145 10 30\r
weapon_red_magic_staff 324 145 8 30\r
weapon_green_magic_staff 340 145 8 30\r
weapon_spear 293 177 6 30\r
weapon_arrow 308 186 7 21\r
weapon_bow 325 180 25 7\r
\r
tiny_zombie_idle_anim 368 16 16 16 4\r
tiny_zombie_run_anim 432 16 16 16 4\r
goblin_idle_anim 368 32 16 16 4\r
goblin_run_anim 432 32 16 16 4\r
imp_idle_anim 368 48 16 16 4\r
imp_run_anim 432 48 16 16 4\r
skelet_idle_anim 368 80 16 16 4\r
skelet_run_anim 432 80 16 16 4\r
muddy_idle_anim 368 112 16 16 4\r
muddy_run_anim 368 112 16 16 4\r
swampy_idle_anim 432 112 16 16 4\r
swampy_run_anim 432 112 16 16 4\r
zombie_idle_anim 368 144 16 16 4\r
zombie_run_anim 368 144 16 16 4\r
ice_zombie_idle_anim 432 144 16 16 4\r
ice_zombie_run_anim 432 144 16 16 4\r
masked_orc_idle_anim 368 172 16 20 4\r
masked_orc_run_anim 432 172 16 20 4\r
orc_warrior_idle_anim 368 204 16 20 4\r
orc_warrior_run_anim 432 204 16 20 4\r
orc_shaman_idle_anim 368 236 16 20 4\r
orc_shaman_run_anim 432 236 16 20 4\r
necromancer_idle_anim 368 268 16 20 4\r
necromancer_run_anim 368 268 16 20 4\r
wogol_idle_anim 368 300 16 20 4\r
wogol_run_anim 432 300 16 20 4\r
chort_idle_anim 368 328 16 24 4\r
chort_run_anim 432 328 16 24 4\r
big_zombie_idle_anim 16 270 32 34 4\r
big_zombie_run_anim 144 270 32 34 4\r
ogre_idle_anim  16 320 32 32 4\r
ogre_run_anim 144 320 32 32 4\r
big_demon_idle_anim  16 364 32 36 4\r
big_demon_run_anim 144 364 32 36 4\r
\r
elf_f_idle_anim 128 4 16 28 4\r
elf_f_run_anim 192 4 16 28 4\r
elf_f_hit_anim 256 4 16 28 1\r
\r
elf_m_idle_anim 128 36 16 28 4\r
elf_m_run_anim 192 36 16 28 4\r
elf_m_hit_anim 256 36 16 28 1\r
\r
knight_f_idle_anim 128 68 16 28 4\r
knight_f_run_anim 192 68 16 28 4\r
knight_f_hit_anim 256 68 16 28 1\r
\r
knight_m_idle_anim 128 100 16 28 4\r
knight_m_run_anim 192 100 16 28 4\r
knight_m_hit_anim 256 100 16 28 1\r
\r
wizzard_f_idle_anim 128 132 16 28 4\r
wizzard_f_run_anim 192 132 16 28 4\r
wizzard_f_hit_anim 256 132 16 28 1\r
\r
wizzard_m_idle_anim 128 164 16 28 4\r
wizzard_m_run_anim 192 164 16 28 4\r
wizzard_m_hit_anim 256 164 16 28 1\r
\r
lizard_f_idle_anim 128 196 16 28 4\r
lizard_f_run_anim 192 196 16 28 4\r
lizard_f_hit_anim 256 196 16 28 1\r
\r
lizard_m_idle_anim 128 228 16 28 4\r
lizard_m_run_anim 192 228 16 28 4\r
lizard_m_hit_anim 256 228 16 28 1\r
\r
flame 512 16 16 16 8\r
flame_wall 512 32 16 32 8\r
flame_background 512 64 16 16 8\r
flame_brasier 512 80 16 32 8\r
\r
`).map(E=>E.split(" ")).filter(E=>E.every(A=>A)).reduce((E,[A,I,g,C,B,i="1"])=>{const Q=parseInt(C)*parseInt(i),[o,e,t,a]=[uY,fY,YY,mY].map(n=>{const h=nC(Q,parseInt(B));return h.drawImage(n,parseInt(I),parseInt(g),Q,parseInt(B),0,0,Q,parseInt(B)),h}),s=new Xg({buffer:o,normalMap:e,hurt:t,outline:a,width:Number(C),height:Number(B),frames:Number(i)});return{...E,[A]:s}},{}),yA=new class{tiles=OY;UI=vY;icons=xY;magic=TY;skills=JY;overworld=bY};class PY{dpad;constructor(A){this.dpad=new cI;const I=this.dpad.addComponent(new oI(yA.UI.touchdpad,{scale:2}));this.dpad.addComponent(new Ug({x:-.95,y:-.95},{x:-1,y:-1}));const g=new cI;g.addComponent(new oI(yA.UI.touchdpadcenter,{scale:2}));const C=g.addComponent(new Ug({x:0,y:0},{x:0,y:0}));this.dpad.addChildren(g);let B=!1,i={x:null,y:null};A.subscribe("down",({x:Q,y:o,uiObjects:e})=>{e.includes(I.mesh.id)&&(B=!0,i.x=Q,i.y=o)}),A.subscribe("move",({clientX:Q,clientY:o})=>{if(B&&i.x&&i.y){const e=(Q-I.mesh.position.x)/(I.width/2),t=(o-I.mesh.position.y)/(I.height/2),a=Math.atan2(t,e),s=Math.abs(Math.cos(a)),n=Math.abs(Math.sin(a)),h=Math.max(-s,Math.min(s,e)),D=Math.max(-n,Math.min(n,t));C.relativePosition.x=h,C.relativePosition.y=D,A.publish(Ni,h),A.publish(Ui,D)}}),A.subscribe("up",()=>{B=!1,C.relativePosition.x=0,C.relativePosition.y=0,A.publish(Ni,0),A.publish(Ui,0)})}destroy(){this.dpad.destroy()}}class WY{eventBus;inputs={dpad:PY};enabledInputs=new Map;constructor(A){this.eventBus=A,this.eventBus.subscribe("enable",I=>{this.enabledInputs.set(I,new this.inputs[I](A))}),this.eventBus.subscribe("disable",I=>{this.enabledInputs.get(I)?.destroy(),this.enabledInputs.delete(I)})}}class jY{active=0;down=!1;get once(){return this.active!=0?(this.active=0,!0):!1}}class _Y{eventBus=new Xt;controllers=[];inputs=new Map;constructor(A,I){I.forEach(C=>{this.inputs.set(C,new jY),this.eventBus.subscribe(C,B=>{this.inputs.get(C).down=B==0,this.inputs.get(C).active=B})});const g=(C,B)=>{C.forEach(i=>{A.addEventListener(i,Q=>{const o=Q.target,e=A.getBoundingClientRect(),t=(Q instanceof TouchEvent?Q.touches[0]?.clientX:Q.clientX)??0,a=(Q instanceof TouchEvent?Q.touches[0]?.clientY:Q.clientY)??0,s=(t-e.left)/o.clientWidth*2-1,n=1-(a-e.top)/o.clientHeight*2,h={x:s,y:n,clientX:hB.right*s,clientY:hB.top*n};var D=new V,r=new V;D.set(t/window.innerWidth*2-1,-(a/window.innerHeight)*2+1,200),D.unproject(zA),D.sub(zA.position).normalize();var G=-zA.position.z/D.z;r.copy(zA.position).add(D.multiplyScalar(G));const w=new Jt;w.setFromCamera(h,hB);const S=w.intersectObjects(Wi.children,!0).map(p=>p.object.id),y=new Jt;y.setFromCamera(h,zA);const M=y.intersectObjects($g.children,!0).map(p=>p.object.id);this.eventBus.publish(B,{uiObjects:S,objects:M,...h})})},!1)};g(["mousedown","touchstart"],"down"),g(["mouseup","touchend"],"up"),g(["mousemove","touchmove"],"move")}registerControllers(...A){this.controllers=A.map(I=>new I(this.eventBus))}getInput(A){return this.inputs.get(A)}enable(A){this.eventBus.publish("enable",A)}disable(A){this.eventBus.publish("disable",A)}}//! World 
await G0.init();const Vg=new wQ({x:0,y:0});//! Camera
const HD=()=>{const E=window.innerWidth/window.innerHeight,A=300,I=new Wa(A*E/-2,A*E/2,A/2,A/-2,1,1e6);return I.position.set(0,0,200),I};//! Renderer
const VY=()=>{const E=new $a({alpha:!0});return E.setPixelRatio(window.devicePixelRatio),E.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",()=>{E.setSize(window.innerWidth,window.innerHeight)}),E.autoClear=!1,E},Ki=VY();document.body.appendChild(Ki.domElement);//! Scenes
const Wi=new xo,$g=new xo;$g.background=new II(4473924);new xo;//! Cameras
const hB=HD(),zA=HD();//! Lights
const ZY=new To(16777215);Wi.add(ZY);const zY=new To(new II("hsl(0,0%,4%)"));$g.add(zY);//! Render
const zo=()=>{Ki.render($g,zA),Ki.render(Wi,hB)};//! Inputs
const TI=new _Y(Ki.domElement,[Po,Wo,jo,_o,Ni,Ui,Oo,Pi]);TI.registerControllers(wS);navigator.userAgentData.mobile&&TI.registerControllers(WY);class lg extends kI{tiles;lastState="";currentState="";selectedFrame=0;frameRate;frameCounter=0;maxFrames;flipped=!1;start;constructor(A,I){super();const g=Object.assign({start:!0,frameRate:10},I);this.tiles=A,this.frameRate=g.frameRate,this.start=g.start,this.maxFrames=Math.max(...Object.values(A).map(C=>C.frames)),this.currentState=Object.keys(A)[0],this.lastState=this.currentState}set state(A){this.lastState=this.currentState,this.currentState=A}get frames(){return this.tile.frames}get tile(){return this.tiles[this.currentState]}playAnimation(A){this.start=!0;const I=A??Object.keys(this.tiles)[0];this.currentState=I;const g=this;return new Promise(C=>{eC.add(function*(){for(;g.selectedFrame<g.tiles[I].frames-1;)yield;C()})})}}lg.register();class bD extends fg{constructor(){super(lg)}update(A){A.forEach(I=>{const g=I.getComponent(lg),C=I.getComponent(oI);g.frameCounter++,g.start&&(g.frameCounter>g.frameRate&&(g.frameCounter=0,g.selectedFrame=(g.selectedFrame+1)%g.frames),(g.currentState!=g.lastState||C.modifier!=C.lastModifer)&&(C.texture.image=g.tile[C.modifier].canvas,C.lastModifer=C.modifier,C.texture.needsUpdate=!0,g.selectedFrame=0)),C.texture.repeat.x=(g.flipped?-1:1)/g.maxFrames,C.texture.offset.x=((g.flipped?1:0)+g.selectedFrame)/g.frames})}}class jI extends kI{body=null;bodyDescription;colliders=[];colliderDescriptions;moveForce;velocity={x:0,y:0};constructor(A,I){super(),this.moveForce=A.moveForce??10;//!Body
this.bodyDescription=Fg[A.type??"dynamic"]().setAdditionalMass(1).setCanSleep(!1).setCcdEnabled(!0),A?.lock&&this.bodyDescription.lockRotations();//!Collider
this.colliderDescriptions=I.map(g=>{const C=HI.cuboid(g.width/2,g.height/2).setDensity(g.mass??1e3).setSensor(g.sensor??!1).setCollisionGroups(g.group*65536+g.canCollideWith.reduce((B,i)=>B+i,0));return g.contact&&C.setActiveEvents(ki.COLLISION_EVENTS),C})}contacts(A,I){this.colliders.length&&this.colliders.forEach(g=>{if(I&&Math.floor(g.collisionGroups()/65536)!=I)return;const C=B=>{const i=B?.parent()?.userData,Q=xA.getEntityById(i);A(Q)};Vg.contactsWith(g,C),Vg.intersectionsWith(g,C)})}bind(A){this.bodyDescription.setUserData(A)}destroy(){!this.body||(Vg.removeRigidBody(this.body),!this.colliders.length&&(this.colliders.forEach(A=>{Vg.removeCollider(A,!1)}),this.colliders.length=0))}}jI.register();class QI extends kI{x;y;constructor(A,I){super(),this.x=A,this.y=I}}QI.register();class ug extends kI{rotation=0;angVel=0;constructor(A,I=0){super(),this.rotation=A,this.angVel=I}}ug.register();class ji extends kI{type;distance;parentId;jointed=!1;constructor(A,I,g){super(),this.type=A,this.distance=I,this.parentId=g?.id??null}}ji.register();class XY extends fg{constructor(){super(jI)}update(A){A.forEach(I=>{const g=I.getComponent(jI),C=I.getComponent(QI),B=I.getComponent(ji),i=I.getComponent(ug);if(!g.body&&C&&(g.bodyDescription.setTranslation(C.x,C.y),g.body=Vg.createRigidBody(g.bodyDescription),i&&g.body.setRotation(i.rotation,!0)),!g.colliders.length&&g.body&&(g.colliders=g.colliderDescriptions.map(Q=>Vg.createCollider(Q,g.body))),B&&!B?.jointed&&g.body&&B.parentId){const Q=xA.getEntityById(B.parentId).getComponent(jI);if(!Q.body)return;const o=()=>{switch(B.type){case"revolute":return NC.revolute({x:0,y:0},{x:B.distance,y:0});case"prismatic":{const e=NC.prismatic({x:0,y:0},{x:0,y:0},{x:1,y:1});return e.limitsEnabled=!0,e.limits=[30,60],e}}};Vg.createImpulseJoint(o(),Q.body,g.body,!0),B.jointed=!0}})}}class RQ extends kI{amount=0;target;destroyOnHit;constructor(A,I,g=-1){super(),this.amount=A,this.target=I,this.destroyOnHit=g}}RQ.register();const vD=(E,A,I,g)=>{const C=E.texture.image,B=Math.max(0,g*E.texture.image.width),i=C.getContext("2d");i.clearRect(0,0,E.width,E.height),i.drawImage(A.buffer.canvas,0,0),i.drawImage(I.buffer.canvas,0,0,B,E.height,0,0,B,E.height),E.texture.needsUpdate=!0},$Y=yA.UI.healthFull,Am=yA.UI.healthBar;class MB extends kI{health;maxHealth;type;healthBarId=null;canTakeDamage=!0;show;constructor(A,I,g=!0){super(),this.health=A,this.maxHealth=A,this.type=I,this.show=g}updateHealth(A){this.health=Math.max(0,Math.min(this.health+A,this.maxHealth)),this.healthBarId&&vD(xA.getEntityById(this.healthBarId).getComponent(oI),Am,$Y,this.health/this.maxHealth)}}MB.register();class _i extends kI{angVel=0;damage=0;critDamage=.5;critChance=.05;crit=!1;constructor(){super(),xA.eventBus.subscribe(KI.SKILL,A=>{A.modifier(this)})}calculateDamage(A){this.crit=this.critChance<Math.random();let I=A+this.damage;return this.crit&&(I*=1+this.critDamage),I}}_i.register();function Im(){var E=Object.create(null);function A(C,B){var i=C.id,Q=C.name,o=C.dependencies;o===void 0&&(o=[]);var e=C.init;e===void 0&&(e=function(){});var t=C.getTransferables;if(t===void 0&&(t=null),!E[i])try{o=o.map(function(s){return s&&s.isWorkerModule&&(A(s,function(n){if(n instanceof Error)throw n}),s=E[s.id].value),s}),e=g("<"+Q+">.init",e),t&&(t=g("<"+Q+">.getTransferables",t));var a=null;typeof e=="function"?a=e.apply(void 0,o):console.error("worker module init function failed to rehydrate"),E[i]={id:i,value:a,getTransferables:t},B(a)}catch(s){s&&s.noLog||console.error(s),B(s)}}function I(C,B){var i,Q=C.id,o=C.args;(!E[Q]||typeof E[Q].value!="function")&&B(new Error("Worker module "+Q+": not found or its 'init' did not return a function"));try{var e=(i=E[Q]).value.apply(i,o);e&&typeof e.then=="function"?e.then(t,function(a){return B(a instanceof Error?a:new Error(""+a))}):t(e)}catch(a){B(a)}function t(a){try{var s=E[Q].getTransferables&&E[Q].getTransferables(a);(!s||!Array.isArray(s)||!s.length)&&(s=void 0),B(a,s)}catch(n){console.error(n),B(n)}}}function g(C,B){var i=void 0;self.troikaDefine=function(o){return i=o};var Q=URL.createObjectURL(new Blob(["/** "+C.replace(/\*/g,"")+` **/

troikaDefine(
`+B+`
)`],{type:"application/javascript"}));try{importScripts(Q)}catch(o){console.error(o)}return URL.revokeObjectURL(Q),delete self.troikaDefine,i}self.addEventListener("message",function(C){var B=C.data,i=B.messageId,Q=B.action,o=B.data;try{Q==="registerModule"&&A(o,function(e){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:{isCallable:typeof e=="function"}})}),Q==="callModule"&&I(o,function(e,t){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:e},t||void 0)})}catch(e){postMessage({messageId:i,success:!1,error:e.stack})}})}function gm(E){var A=function(){for(var I=[],g=arguments.length;g--;)I[g]=arguments[g];return A._getInitResult().then(function(C){if(typeof C=="function")return C.apply(void 0,I);throw new Error("Worker module function was called but `init` did not return a callable function")})};return A._getInitResult=function(){var I=E.dependencies,g=E.init;I=Array.isArray(I)?I.map(function(B){return B&&B._getInitResult?B._getInitResult():B}):[];var C=Promise.all(I).then(function(B){return g.apply(null,B)});return A._getInitResult=function(){return C},C},A}var xD=function(){var E=!1;if(typeof window<"u"&&typeof window.document<"u")try{var A=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));A.terminate(),E=!0}catch(I){typeof process<"u",console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+I.message+"]")}return xD=function(){return E},E},Cm=0,Bm=0,PE=!1,AQ=Object.create(null),IQ=Object.create(null),ao=Object.create(null);function FQ(E){if((!E||typeof E.init!="function")&&!PE)throw new Error("requires `options.init` function");var A=E.dependencies,I=E.init,g=E.getTransferables,C=E.workerId;if(!xD())return gm(E);C==null&&(C="#default");var B="workerModule"+ ++Cm,i=E.name||B,Q=null;A=A&&A.map(function(e){return typeof e=="function"&&!e.workerModuleData&&(PE=!0,e=FQ({workerId:C,name:"<"+i+"> function dependency: "+e.name,init:`function(){return (
`+Di(e)+`
)}`}),PE=!1),e&&e.workerModuleData&&(e=e.workerModuleData),e});function o(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];if(!Q){Q=qt(C,"registerModule",o.workerModuleData);var a=function(){Q=null,IQ[C].delete(a)};(IQ[C]||(IQ[C]=new Set)).add(a)}return Q.then(function(s){var n=s.isCallable;if(n)return qt(C,"callModule",{id:B,args:e});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:B,name:i,dependencies:A,init:Di(I),getTransferables:g&&Di(g)},o}function Qm(E){IQ[E]&&IQ[E].forEach(function(A){A()}),AQ[E]&&(AQ[E].terminate(),delete AQ[E])}function Di(E){var A=E.toString();return!/^function/.test(A)&&/^\w+\s*\(/.test(A)&&(A="function "+A),A}function im(E){var A=AQ[E];if(!A){var I=Di(Im);A=AQ[E]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+E.replace(/\*/g,"")+` **/

;(`+I+")()"],{type:"application/javascript"}))),A.onmessage=function(g){var C=g.data,B=C.messageId,i=ao[B];if(!i)throw new Error("WorkerModule response with empty or unknown messageId");delete ao[B],i(C)}}return A}function qt(E,A,I){return new Promise(function(g,C){var B=++Bm;ao[B]=function(i){i.success?g(i.result):C(new Error("Error in worker "+A+" call: "+i.error))},im(E).postMessage({messageId:B,action:A,data:I})})}function TD(){var E=function(A){function I(x,T,F,J,_,P,O,m){var QA=1-O;m.x=QA*QA*x+2*QA*O*F+O*O*_,m.y=QA*QA*T+2*QA*O*J+O*O*P}function g(x,T,F,J,_,P,O,m,QA,X){var tA=1-QA;X.x=tA*tA*tA*x+3*tA*tA*QA*F+3*tA*QA*QA*_+QA*QA*QA*O,X.y=tA*tA*tA*T+3*tA*tA*QA*J+3*tA*QA*QA*P+QA*QA*QA*m}function C(x,T){for(var F=/([MLQCZ])([^MLQCZ]*)/g,J,_,P,O,m;J=F.exec(x);){var QA=J[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(X){return parseFloat(X)});switch(J[1]){case"M":O=_=QA[0],m=P=QA[1];break;case"L":(QA[0]!==O||QA[1]!==m)&&T("L",O,m,O=QA[0],m=QA[1]);break;case"Q":{T("Q",O,m,O=QA[2],m=QA[3],QA[0],QA[1]);break}case"C":{T("C",O,m,O=QA[4],m=QA[5],QA[0],QA[1],QA[2],QA[3]);break}case"Z":(O!==_||m!==P)&&T("L",O,m,_,P);break}}}function B(x,T,F){F===void 0&&(F=16);var J={x:0,y:0};C(x,function(_,P,O,m,QA,X,tA,eA,hA){switch(_){case"L":T(P,O,m,QA);break;case"Q":{for(var iA=P,MA=O,LA=1;LA<F;LA++)I(P,O,X,tA,m,QA,LA/(F-1),J),T(iA,MA,J.x,J.y),iA=J.x,MA=J.y;break}case"C":{for(var dA=P,UA=O,mA=1;mA<F;mA++)g(P,O,X,tA,eA,hA,m,QA,mA/(F-1),J),T(dA,UA,J.x,J.y),dA=J.x,UA=J.y;break}}})}var i="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",Q="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,e={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function t(x,T){var F=x.getContext?x.getContext("webgl",e):x,J=o.get(F);if(!J){let tA=function(dA){var UA=P[dA];if(!UA&&(UA=P[dA]=F.getExtension(dA),!UA))throw new Error(dA+" not supported");return UA},eA=function(dA,UA){var mA=F.createShader(UA);return F.shaderSource(mA,dA),F.compileShader(mA),mA},hA=function(dA,UA,mA,rA){if(!O[dA]){var RA={},KA={},DA=F.createProgram();F.attachShader(DA,eA(UA,F.VERTEX_SHADER)),F.attachShader(DA,eA(mA,F.FRAGMENT_SHADER)),F.linkProgram(DA),O[dA]={program:DA,transaction:function(d){F.useProgram(DA),d({setUniform:function($,aA){for(var cA=[],wA=arguments.length-2;wA-- >0;)cA[wA]=arguments[wA+2];var sA=KA[aA]||(KA[aA]=F.getUniformLocation(DA,aA));F["uniform"+$].apply(F,[sA].concat(cA))},setAttribute:function($,aA,cA,wA,sA){var gA=RA[$];gA||(gA=RA[$]={buf:F.createBuffer(),loc:F.getAttribLocation(DA,$),data:null}),F.bindBuffer(F.ARRAY_BUFFER,gA.buf),F.vertexAttribPointer(gA.loc,aA,F.FLOAT,!1,0,0),F.enableVertexAttribArray(gA.loc),_?F.vertexAttribDivisor(gA.loc,wA):tA("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(gA.loc,wA),sA!==gA.data&&(F.bufferData(F.ARRAY_BUFFER,sA,cA),gA.data=sA)}})}}}O[dA].transaction(rA)},iA=function(dA,UA){QA++;try{F.activeTexture(F.TEXTURE0+QA);var mA=m[dA];mA||(mA=m[dA]=F.createTexture(),F.bindTexture(F.TEXTURE_2D,mA),F.texParameteri(F.TEXTURE_2D,F.TEXTURE_MIN_FILTER,F.NEAREST),F.texParameteri(F.TEXTURE_2D,F.TEXTURE_MAG_FILTER,F.NEAREST)),F.bindTexture(F.TEXTURE_2D,mA),UA(mA,QA)}finally{QA--}},MA=function(dA,UA,mA){var rA=F.createFramebuffer();X.push(rA),F.bindFramebuffer(F.FRAMEBUFFER,rA),F.activeTexture(F.TEXTURE0+UA),F.bindTexture(F.TEXTURE_2D,dA),F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,dA,0);try{mA(rA)}finally{F.deleteFramebuffer(rA),F.bindFramebuffer(F.FRAMEBUFFER,X[--X.length-1]||null)}},LA=function(){P={},O={},m={},QA=-1,X.length=0};var _=typeof WebGL2RenderingContext<"u"&&F instanceof WebGL2RenderingContext,P={},O={},m={},QA=-1,X=[];F.canvas.addEventListener("webglcontextlost",function(dA){LA(),dA.preventDefault()},!1),o.set(F,J={gl:F,isWebGL2:_,getExtension:tA,withProgram:hA,withTexture:iA,withTextureFramebuffer:MA,handleContextLoss:LA})}T(J)}function a(x,T,F,J,_,P,O,m){O===void 0&&(O=15),m===void 0&&(m=null),t(x,function(QA){var X=QA.gl,tA=QA.withProgram,eA=QA.withTexture;eA("copy",function(hA,iA){X.texImage2D(X.TEXTURE_2D,0,X.RGBA,_,P,0,X.RGBA,X.UNSIGNED_BYTE,T),tA("copy",i,Q,function(MA){var LA=MA.setUniform,dA=MA.setAttribute;dA("aUV",2,X.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),LA("1i","image",iA),X.bindFramebuffer(X.FRAMEBUFFER,m||null),X.disable(X.BLEND),X.colorMask(O&8,O&4,O&2,O&1),X.viewport(F,J,_,P),X.scissor(F,J,_,P),X.drawArrays(X.TRIANGLES,0,3)})})})}function s(x,T,F){var J=x.width,_=x.height;t(x,function(P){var O=P.gl,m=new Uint8Array(J*_*4);O.readPixels(0,0,J,_,O.RGBA,O.UNSIGNED_BYTE,m),x.width=T,x.height=F,a(O,m,0,0,J,_)})}var n=Object.freeze({__proto__:null,withWebGLContext:t,renderImageData:a,resizeWebGLCanvasWithoutClearing:s});function h(x,T,F,J,_,P){P===void 0&&(P=1);var O=new Uint8Array(x*T),m=J[2]-J[0],QA=J[3]-J[1],X=[];B(F,function(dA,UA,mA,rA){X.push({x1:dA,y1:UA,x2:mA,y2:rA,minX:Math.min(dA,mA),minY:Math.min(UA,rA),maxX:Math.max(dA,mA),maxY:Math.max(UA,rA)})}),X.sort(function(dA,UA){return dA.maxX-UA.maxX});for(var tA=0;tA<x;tA++)for(var eA=0;eA<T;eA++){var hA=MA(J[0]+m*(tA+.5)/x,J[1]+QA*(eA+.5)/T),iA=Math.pow(1-Math.abs(hA)/_,P)/2;hA<0&&(iA=1-iA),iA=Math.max(0,Math.min(255,Math.round(iA*255))),O[eA*x+tA]=iA}return O;function MA(dA,UA){for(var mA=1/0,rA=1/0,RA=X.length;RA--;){var KA=X[RA];if(KA.maxX+rA<=dA)break;if(dA+rA>KA.minX&&UA-rA<KA.maxY&&UA+rA>KA.minY){var DA=G(dA,UA,KA.x1,KA.y1,KA.x2,KA.y2);DA<mA&&(mA=DA,rA=Math.sqrt(mA))}}return LA(dA,UA)&&(rA=-rA),rA}function LA(dA,UA){for(var mA=0,rA=X.length;rA--;){var RA=X[rA];if(RA.maxX<=dA)break;var KA=RA.y1>UA!=RA.y2>UA&&dA<(RA.x2-RA.x1)*(UA-RA.y1)/(RA.y2-RA.y1)+RA.x1;KA&&(mA+=RA.y1<RA.y2?1:-1)}return mA!==0}}function D(x,T,F,J,_,P,O,m,QA,X){P===void 0&&(P=1),m===void 0&&(m=0),QA===void 0&&(QA=0),X===void 0&&(X=0),r(x,T,F,J,_,P,O,null,m,QA,X)}function r(x,T,F,J,_,P,O,m,QA,X,tA){P===void 0&&(P=1),QA===void 0&&(QA=0),X===void 0&&(X=0),tA===void 0&&(tA=0);for(var eA=h(x,T,F,J,_,P),hA=new Uint8Array(eA.length*4),iA=0;iA<eA.length;iA++)hA[iA*4+tA]=eA[iA];a(O,hA,QA,X,x,T,1<<3-tA,m)}function G(x,T,F,J,_,P){var O=_-F,m=P-J,QA=O*O+m*m,X=QA?Math.max(0,Math.min(1,((x-F)*O+(T-J)*m)/QA)):0,tA=x-(F+X*O),eA=T-(J+X*m);return tA*tA+eA*eA}var w=Object.freeze({__proto__:null,generate:h,generateIntoCanvas:D,generateIntoFramebuffer:r}),S="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",y="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",M="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",p=new Float32Array([0,0,2,0,0,2]),U=null,l=!1,N={},Y=new WeakMap;function z(x){if(!l&&!H(x))throw new Error("WebGL generation not supported")}function q(x,T,F,J,_,P,O){if(P===void 0&&(P=1),O===void 0&&(O=null),!O&&(O=U,!O)){var m=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!m)throw new Error("OffscreenCanvas or DOM canvas not supported");O=U=m.getContext("webgl",{depth:!1})}z(O);var QA=new Uint8Array(x*T*4);t(O,function(hA){var iA=hA.gl,MA=hA.withTexture,LA=hA.withTextureFramebuffer;MA("readable",function(dA,UA){iA.texImage2D(iA.TEXTURE_2D,0,iA.RGBA,x,T,0,iA.RGBA,iA.UNSIGNED_BYTE,null),LA(dA,UA,function(mA){K(x,T,F,J,_,P,iA,mA,0,0,0),iA.readPixels(0,0,x,T,iA.RGBA,iA.UNSIGNED_BYTE,QA)})})});for(var X=new Uint8Array(x*T),tA=0,eA=0;tA<QA.length;tA+=4)X[eA++]=QA[tA];return X}function f(x,T,F,J,_,P,O,m,QA,X){P===void 0&&(P=1),m===void 0&&(m=0),QA===void 0&&(QA=0),X===void 0&&(X=0),K(x,T,F,J,_,P,O,null,m,QA,X)}function K(x,T,F,J,_,P,O,m,QA,X,tA){P===void 0&&(P=1),QA===void 0&&(QA=0),X===void 0&&(X=0),tA===void 0&&(tA=0),z(O);var eA=[];B(F,function(hA,iA,MA,LA){eA.push(hA,iA,MA,LA)}),eA=new Float32Array(eA),t(O,function(hA){var iA=hA.gl,MA=hA.isWebGL2,LA=hA.getExtension,dA=hA.withProgram,UA=hA.withTexture,mA=hA.withTextureFramebuffer,rA=hA.handleContextLoss;if(UA("rawDistances",function(RA,KA){(x!==RA._lastWidth||T!==RA._lastHeight)&&iA.texImage2D(iA.TEXTURE_2D,0,iA.RGBA,RA._lastWidth=x,RA._lastHeight=T,0,iA.RGBA,iA.UNSIGNED_BYTE,null),dA("main",S,y,function(DA){var k=DA.setAttribute,d=DA.setUniform,b=!MA&&LA("ANGLE_instanced_arrays"),$=!MA&&LA("EXT_blend_minmax");k("aUV",2,iA.STATIC_DRAW,0,p),k("aLineSegment",4,iA.DYNAMIC_DRAW,1,eA),d.apply(void 0,["4f","uGlyphBounds"].concat(J)),d("1f","uMaxDistance",_),d("1f","uExponent",P),mA(RA,KA,function(aA){iA.enable(iA.BLEND),iA.colorMask(!0,!0,!0,!0),iA.viewport(0,0,x,T),iA.scissor(0,0,x,T),iA.blendFunc(iA.ONE,iA.ONE),iA.blendEquationSeparate(iA.FUNC_ADD,MA?iA.MAX:$.MAX_EXT),iA.clear(iA.COLOR_BUFFER_BIT),MA?iA.drawArraysInstanced(iA.TRIANGLES,0,3,eA.length/4):b.drawArraysInstancedANGLE(iA.TRIANGLES,0,3,eA.length/4)})}),dA("post",i,M,function(DA){DA.setAttribute("aUV",2,iA.STATIC_DRAW,0,p),DA.setUniform("1i","tex",KA),iA.bindFramebuffer(iA.FRAMEBUFFER,m),iA.disable(iA.BLEND),iA.colorMask(tA===0,tA===1,tA===2,tA===3),iA.viewport(QA,X,x,T),iA.scissor(QA,X,x,T),iA.drawArrays(iA.TRIANGLES,0,3)})}),iA.isContextLost())throw rA(),new Error("webgl context lost")})}function H(x){var T=!x||x===U?N:x.canvas||x,F=Y.get(T);if(F===void 0){l=!0;var J=null;try{var _=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],P=q(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,x);F=P&&_.length===P.length&&P.every(function(O,m){return O===_[m]}),F||(J="bad trial run results",console.info(_,P))}catch(O){F=!1,J=O.message}J&&console.warn("WebGL SDF generation not supported:",J),l=!1,Y.set(T,F)}return F}var j=Object.freeze({__proto__:null,generate:q,generateIntoCanvas:f,generateIntoFramebuffer:K,isSupported:H});function EA(x,T,F,J,_,P){_===void 0&&(_=Math.max(J[2]-J[0],J[3]-J[1])/2),P===void 0&&(P=1);try{return q.apply(j,arguments)}catch(O){return console.info("WebGL SDF generation failed, falling back to JS",O),h.apply(w,arguments)}}function Z(x,T,F,J,_,P,O,m,QA,X){_===void 0&&(_=Math.max(J[2]-J[0],J[3]-J[1])/2),P===void 0&&(P=1),m===void 0&&(m=0),QA===void 0&&(QA=0),X===void 0&&(X=0);try{return f.apply(j,arguments)}catch(tA){return console.info("WebGL SDF generation failed, falling back to JS",tA),D.apply(w,arguments)}}return A.forEachPathCommand=C,A.generate=EA,A.generateIntoCanvas=Z,A.javascript=w,A.pathToLineSegments=B,A.webgl=j,A.webglUtils=n,Object.defineProperty(A,"__esModule",{value:!0}),A}({});return E}function Em(){var E=function(A){var I={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},g={},C={};g.L=1,C[1]="L",Object.keys(I).forEach(function(rA,RA){g[rA]=1<<RA+1,C[g[rA]]=rA}),Object.freeze(g);var B=g.LRI|g.RLI|g.FSI,i=g.L|g.R|g.AL,Q=g.B|g.S|g.WS|g.ON|g.FSI|g.LRI|g.RLI|g.PDI,o=g.BN|g.RLE|g.LRE|g.RLO|g.LRO|g.PDF,e=g.S|g.WS|g.B|B|g.PDI|o,t=null;function a(){if(!t){t=new Map;var rA=function(KA){if(I.hasOwnProperty(KA)){var DA=0;I[KA].split(",").forEach(function(k){var d=k.split("+"),b=d[0],$=d[1];b=parseInt(b,36),$=$?parseInt($,36):0,t.set(DA+=b,g[KA]);for(var aA=0;aA<$;aA++)t.set(++DA,g[KA])})}};for(var RA in I)rA(RA)}}function s(rA){return a(),t.get(rA.codePointAt(0))||g.L}function n(rA){return C[s(rA)]}var h={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function D(rA,RA){var KA=36,DA=0,k=new Map,d=RA&&new Map,b;return rA.split(",").forEach(function $(aA){if(aA.indexOf("+")!==-1)for(var cA=+aA;cA--;)$(b);else{b=aA;var wA=aA.split(">"),sA=wA[0],gA=wA[1];sA=String.fromCodePoint(DA+=parseInt(sA,KA)),gA=String.fromCodePoint(DA+=parseInt(gA,KA)),k.set(sA,gA),RA&&d.set(gA,sA)}}),{map:k,reverseMap:d}}var r,G,w;function S(){if(!r){var rA=D(h.pairs,!0),RA=rA.map,KA=rA.reverseMap;r=RA,G=KA,w=D(h.canonical,!1).map}}function y(rA){return S(),r.get(rA)||null}function M(rA){return S(),G.get(rA)||null}function p(rA){return S(),w.get(rA)||null}var U=g.L,l=g.R,N=g.EN,Y=g.ES,z=g.ET,q=g.AN,f=g.CS,K=g.B,H=g.S,j=g.ON,EA=g.BN,Z=g.NSM,x=g.AL,T=g.LRO,F=g.RLO,J=g.LRE,_=g.RLE,P=g.PDF,O=g.LRI,m=g.RLI,QA=g.FSI,X=g.PDI;function tA(rA,RA){for(var KA=125,DA=new Uint32Array(rA.length),k=0;k<rA.length;k++)DA[k]=s(rA[k]);var d=new Map;function b(OI,Sg){var Ig=DA[OI];DA[OI]=Sg,d.set(Ig,d.get(Ig)-1),Ig&Q&&d.set(Q,d.get(Q)-1),d.set(Sg,(d.get(Sg)||0)+1),Sg&Q&&d.set(Q,(d.get(Q)||0)+1)}for(var $=new Uint8Array(rA.length),aA=new Map,cA=[],wA=null,sA=0;sA<rA.length;sA++)wA||cA.push(wA={start:sA,end:rA.length-1,level:RA==="rtl"?1:RA==="ltr"?0:re(sA,!1)}),DA[sA]&K&&(wA.end=sA,wA=null);for(var gA=_|J|F|T|B|X|P|K,JA=function(OI){return OI+(OI&1?1:2)},GA=function(OI){return OI+(OI&1?2:1)},kA=0;kA<cA.length;kA++){wA=cA[kA];var SA=[{_level:wA.level,_override:0,_isolate:0}],lA=void 0,qA=0,HA=0,_A=0;d.clear();for(var u=wA.start;u<=wA.end;u++){var IA=DA[u];if(lA=SA[SA.length-1],d.set(IA,(d.get(IA)||0)+1),IA&Q&&d.set(Q,(d.get(Q)||0)+1),IA&gA)if(IA&(_|J)){$[u]=lA._level;var nA=(IA===_?GA:JA)(lA._level);nA<=KA&&!qA&&!HA?SA.push({_level:nA,_override:0,_isolate:0}):qA||HA++}else if(IA&(F|T)){$[u]=lA._level;var NA=(IA===F?GA:JA)(lA._level);NA<=KA&&!qA&&!HA?SA.push({_level:NA,_override:IA&F?l:U,_isolate:0}):qA||HA++}else if(IA&B){IA&QA&&(IA=re(u+1,!0)===1?m:O),$[u]=lA._level,lA._override&&b(u,lA._override);var uA=(IA===m?GA:JA)(lA._level);uA<=KA&&qA===0&&HA===0?(_A++,SA.push({_level:uA,_override:0,_isolate:1,_isolInitIndex:u})):qA++}else if(IA&X){if(qA>0)qA--;else if(_A>0){for(HA=0;!SA[SA.length-1]._isolate;)SA.pop();var VA=SA[SA.length-1]._isolInitIndex;VA!=null&&(aA.set(VA,u),aA.set(u,VA)),SA.pop(),_A--}lA=SA[SA.length-1],$[u]=lA._level,lA._override&&b(u,lA._override)}else IA&P?(qA===0&&(HA>0?HA--:!lA._isolate&&SA.length>1&&(SA.pop(),lA=SA[SA.length-1])),$[u]=lA._level):IA&K&&($[u]=wA.level);else $[u]=lA._level,lA._override&&IA!==EA&&b(u,lA._override)}for(var iI=[],eI=null,tI=wA.start;tI<=wA.end;tI++){var aI=DA[tI];if(!(aI&o)){var EI=$[tI],AI=aI&B,Ag=aI===X;eI&&EI===eI._level?(eI._end=tI,eI._endsWithIsolInit=AI):iI.push(eI={_start:tI,_end:tI,_level:EI,_startsWithPDI:Ag,_endsWithIsolInit:AI})}}for(var _I=[],rI=0;rI<iI.length;rI++){var JI=iI[rI];if(!JI._startsWithPDI||JI._startsWithPDI&&!aA.has(JI._start)){for(var R=[eI=JI],W=void 0;eI&&eI._endsWithIsolInit&&(W=aA.get(eI._end))!=null;)for(var BA=rI+1;BA<iI.length;BA++)if(iI[BA]._start===W){R.push(eI=iI[BA]);break}for(var v=[],oA=0;oA<R.length;oA++)for(var fA=R[oA],bA=fA._start;bA<=fA._end;bA++)v.push(bA);for(var OA=$[v[0]],PA=wA.level,XA=v[0]-1;XA>=0;XA--)if(!(DA[XA]&o)){PA=$[XA];break}var ZA=v[v.length-1],$A=$[ZA],dI=wA.level;if(!(DA[ZA]&B)){for(var YI=ZA+1;YI<=wA.end;YI++)if(!(DA[YI]&o)){dI=$[YI];break}}_I.push({_seqIndices:v,_sosType:Math.max(PA,OA)%2?l:U,_eosType:Math.max(dI,$A)%2?l:U})}}for(var Qg=0;Qg<_I.length;Qg++){var wg=_I[Qg],FA=wg._seqIndices,WA=wg._sosType,UB=wg._eosType;if(d.get(Z))for(var yI=0;yI<FA.length;yI++){var qg=FA[yI];if(DA[qg]&Z){for(var bC=WA,Yg=yI-1;Yg>=0;Yg--)if(!(DA[FA[Yg]]&o)){bC=DA[FA[Yg]];break}b(qg,bC&(B|X)?j:bC)}}if(d.get(N))for(var gC=0;gC<FA.length;gC++){var mI=FA[gC];if(DA[mI]&N)for(var ng=gC-1;ng>=-1;ng--){var vC=ng===-1?WA:DA[FA[ng]];if(vC&i){vC===x&&b(mI,q);break}}}if(d.get(x))for(var bI=0;bI<FA.length;bI++){var xC=FA[bI];DA[xC]&x&&b(xC,l)}if(d.get(Y)||d.get(f))for(var cC=1;cC<FA.length-1;cC++){var TC=FA[cC];if(DA[TC]&(Y|f)){for(var OC=0,zi=0,Xi=cC-1;Xi>=0&&(OC=DA[FA[Xi]],!!(OC&o));Xi--);for(var $i=cC+1;$i<FA.length&&(zi=DA[FA[$i]],!!(zi&o));$i++);OC===zi&&(DA[TC]===Y?OC===N:OC&(N|q))&&b(TC,OC)}}if(d.get(N))for(var KB=0;KB<FA.length;KB++){var o0=FA[KB];if(DA[o0]&N){for(var NQ=KB-1;NQ>=0&&DA[FA[NQ]]&(z|o);NQ--)b(FA[NQ],N);for(var UQ=KB+1;UQ<FA.length&&DA[FA[UQ]]&(z|o);UQ++)b(FA[UQ],N)}}if(d.get(z)||d.get(Y)||d.get(f))for(var JB=0;JB<FA.length;JB++){var Ce=FA[JB];if(DA[Ce]&(z|Y|f)){b(Ce,j);for(var KQ=JB-1;KQ>=0&&DA[FA[KQ]]&o;KQ--)b(FA[KQ],j);for(var JQ=JB+1;JQ<FA.length&&DA[FA[JQ]]&o;JQ++)b(FA[JQ],j)}}if(d.get(N))for(var AE=0,Be=WA;AE<FA.length;AE++){var Qe=FA[AE],IE=DA[Qe];IE&N?Be===U&&b(Qe,U):IE&i&&(Be=IE)}if(d.get(Q)){var uB=l|N|q,ie=uB|U,uQ=[];{for(var PC=[],WC=0;WC<FA.length;WC++)if(DA[FA[WC]]&Q){var fB=rA[FA[WC]],Ee=void 0;if(y(fB)!==null)if(PC.length<63)PC.push({char:fB,seqIndex:WC});else break;else if((Ee=M(fB))!==null)for(var qB=PC.length-1;qB>=0;qB--){var gE=PC[qB].char;if(gE===Ee||gE===M(p(fB))||y(p(gE))===fB){uQ.push([PC[qB].seqIndex,WC]),PC.length=qB;break}}}uQ.sort(function(OI,Sg){return OI[0]-Sg[0]})}for(var CE=0;CE<uQ.length;CE++){for(var oe=uQ[CE],YB=oe[0],fQ=oe[1],ee=!1,Gg=0,BE=YB+1;BE<fQ;BE++){var QE=FA[BE];if(DA[QE]&ie){ee=!0;var te=DA[QE]&uB?l:U;if(te===jC(QE)){Gg=te;break}}}if(ee&&!Gg){Gg=WA;for(var iE=YB-1;iE>=0;iE--){var qQ=FA[iE];if(DA[qQ]&ie){var ae=DA[qQ]&uB?l:U;ae!==jC(qQ)?Gg=ae:Gg=jC(qQ);break}}}if(Gg){if(DA[FA[YB]]=DA[FA[fQ]]=Gg,Gg!==jC(FA[YB])){for(var mB=YB+1;mB<FA.length;mB++)if(!(DA[FA[mB]]&o)){s(rA[FA[mB]])&Z&&(DA[FA[mB]]=Gg);break}}if(Gg!==jC(FA[fQ])){for(var LB=fQ+1;LB<FA.length;LB++)if(!(DA[FA[LB]]&o)){s(rA[FA[LB]])&Z&&(DA[FA[LB]]=Gg);break}}}}for(var CC=0;CC<FA.length;CC++)if(DA[FA[CC]]&Q){for(var se=CC,EE=CC,oE=WA,HB=CC-1;HB>=0;HB--)if(DA[FA[HB]]&o)se=HB;else{oE=DA[FA[HB]]&uB?l:U;break}for(var ne=UB,bB=CC+1;bB<FA.length;bB++)if(DA[FA[bB]]&(Q|o))EE=bB;else{ne=DA[FA[bB]]&uB?l:U;break}for(var YQ=se;YQ<=EE;YQ++)DA[FA[YQ]]=oE===ne?oE:jC(FA[YQ]);CC=EE}}}for(var ig=wA.start;ig<=wA.end;ig++){var e0=$[ig],mQ=DA[ig];if(e0&1?mQ&(U|N|q)&&$[ig]++:mQ&l?$[ig]++:mQ&(q|N)&&($[ig]+=2),mQ&o&&($[ig]=ig===0?wA.level:$[ig-1]),ig===wA.end||s(rA[ig])&(H|K))for(var LQ=ig;LQ>=0&&s(rA[LQ])&e;LQ--)$[LQ]=wA.level}}return{levels:$,paragraphs:cA};function re(OI,Sg){for(var Ig=OI;Ig<rA.length;Ig++){var BC=DA[Ig];if(BC&(l|x))return 1;if(BC&(K|U)||Sg&&BC===X)return 0;if(BC&B){var De=t0(Ig);Ig=De===-1?rA.length:De}}return 0}function t0(OI){for(var Sg=1,Ig=OI+1;Ig<rA.length;Ig++){var BC=DA[Ig];if(BC&K)break;if(BC&X){if(--Sg===0)return Ig}else BC&B&&Sg++}return-1}function jC(OI){return $[OI]&1?l:U}}var eA="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",hA;function iA(){if(!hA){var rA=D(eA,!0),RA=rA.map,KA=rA.reverseMap;KA.forEach(function(DA,k){RA.set(k,DA)}),hA=RA}}function MA(rA){return iA(),hA.get(rA)||null}function LA(rA,RA,KA,DA){var k=rA.length;KA=Math.max(0,KA==null?0:+KA),DA=Math.min(k-1,DA==null?k-1:+DA);for(var d=new Map,b=KA;b<=DA;b++)if(RA[b]&1){var $=MA(rA[b]);$!==null&&d.set(b,$)}return d}function dA(rA,RA,KA,DA){var k=rA.length;KA=Math.max(0,KA==null?0:+KA),DA=Math.min(k-1,DA==null?k-1:+DA);var d=[];return RA.paragraphs.forEach(function(b){var $=Math.max(KA,b.start),aA=Math.min(DA,b.end);if($<aA){for(var cA=RA.levels.slice($,aA+1),wA=aA;wA>=$&&s(rA[wA])&e;wA--)cA[wA]=b.level;for(var sA=b.level,gA=1/0,JA=0;JA<cA.length;JA++){var GA=cA[JA];GA>sA&&(sA=GA),GA<gA&&(gA=GA|1)}for(var kA=sA;kA>=gA;kA--)for(var SA=0;SA<cA.length;SA++)if(cA[SA]>=kA){for(var lA=SA;SA+1<cA.length&&cA[SA+1]>=kA;)SA++;SA>lA&&d.push([lA+KA,SA+KA])}}}),d}function UA(rA,RA,KA,DA){var k=mA(rA,RA,KA,DA),d=[].concat(rA);return k.forEach(function(b,$){d[$]=(RA.levels[b]&1?MA(rA[b]):null)||rA[b]}),d.join("")}function mA(rA,RA,KA,DA){for(var k=dA(rA,RA,KA,DA),d=[],b=0;b<rA.length;b++)d[b]=b;return k.forEach(function($){for(var aA=$[0],cA=$[1],wA=d.slice(aA,cA+1),sA=wA.length;sA--;)d[cA-sA]=wA[sA]}),d}return A.closingToOpeningBracket=M,A.getBidiCharType=s,A.getBidiCharTypeName=n,A.getCanonicalBracket=p,A.getEmbeddingLevels=tA,A.getMirroredCharacter=MA,A.getMirroredCharactersMap=LA,A.getReorderSegments=dA,A.getReorderedIndices=mA,A.getReorderedString=UA,A.openingToClosingBracket=y,Object.defineProperty(A,"__esModule",{value:!0}),A}({});return E}const OD=/\bvoid\s+main\s*\(\s*\)\s*{/g;function so(E){const A=/^[ \t]*#include +<([\w\d./]+)>/gm;function I(g,C){let B=jA[C];return B?so(B):g}return E.replace(A,I)}const vI=[];for(let E=0;E<256;E++)vI[E]=(E<16?"0":"")+E.toString(16);function om(){const E=Math.random()*4294967295|0,A=Math.random()*4294967295|0,I=Math.random()*4294967295|0,g=Math.random()*4294967295|0;return(vI[E&255]+vI[E>>8&255]+vI[E>>16&255]+vI[E>>24&255]+"-"+vI[A&255]+vI[A>>8&255]+"-"+vI[A>>16&15|64]+vI[A>>24&255]+"-"+vI[I&63|128]+vI[I>>8&255]+"-"+vI[I>>16&255]+vI[I>>24&255]+vI[g&255]+vI[g>>8&255]+vI[g>>16&255]+vI[g>>24&255]).toUpperCase()}const dC=Object.assign||function(){let E=arguments[0];for(let A=1,I=arguments.length;A<I;A++){let g=arguments[A];if(g)for(let C in g)g.hasOwnProperty(C)&&(E[C]=g[C])}return E},em=Date.now(),Yt=new WeakMap,mt=new Map;let tm=1e10;function no(E,A){const I=rm(A);let g=Yt.get(E);if(g||Yt.set(E,g=Object.create(null)),g[I])return new g[I];const C=`_onBeforeCompile${I}`,B=function(e){E.onBeforeCompile.call(this,e);const t=this.customProgramCacheKey()+"|"+e.vertexShader+"|"+e.fragmentShader;let a=mt[t];if(!a){const s=am(e,A,I);a=mt[t]=s}e.vertexShader=a.vertexShader,e.fragmentShader=a.fragmentShader,dC(e.uniforms,this.uniforms),A.timeUniform&&(e.uniforms[A.timeUniform]={get value(){return Date.now()-em}}),this[C]&&this[C](e)},i=function(){return Q(A.chained?E:E.clone())},Q=function(e){const t=Object.create(e,o);return Object.defineProperty(t,"baseMaterial",{value:E}),Object.defineProperty(t,"id",{value:tm++}),t.uuid=om(),t.uniforms=dC({},e.uniforms,A.uniforms),t.defines=dC({},e.defines,A.defines),t.defines[`TROIKA_DERIVED_MATERIAL_${I}`]="",t.extensions=dC({},e.extensions,A.extensions),t._listeners=void 0,t},o={constructor:{value:i},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return E.customProgramCacheKey()+"|"+I}},onBeforeCompile:{get(){return B},set(e){this[C]=e}},copy:{writable:!0,configurable:!0,value:function(e){return E.copy.call(this,e),!E.isShaderMaterial&&!E.isDerivedMaterial&&(dC(this.extensions,e.extensions),dC(this.defines,e.defines),dC(this.uniforms,xa.clone(e.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const e=new E.constructor;return Q(e).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let e=this._depthMaterial;return e||(e=this._depthMaterial=no(E.isDerivedMaterial?E.getDepthMaterial():new za({depthPacking:Ka}),A),e.defines.IS_DEPTH_MATERIAL="",e.uniforms=this.uniforms),e}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let e=this._distanceMaterial;return e||(e=this._distanceMaterial=no(E.isDerivedMaterial?E.getDistanceMaterial():new Xa,A),e.defines.IS_DISTANCE_MATERIAL="",e.uniforms=this.uniforms),e}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:e,_distanceMaterial:t}=this;e&&e.dispose(),t&&t.dispose(),E.dispose.call(this)}}};return g[I]=i,new i}function am({vertexShader:E,fragmentShader:A},I,g){let{vertexDefs:C,vertexMainIntro:B,vertexMainOutro:i,vertexTransform:Q,fragmentDefs:o,fragmentMainIntro:e,fragmentMainOutro:t,fragmentColorTransform:a,customRewriter:s,timeUniform:n}=I;if(C=C||"",B=B||"",i=i||"",o=o||"",e=e||"",t=t||"",(Q||s)&&(E=so(E)),(a||s)&&(A=A.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),A=so(A)),s){let h=s({vertexShader:E,fragmentShader:A});E=h.vertexShader,A=h.fragmentShader}if(a){let h=[];A=A.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,D=>(h.push(D),"")),t=`${a}
${h.join(`
`)}
${t}`}if(n){const h=`
uniform float ${n};
`;C=h+C,o=h+o}return Q&&(E=`vec3 troika_position_${g};
vec3 troika_normal_${g};
vec2 troika_uv_${g};
${E}
`,C=`${C}
void troikaVertexTransform${g}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${Q}
}
`,B=`
troika_position_${g} = vec3(position);
troika_normal_${g} = vec3(normal);
troika_uv_${g} = vec2(uv);
troikaVertexTransform${g}(troika_position_${g}, troika_normal_${g}, troika_uv_${g});
${B}
`,E=E.replace(/\b(position|normal|uv)\b/g,(h,D,r,G)=>/\battribute\s+vec[23]\s+$/.test(G.substr(0,r))?D:`troika_${D}_${g}`)),E=Lt(E,g,C,B,i),A=Lt(A,g,o,e,t),{vertexShader:E,fragmentShader:A}}function Lt(E,A,I,g,C){return(g||C||I)&&(E=E.replace(OD,`
${I}
void troikaOrigMain${A}() {`),E+=`
void main() {
  ${g}
  troikaOrigMain${A}();
  ${C}
}`),E}function sm(E,A){return E==="uniforms"?void 0:typeof A=="function"?A.toString():A}let nm=0;const Ht=new Map;function rm(E){const A=JSON.stringify(E,sm);let I=Ht.get(A);return I==null&&Ht.set(A,I=++nm),I}function Dm(E,A,I){const{defaultFontURL:g}=I,C=Object.create(null),B=1/0,i=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,Q="[^\\S\\u00A0]",o=new RegExp(`${Q}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function e(w,S){function y(){const M=p=>{console.error(`Failure loading font ${w}${w===g?"":"; trying fallback"}`,p),w!==g&&(w=g,y())};try{const p=new XMLHttpRequest;p.open("get",w,!0),p.responseType="arraybuffer",p.onload=function(){if(p.status>=400)M(new Error(p.statusText));else if(p.status>0)try{const U=E(p.response);S(U)}catch(U){M(U)}},p.onerror=M,p.send()}catch(p){M(p)}}y()}function t(w,S){w||(w=g);let y=C[w];y?y.pending?y.pending.push(S):S(y):(C[w]={pending:[S]},e(w,M=>{let p=C[w].pending;C[w]=M,p.forEach(U=>U(M))}))}function a({text:w="",font:S=g,sdfGlyphSize:y=64,fontSize:M=1,letterSpacing:p=0,lineHeight:U="normal",maxWidth:l=B,direction:N,textAlign:Y="left",textIndent:z=0,whiteSpace:q="normal",overflowWrap:f="normal",anchorX:K=0,anchorY:H=0,includeCaretPositions:j=!1,chunkedBoundsSize:EA=8192,colorRanges:Z=null},x,T=!1){const F=D(),J={fontLoad:0,typesetting:0};w.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),w=w.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),M=+M,p=+p,l=+l,U=U||"normal",z=+z,t(S,_=>{const P=isFinite(l);let O=null,m=null,QA=null,X=null,tA=null,eA=null,hA=null,iA=0,MA=0,LA=q!=="nowrap";const{ascender:dA,descender:UA,unitsPerEm:mA,lineGap:rA,capHeight:RA,xHeight:KA}=_;J.fontLoad=D()-F;const DA=D(),k=M/mA;U==="normal"&&(U=(dA-UA+rA)/mA),U=U*M;const d=(U-(dA-UA)*k)/2,b=-(dA*k+d),$=Math.min(U,(dA-UA)*k),aA=(dA+UA)/2*k-$/2;let cA=z,wA=new r;const sA=[wA];_.forEachGlyph(w,M,p,(GA,kA,SA)=>{const lA=w.charAt(SA),qA=GA.advanceWidth*k,HA=wA.count;let _A;if("isEmpty"in GA||(GA.isWhitespace=!!lA&&new RegExp(Q).test(lA),GA.canBreakAfter=!!lA&&o.test(lA),GA.isEmpty=GA.xMin===GA.xMax||GA.yMin===GA.yMax||i.test(lA)),!GA.isWhitespace&&!GA.isEmpty&&MA++,LA&&P&&!GA.isWhitespace&&kA+qA+cA>l&&HA){if(wA.glyphAt(HA-1).glyphObj.canBreakAfter)_A=new r,cA=-kA;else for(let IA=HA;IA--;)if(IA===0&&f==="break-word"){_A=new r,cA=-kA;break}else if(wA.glyphAt(IA).glyphObj.canBreakAfter){_A=wA.splitAt(IA+1);const nA=_A.glyphAt(0).x;cA-=nA;for(let NA=_A.count;NA--;)_A.glyphAt(NA).x-=nA;break}_A&&(wA.isSoftWrapped=!0,wA=_A,sA.push(wA),iA=l)}let u=wA.glyphAt(wA.count);u.glyphObj=GA,u.x=kA+cA,u.width=qA,u.charIndex=SA,lA===`
`&&(wA=new r,sA.push(wA),cA=-(kA+qA+p*M)+z)}),sA.forEach(GA=>{for(let kA=GA.count;kA--;){let{glyphObj:SA,x:lA,width:qA}=GA.glyphAt(kA);if(!SA.isWhitespace){GA.width=lA+qA,GA.width>iA&&(iA=GA.width);return}}});let gA=0,JA=0;if(K&&(typeof K=="number"?gA=-K:typeof K=="string"&&(gA=-iA*(K==="left"?0:K==="center"?.5:K==="right"?1:n(K)))),H){if(typeof H=="number")JA=-H;else if(typeof H=="string"){let GA=sA.length*U;JA=H==="top"?0:H==="top-baseline"?-b:H==="top-cap"?-b-RA*k:H==="top-ex"?-b-KA*k:H==="middle"?GA/2:H==="bottom"?GA:H==="bottom-baseline"?GA-d+UA*k:n(H)*GA}}if(!T){const GA=A.getEmbeddingLevels(w,N);O=new Uint16Array(MA),m=new Float32Array(MA*2),QA={},eA=[B,B,-B,-B],hA=[];let kA=b;j&&(tA=new Float32Array(w.length*3)),Z&&(X=new Uint8Array(MA*3));let SA=0,lA=-1,qA=-1,HA,_A;if(sA.forEach((u,IA)=>{let{count:nA,width:NA}=u;if(nA>0){let uA=0;for(let EI=nA;EI--&&u.glyphAt(EI).glyphObj.isWhitespace;)uA++;let VA=0,iI=0;if(Y==="center")VA=(iA-NA)/2;else if(Y==="right")VA=iA-NA;else if(Y==="justify"&&u.isSoftWrapped){let EI=0;for(let AI=nA-uA;AI--;)u.glyphAt(AI).glyphObj.isWhitespace&&EI++;iI=(iA-NA)/EI}if(iI||VA){let EI=0;for(let AI=0;AI<nA;AI++){let Ag=u.glyphAt(AI);const _I=Ag.glyphObj;Ag.x+=VA+EI,iI!==0&&_I.isWhitespace&&AI<nA-uA&&(EI+=iI,Ag.width+=iI)}}const eI=A.getReorderSegments(w,GA,u.glyphAt(0).charIndex,u.glyphAt(u.count-1).charIndex);for(let EI=0;EI<eI.length;EI++){const[AI,Ag]=eI[EI];let _I=1/0,rI=-1/0;for(let JI=0;JI<nA;JI++)if(u.glyphAt(JI).charIndex>=AI){let R=JI,W=JI;for(;W<nA;W++){let BA=u.glyphAt(W);if(BA.charIndex>Ag)break;W<nA-uA&&(_I=Math.min(_I,BA.x),rI=Math.max(rI,BA.x+BA.width))}for(let BA=R;BA<W;BA++){const v=u.glyphAt(BA);v.x=rI-(v.x+v.width-_I)}break}}let tI;const aI=EI=>tI=EI;for(let EI=0;EI<nA;EI++){let AI=u.glyphAt(EI);tI=AI.glyphObj;const Ag=tI.index,_I=GA.levels[AI.charIndex]&1;if(_I){const rI=A.getMirroredCharacter(w[AI.charIndex]);rI&&_.forEachGlyph(rI,0,0,aI)}if(j){const{charIndex:rI}=AI,JI=AI.x+gA,R=AI.x+AI.width+gA;tA[rI*3]=_I?R:JI,tA[rI*3+1]=_I?JI:R,tA[rI*3+2]=kA+aA+JA;const W=rI-lA;W>1&&h(tA,lA,W),lA=rI}if(Z){const{charIndex:rI}=AI;for(;rI>qA;)qA++,Z.hasOwnProperty(qA)&&(_A=Z[qA])}if(!tI.isWhitespace&&!tI.isEmpty){const rI=SA++;QA[Ag]||(QA[Ag]={path:tI.path,pathBounds:[tI.xMin,tI.yMin,tI.xMax,tI.yMax]});const JI=AI.x+gA,R=kA+JA;m[rI*2]=JI,m[rI*2+1]=R;const W=JI+tI.xMin*k,BA=R+tI.yMin*k,v=JI+tI.xMax*k,oA=R+tI.yMax*k;W<eA[0]&&(eA[0]=W),BA<eA[1]&&(eA[1]=BA),v>eA[2]&&(eA[2]=v),oA>eA[3]&&(eA[3]=oA),rI%EA===0&&(HA={start:rI,end:rI,rect:[B,B,-B,-B]},hA.push(HA)),HA.end++;const fA=HA.rect;if(W<fA[0]&&(fA[0]=W),BA<fA[1]&&(fA[1]=BA),v>fA[2]&&(fA[2]=v),oA>fA[3]&&(fA[3]=oA),O[rI]=Ag,Z){const bA=rI*3;X[bA]=_A>>16&255,X[bA+1]=_A>>8&255,X[bA+2]=_A&255}}}}kA-=U}),tA){const u=w.length-lA;u>1&&h(tA,lA,u)}}J.typesetting=D()-DA,x({glyphIds:O,glyphPositions:m,glyphData:QA,caretPositions:tA,caretHeight:$,glyphColors:X,chunkedBounds:hA,fontSize:M,unitsPerEm:mA,ascender:dA*k,descender:UA*k,capHeight:RA*k,xHeight:KA*k,lineHeight:U,topBaseline:b,blockBounds:[gA,JA-sA.length*U,gA+iA,JA],visibleBounds:eA,timings:J})})}function s(w,S){a(w,y=>{const[M,p,U,l]=y.blockBounds;S({width:U-M,height:l-p})},{metricsOnly:!0})}function n(w){let S=w.match(/^([\d.]+)%$/),y=S?parseFloat(S[1]):NaN;return isNaN(y)?0:y/100}function h(w,S,y){const M=w[S*3],p=w[S*3+1],U=w[S*3+2],l=(p-M)/y;for(let N=0;N<y;N++){const Y=(S+N)*3;w[Y]=M+l*N,w[Y+1]=M+l*(N+1),w[Y+2]=U}}function D(){return(self.performance||Date).now()}function r(){this.data=[]}const G=["glyphObj","x","width","charIndex"];return r.prototype={width:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/G.length)},glyphAt(w){let S=r.flyweight;return S.data=this.data,S.index=w,S},splitAt(w){let S=new r;return S.data=this.data.splice(w*G.length),S}},r.flyweight=G.reduce((w,S,y,M)=>(Object.defineProperty(w,S,{get(){return this.data[this.index*G.length+y]},set(p){this.data[this.index*G.length+y]=p}}),w),{data:null,index:0}),{typeset:a,measure:s,loadFont:t}}const JC=()=>(self.performance||Date).now(),Vi=TD();let bt;function hm(E,A,I,g,C,B,i,Q,o,e,t=!0){return t?lm(E,A,I,g,C,B,i,Q,o,e).then(null,a=>(bt||(console.warn("WebGL SDF generation failed, falling back to JS",a),bt=!0),xt(E,A,I,g,C,B,i,Q,o,e))):xt(E,A,I,g,C,B,i,Q,o,e)}const hi=[],cm=5;let ro=0;function PD(){const E=JC();for(;hi.length&&JC()-E<cm;)hi.shift()();ro=hi.length?setTimeout(PD,0):0}const lm=(...E)=>new Promise((A,I)=>{hi.push(()=>{const g=JC();try{Vi.webgl.generateIntoCanvas(...E),A({timing:JC()-g})}catch(C){I(C)}}),ro||(ro=setTimeout(PD,0))}),wm=4,Gm=2e3,vt={};let Sm=0;function xt(E,A,I,g,C,B,i,Q,o,e){const t="TroikaTextSDFGenerator_JS_"+Sm++%wm;let a=vt[t];return a||(a=vt[t]={workerModule:FQ({name:t,workerId:t,dependencies:[TD,JC],init(s,n){const h=s().javascript.generate;return function(...D){const r=n();return{textureData:h(...D),timing:n()-r}}},getTransferables(s){return[s.textureData.buffer]}}),requests:0,idleTimer:null}),a.requests++,clearTimeout(a.idleTimer),a.workerModule(E,A,I,g,C,B).then(({textureData:s,timing:n})=>{const h=JC(),D=new Uint8Array(s.length*4);for(let r=0;r<s.length;r++)D[r*4+e]=s[r];return Vi.webglUtils.renderImageData(i,D,Q,o,E,A,1<<3-e),n+=JC()-h,--a.requests===0&&(a.idleTimer=setTimeout(()=>{Qm(t)},Gm)),{timing:n}})}function dm(E){E._warm||(Vi.webgl.isSupported(E),E._warm=!0)}const ym=Vi.webglUtils.resizeWebGLCanvasWithoutClearing;/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function Mm(){return typeof window>"u"&&(self.window=self),function(E){var A={parse:function(C){var B=A._bin,i=new Uint8Array(C);if(B.readASCII(i,0,4)=="ttcf"){var Q=4;B.readUshort(i,Q),Q+=2,B.readUshort(i,Q),Q+=2;var o=B.readUint(i,Q);Q+=4;for(var e=[],t=0;t<o;t++){var a=B.readUint(i,Q);Q+=4,e.push(A._readFont(i,a))}return e}return[A._readFont(i,0)]},_readFont:function(C,B){var i=A._bin,Q=B;i.readFixed(C,B),B+=4;var o=i.readUshort(C,B);B+=2,i.readUshort(C,B),B+=2,i.readUshort(C,B),B+=2,i.readUshort(C,B),B+=2;for(var e=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GPOS","GSUB","SVG "],t={_data:C,_offset:Q},a={},s=0;s<o;s++){var n=i.readASCII(C,B,4);B+=4,i.readUint(C,B),B+=4;var h=i.readUint(C,B);B+=4;var D=i.readUint(C,B);B+=4,a[n]={offset:h,length:D}}for(s=0;s<e.length;s++){var r=e[s];a[r]&&(t[r.trim()]=A[r.trim()].parse(C,a[r].offset,a[r].length,t))}return t},_tabOffset:function(C,B,i){for(var Q=A._bin,o=Q.readUshort(C,i+4),e=i+12,t=0;t<o;t++){var a=Q.readASCII(C,e,4);e+=4,Q.readUint(C,e),e+=4;var s=Q.readUint(C,e);if(e+=4,Q.readUint(C,e),e+=4,a==B)return s}return 0}};A._bin={readFixed:function(C,B){return(C[B]<<8|C[B+1])+(C[B+2]<<8|C[B+3])/65540},readF2dot14:function(C,B){return A._bin.readShort(C,B)/16384},readInt:function(C,B){return A._bin._view(C).getInt32(B)},readInt8:function(C,B){return A._bin._view(C).getInt8(B)},readShort:function(C,B){return A._bin._view(C).getInt16(B)},readUshort:function(C,B){return A._bin._view(C).getUint16(B)},readUshorts:function(C,B,i){for(var Q=[],o=0;o<i;o++)Q.push(A._bin.readUshort(C,B+2*o));return Q},readUint:function(C,B){return A._bin._view(C).getUint32(B)},readUint64:function(C,B){return 4294967296*A._bin.readUint(C,B)+A._bin.readUint(C,B+4)},readASCII:function(C,B,i){for(var Q="",o=0;o<i;o++)Q+=String.fromCharCode(C[B+o]);return Q},readUnicode:function(C,B,i){for(var Q="",o=0;o<i;o++){var e=C[B++]<<8|C[B++];Q+=String.fromCharCode(e)}return Q},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(C,B,i){var Q=A._bin._tdec;return Q&&B==0&&i==C.length?Q.decode(C):A._bin.readASCII(C,B,i)},readBytes:function(C,B,i){for(var Q=[],o=0;o<i;o++)Q.push(C[B+o]);return Q},readASCIIArray:function(C,B,i){for(var Q=[],o=0;o<i;o++)Q.push(String.fromCharCode(C[B+o]));return Q},_view:function(C){return C._dataView||(C._dataView=C.buffer?new DataView(C.buffer,C.byteOffset,C.byteLength):new DataView(new Uint8Array(C).buffer))}},A._lctf={},A._lctf.parse=function(C,B,i,Q,o){var e=A._bin,t={},a=B;e.readFixed(C,B),B+=4;var s=e.readUshort(C,B);B+=2;var n=e.readUshort(C,B);B+=2;var h=e.readUshort(C,B);return B+=2,t.scriptList=A._lctf.readScriptList(C,a+s),t.featureList=A._lctf.readFeatureList(C,a+n),t.lookupList=A._lctf.readLookupList(C,a+h,o),t},A._lctf.readLookupList=function(C,B,i){var Q=A._bin,o=B,e=[],t=Q.readUshort(C,B);B+=2;for(var a=0;a<t;a++){var s=Q.readUshort(C,B);B+=2;var n=A._lctf.readLookupTable(C,o+s,i);e.push(n)}return e},A._lctf.readLookupTable=function(C,B,i){var Q=A._bin,o=B,e={tabs:[]};e.ltype=Q.readUshort(C,B),B+=2,e.flag=Q.readUshort(C,B),B+=2;var t=Q.readUshort(C,B);B+=2;for(var a=e.ltype,s=0;s<t;s++){var n=Q.readUshort(C,B);B+=2;var h=i(C,a,o+n,e);e.tabs.push(h)}return e},A._lctf.numOfOnes=function(C){for(var B=0,i=0;i<32;i++)(C>>>i&1)!=0&&B++;return B},A._lctf.readClassDef=function(C,B){var i=A._bin,Q=[],o=i.readUshort(C,B);if(B+=2,o==1){var e=i.readUshort(C,B);B+=2;var t=i.readUshort(C,B);B+=2;for(var a=0;a<t;a++)Q.push(e+a),Q.push(e+a),Q.push(i.readUshort(C,B)),B+=2}if(o==2){var s=i.readUshort(C,B);for(B+=2,a=0;a<s;a++)Q.push(i.readUshort(C,B)),B+=2,Q.push(i.readUshort(C,B)),B+=2,Q.push(i.readUshort(C,B)),B+=2}return Q},A._lctf.getInterval=function(C,B){for(var i=0;i<C.length;i+=3){var Q=C[i],o=C[i+1];if(C[i+2],Q<=B&&B<=o)return i}return-1},A._lctf.readCoverage=function(C,B){var i=A._bin,Q={};Q.fmt=i.readUshort(C,B),B+=2;var o=i.readUshort(C,B);return B+=2,Q.fmt==1&&(Q.tab=i.readUshorts(C,B,o)),Q.fmt==2&&(Q.tab=i.readUshorts(C,B,3*o)),Q},A._lctf.coverageIndex=function(C,B){var i=C.tab;if(C.fmt==1)return i.indexOf(B);if(C.fmt==2){var Q=A._lctf.getInterval(i,B);if(Q!=-1)return i[Q+2]+(B-i[Q])}return-1},A._lctf.readFeatureList=function(C,B){var i=A._bin,Q=B,o=[],e=i.readUshort(C,B);B+=2;for(var t=0;t<e;t++){var a=i.readASCII(C,B,4);B+=4;var s=i.readUshort(C,B);B+=2;var n=A._lctf.readFeatureTable(C,Q+s);n.tag=a.trim(),o.push(n)}return o},A._lctf.readFeatureTable=function(C,B){var i=A._bin,Q=B,o={},e=i.readUshort(C,B);B+=2,e>0&&(o.featureParams=Q+e);var t=i.readUshort(C,B);B+=2,o.tab=[];for(var a=0;a<t;a++)o.tab.push(i.readUshort(C,B+2*a));return o},A._lctf.readScriptList=function(C,B){var i=A._bin,Q=B,o={},e=i.readUshort(C,B);B+=2;for(var t=0;t<e;t++){var a=i.readASCII(C,B,4);B+=4;var s=i.readUshort(C,B);B+=2,o[a.trim()]=A._lctf.readScriptTable(C,Q+s)}return o},A._lctf.readScriptTable=function(C,B){var i=A._bin,Q=B,o={},e=i.readUshort(C,B);B+=2,o.default=A._lctf.readLangSysTable(C,Q+e);var t=i.readUshort(C,B);B+=2;for(var a=0;a<t;a++){var s=i.readASCII(C,B,4);B+=4;var n=i.readUshort(C,B);B+=2,o[s.trim()]=A._lctf.readLangSysTable(C,Q+n)}return o},A._lctf.readLangSysTable=function(C,B){var i=A._bin,Q={};i.readUshort(C,B),B+=2,Q.reqFeature=i.readUshort(C,B),B+=2;var o=i.readUshort(C,B);return B+=2,Q.features=i.readUshorts(C,B,o),Q},A.CFF={},A.CFF.parse=function(C,B,i){var Q=A._bin;(C=new Uint8Array(C.buffer,B,i))[B=0],C[++B],C[++B],C[++B],B++;var o=[];B=A.CFF.readIndex(C,B,o);for(var e=[],t=0;t<o.length-1;t++)e.push(Q.readASCII(C,B+o[t],o[t+1]-o[t]));B+=o[o.length-1];var a=[];B=A.CFF.readIndex(C,B,a);var s=[];for(t=0;t<a.length-1;t++)s.push(A.CFF.readDict(C,B+a[t],B+a[t+1]));B+=a[a.length-1];var n=s[0],h=[];B=A.CFF.readIndex(C,B,h);var D=[];for(t=0;t<h.length-1;t++)D.push(Q.readASCII(C,B+h[t],h[t+1]-h[t]));if(B+=h[h.length-1],A.CFF.readSubrs(C,B,n),n.CharStrings){B=n.CharStrings,h=[],B=A.CFF.readIndex(C,B,h);var r=[];for(t=0;t<h.length-1;t++)r.push(Q.readBytes(C,B+h[t],h[t+1]-h[t]));n.CharStrings=r}if(n.ROS){B=n.FDArray;var G=[];for(B=A.CFF.readIndex(C,B,G),n.FDArray=[],t=0;t<G.length-1;t++){var w=A.CFF.readDict(C,B+G[t],B+G[t+1]);A.CFF._readFDict(C,w,D),n.FDArray.push(w)}B+=G[G.length-1],B=n.FDSelect,n.FDSelect=[];var S=C[B];if(B++,S!=3)throw S;var y=Q.readUshort(C,B);for(B+=2,t=0;t<y+1;t++)n.FDSelect.push(Q.readUshort(C,B),C[B+2]),B+=3}return n.Encoding&&(n.Encoding=A.CFF.readEncoding(C,n.Encoding,n.CharStrings.length)),n.charset&&(n.charset=A.CFF.readCharset(C,n.charset,n.CharStrings.length)),A.CFF._readFDict(C,n,D),n},A.CFF._readFDict=function(C,B,i){var Q;for(var o in B.Private&&(Q=B.Private[1],B.Private=A.CFF.readDict(C,Q,Q+B.Private[0]),B.Private.Subrs&&A.CFF.readSubrs(C,Q+B.Private.Subrs,B.Private)),B)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(B[o]=i[B[o]-426+35])},A.CFF.readSubrs=function(C,B,i){var Q=A._bin,o=[];B=A.CFF.readIndex(C,B,o);var e,t=o.length;e=t<1240?107:t<33900?1131:32768,i.Bias=e,i.Subrs=[];for(var a=0;a<o.length-1;a++)i.Subrs.push(Q.readBytes(C,B+o[a],o[a+1]-o[a]))},A.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],A.CFF.glyphByUnicode=function(C,B){for(var i=0;i<C.charset.length;i++)if(C.charset[i]==B)return i;return-1},A.CFF.glyphBySE=function(C,B){return B<0||B>255?-1:A.CFF.glyphByUnicode(C,A.CFF.tableSE[B])},A.CFF.readEncoding=function(C,B,i){A._bin;var Q=[".notdef"],o=C[B];if(B++,o!=0)throw"error: unknown encoding format: "+o;var e=C[B];B++;for(var t=0;t<e;t++)Q.push(C[B+t]);return Q},A.CFF.readCharset=function(C,B,i){var Q=A._bin,o=[".notdef"],e=C[B];if(B++,e==0)for(var t=0;t<i;t++){var a=Q.readUshort(C,B);B+=2,o.push(a)}else{if(e!=1&&e!=2)throw"error: format: "+e;for(;o.length<i;){a=Q.readUshort(C,B),B+=2;var s=0;for(e==1?(s=C[B],B++):(s=Q.readUshort(C,B),B+=2),t=0;t<=s;t++)o.push(a),a++}}return o},A.CFF.readIndex=function(C,B,i){var Q=A._bin,o=Q.readUshort(C,B)+1,e=C[B+=2];if(B++,e==1)for(var t=0;t<o;t++)i.push(C[B+t]);else if(e==2)for(t=0;t<o;t++)i.push(Q.readUshort(C,B+2*t));else if(e==3)for(t=0;t<o;t++)i.push(16777215&Q.readUint(C,B+3*t-1));else if(o!=1)throw"unsupported offset size: "+e+", count: "+o;return(B+=o*e)-1},A.CFF.getCharString=function(C,B,i){var Q=A._bin,o=C[B],e=C[B+1];C[B+2],C[B+3],C[B+4];var t=1,a=null,s=null;o<=20&&(a=o,t=1),o==12&&(a=100*o+e,t=2),21<=o&&o<=27&&(a=o,t=1),o==28&&(s=Q.readShort(C,B+1),t=3),29<=o&&o<=31&&(a=o,t=1),32<=o&&o<=246&&(s=o-139,t=1),247<=o&&o<=250&&(s=256*(o-247)+e+108,t=2),251<=o&&o<=254&&(s=256*-(o-251)-e-108,t=2),o==255&&(s=Q.readInt(C,B+1)/65535,t=5),i.val=s??"o"+a,i.size=t},A.CFF.readCharString=function(C,B,i){for(var Q=B+i,o=A._bin,e=[];B<Q;){var t=C[B],a=C[B+1];C[B+2],C[B+3],C[B+4];var s=1,n=null,h=null;t<=20&&(n=t,s=1),t==12&&(n=100*t+a,s=2),t!=19&&t!=20||(n=t,s=2),21<=t&&t<=27&&(n=t,s=1),t==28&&(h=o.readShort(C,B+1),s=3),29<=t&&t<=31&&(n=t,s=1),32<=t&&t<=246&&(h=t-139,s=1),247<=t&&t<=250&&(h=256*(t-247)+a+108,s=2),251<=t&&t<=254&&(h=256*-(t-251)-a-108,s=2),t==255&&(h=o.readInt(C,B+1)/65535,s=5),e.push(h??"o"+n),B+=s}return e},A.CFF.readDict=function(C,B,i){for(var Q=A._bin,o={},e=[];B<i;){var t=C[B],a=C[B+1];C[B+2],C[B+3],C[B+4];var s=1,n=null,h=null;if(t==28&&(h=Q.readShort(C,B+1),s=3),t==29&&(h=Q.readInt(C,B+1),s=5),32<=t&&t<=246&&(h=t-139,s=1),247<=t&&t<=250&&(h=256*(t-247)+a+108,s=2),251<=t&&t<=254&&(h=256*-(t-251)-a-108,s=2),t==255)throw h=Q.readInt(C,B+1)/65535,s=5,"unknown number";if(t==30){var D=[];for(s=1;;){var r=C[B+s];s++;var G=r>>4,w=15&r;if(G!=15&&D.push(G),w!=15&&D.push(w),w==15)break}for(var S="",y=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],M=0;M<D.length;M++)S+=y[D[M]];h=parseFloat(S)}t<=21&&(n=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][t],s=1,t==12&&(n=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][a],s=2)),n!=null?(o[n]=e.length==1?e[0]:e,e=[]):e.push(h),B+=s}return o},A.cmap={},A.cmap.parse=function(C,B,i){C=new Uint8Array(C.buffer,B,i),B=0;var Q=A._bin,o={};Q.readUshort(C,B),B+=2;var e=Q.readUshort(C,B);B+=2;var t=[];o.tables=[];for(var a=0;a<e;a++){var s=Q.readUshort(C,B);B+=2;var n=Q.readUshort(C,B);B+=2;var h=Q.readUint(C,B);B+=4;var D="p"+s+"e"+n,r=t.indexOf(h);if(r==-1){var G;r=o.tables.length,t.push(h);var w=Q.readUshort(C,h);w==0?G=A.cmap.parse0(C,h):w==4?G=A.cmap.parse4(C,h):w==6?G=A.cmap.parse6(C,h):w==12?G=A.cmap.parse12(C,h):console.debug("unknown format: "+w,s,n,h),o.tables.push(G)}if(o[D]!=null)throw"multiple tables for one platform+encoding";o[D]=r}return o},A.cmap.parse0=function(C,B){var i=A._bin,Q={};Q.format=i.readUshort(C,B),B+=2;var o=i.readUshort(C,B);B+=2,i.readUshort(C,B),B+=2,Q.map=[];for(var e=0;e<o-6;e++)Q.map.push(C[B+e]);return Q},A.cmap.parse4=function(C,B){var i=A._bin,Q=B,o={};o.format=i.readUshort(C,B),B+=2;var e=i.readUshort(C,B);B+=2,i.readUshort(C,B),B+=2;var t=i.readUshort(C,B);B+=2;var a=t/2;o.searchRange=i.readUshort(C,B),B+=2,o.entrySelector=i.readUshort(C,B),B+=2,o.rangeShift=i.readUshort(C,B),B+=2,o.endCount=i.readUshorts(C,B,a),B+=2*a,B+=2,o.startCount=i.readUshorts(C,B,a),B+=2*a,o.idDelta=[];for(var s=0;s<a;s++)o.idDelta.push(i.readShort(C,B)),B+=2;for(o.idRangeOffset=i.readUshorts(C,B,a),B+=2*a,o.glyphIdArray=[];B<Q+e;)o.glyphIdArray.push(i.readUshort(C,B)),B+=2;return o},A.cmap.parse6=function(C,B){var i=A._bin,Q={};Q.format=i.readUshort(C,B),B+=2,i.readUshort(C,B),B+=2,i.readUshort(C,B),B+=2,Q.firstCode=i.readUshort(C,B),B+=2;var o=i.readUshort(C,B);B+=2,Q.glyphIdArray=[];for(var e=0;e<o;e++)Q.glyphIdArray.push(i.readUshort(C,B)),B+=2;return Q},A.cmap.parse12=function(C,B){var i=A._bin,Q={};Q.format=i.readUshort(C,B),B+=2,B+=2,i.readUint(C,B),B+=4,i.readUint(C,B),B+=4;var o=i.readUint(C,B);B+=4,Q.groups=[];for(var e=0;e<o;e++){var t=B+12*e,a=i.readUint(C,t+0),s=i.readUint(C,t+4),n=i.readUint(C,t+8);Q.groups.push([a,s,n])}return Q},A.glyf={},A.glyf.parse=function(C,B,i,Q){for(var o=[],e=0;e<Q.maxp.numGlyphs;e++)o.push(null);return o},A.glyf._parseGlyf=function(C,B){var i=A._bin,Q=C._data,o=A._tabOffset(Q,"glyf",C._offset)+C.loca[B];if(C.loca[B]==C.loca[B+1])return null;var e={};if(e.noc=i.readShort(Q,o),o+=2,e.xMin=i.readShort(Q,o),o+=2,e.yMin=i.readShort(Q,o),o+=2,e.xMax=i.readShort(Q,o),o+=2,e.yMax=i.readShort(Q,o),o+=2,e.xMin>=e.xMax||e.yMin>=e.yMax)return null;if(e.noc>0){e.endPts=[];for(var t=0;t<e.noc;t++)e.endPts.push(i.readUshort(Q,o)),o+=2;var a=i.readUshort(Q,o);if(o+=2,Q.length-o<a)return null;e.instructions=i.readBytes(Q,o,a),o+=a;var s=e.endPts[e.noc-1]+1;for(e.flags=[],t=0;t<s;t++){var n=Q[o];if(o++,e.flags.push(n),(8&n)!=0){var h=Q[o];o++;for(var D=0;D<h;D++)e.flags.push(n),t++}}for(e.xs=[],t=0;t<s;t++){var r=(2&e.flags[t])!=0,G=(16&e.flags[t])!=0;r?(e.xs.push(G?Q[o]:-Q[o]),o++):G?e.xs.push(0):(e.xs.push(i.readShort(Q,o)),o+=2)}for(e.ys=[],t=0;t<s;t++)r=(4&e.flags[t])!=0,G=(32&e.flags[t])!=0,r?(e.ys.push(G?Q[o]:-Q[o]),o++):G?e.ys.push(0):(e.ys.push(i.readShort(Q,o)),o+=2);var w=0,S=0;for(t=0;t<s;t++)w+=e.xs[t],S+=e.ys[t],e.xs[t]=w,e.ys[t]=S}else{var y;e.parts=[];do{y=i.readUshort(Q,o),o+=2;var M={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(e.parts.push(M),M.glyphIndex=i.readUshort(Q,o),o+=2,1&y){var p=i.readShort(Q,o);o+=2;var U=i.readShort(Q,o);o+=2}else p=i.readInt8(Q,o),o++,U=i.readInt8(Q,o),o++;2&y?(M.m.tx=p,M.m.ty=U):(M.p1=p,M.p2=U),8&y?(M.m.a=M.m.d=i.readF2dot14(Q,o),o+=2):64&y?(M.m.a=i.readF2dot14(Q,o),o+=2,M.m.d=i.readF2dot14(Q,o),o+=2):128&y&&(M.m.a=i.readF2dot14(Q,o),o+=2,M.m.b=i.readF2dot14(Q,o),o+=2,M.m.c=i.readF2dot14(Q,o),o+=2,M.m.d=i.readF2dot14(Q,o),o+=2)}while(32&y);if(256&y){var l=i.readUshort(Q,o);for(o+=2,e.instr=[],t=0;t<l;t++)e.instr.push(Q[o]),o++}}return e},A.GPOS={},A.GPOS.parse=function(C,B,i,Q){return A._lctf.parse(C,B,i,Q,A.GPOS.subt)},A.GPOS.subt=function(C,B,i,Q){var o=A._bin,e=i,t={};if(t.fmt=o.readUshort(C,i),i+=2,B==1||B==2||B==3||B==7||B==8&&t.fmt<=2){var a=o.readUshort(C,i);i+=2,t.coverage=A._lctf.readCoverage(C,a+e)}if(B==1&&t.fmt==1){var s=o.readUshort(C,i);i+=2;var n=A._lctf.numOfOnes(s);s!=0&&(t.pos=A.GPOS.readValueRecord(C,i,s))}else if(B==2&&t.fmt>=1&&t.fmt<=2){s=o.readUshort(C,i),i+=2;var h=o.readUshort(C,i);i+=2,n=A._lctf.numOfOnes(s);var D=A._lctf.numOfOnes(h);if(t.fmt==1){t.pairsets=[];var r=o.readUshort(C,i);i+=2;for(var G=0;G<r;G++){var w=e+o.readUshort(C,i);i+=2;var S=o.readUshort(C,w);w+=2;for(var y=[],M=0;M<S;M++){var p=o.readUshort(C,w);w+=2,s!=0&&(q=A.GPOS.readValueRecord(C,w,s),w+=2*n),h!=0&&(f=A.GPOS.readValueRecord(C,w,h),w+=2*D),y.push({gid2:p,val1:q,val2:f})}t.pairsets.push(y)}}if(t.fmt==2){var U=o.readUshort(C,i);i+=2;var l=o.readUshort(C,i);i+=2;var N=o.readUshort(C,i);i+=2;var Y=o.readUshort(C,i);for(i+=2,t.classDef1=A._lctf.readClassDef(C,e+U),t.classDef2=A._lctf.readClassDef(C,e+l),t.matrix=[],G=0;G<N;G++){var z=[];for(M=0;M<Y;M++){var q=null,f=null;s!=0&&(q=A.GPOS.readValueRecord(C,i,s),i+=2*n),h!=0&&(f=A.GPOS.readValueRecord(C,i,h),i+=2*D),z.push({val1:q,val2:f})}t.matrix.push(z)}}}else{if(B==9&&t.fmt==1){var K=o.readUshort(C,i);i+=2;var H=o.readUint(C,i);if(i+=4,Q.ltype==9)Q.ltype=K;else if(Q.ltype!=K)throw"invalid extension substitution";return A.GPOS.subt(C,Q.ltype,e+H)}console.debug("unsupported GPOS table LookupType",B,"format",t.fmt)}return t},A.GPOS.readValueRecord=function(C,B,i){var Q=A._bin,o=[];return o.push(1&i?Q.readShort(C,B):0),B+=1&i?2:0,o.push(2&i?Q.readShort(C,B):0),B+=2&i?2:0,o.push(4&i?Q.readShort(C,B):0),B+=4&i?2:0,o.push(8&i?Q.readShort(C,B):0),B+=8&i?2:0,o},A.GSUB={},A.GSUB.parse=function(C,B,i,Q){return A._lctf.parse(C,B,i,Q,A.GSUB.subt)},A.GSUB.subt=function(C,B,i,Q){var o=A._bin,e=i,t={};if(t.fmt=o.readUshort(C,i),i+=2,B!=1&&B!=4&&B!=5&&B!=6)return null;if(B==1||B==4||B==5&&t.fmt<=2||B==6&&t.fmt<=2){var a=o.readUshort(C,i);i+=2,t.coverage=A._lctf.readCoverage(C,e+a)}if(B==1&&t.fmt>=1&&t.fmt<=2){if(t.fmt==1)t.delta=o.readShort(C,i),i+=2;else if(t.fmt==2){var s=o.readUshort(C,i);i+=2,t.newg=o.readUshorts(C,i,s),i+=2*t.newg.length}}else if(B==4){t.vals=[],s=o.readUshort(C,i),i+=2;for(var n=0;n<s;n++){var h=o.readUshort(C,i);i+=2,t.vals.push(A.GSUB.readLigatureSet(C,e+h))}}else if(B==5&&t.fmt==2){if(t.fmt==2){var D=o.readUshort(C,i);i+=2,t.cDef=A._lctf.readClassDef(C,e+D),t.scset=[];var r=o.readUshort(C,i);for(i+=2,n=0;n<r;n++){var G=o.readUshort(C,i);i+=2,t.scset.push(G==0?null:A.GSUB.readSubClassSet(C,e+G))}}}else if(B==6&&t.fmt==3){if(t.fmt==3){for(n=0;n<3;n++){s=o.readUshort(C,i),i+=2;for(var w=[],S=0;S<s;S++)w.push(A._lctf.readCoverage(C,e+o.readUshort(C,i+2*S)));i+=2*s,n==0&&(t.backCvg=w),n==1&&(t.inptCvg=w),n==2&&(t.ahedCvg=w)}s=o.readUshort(C,i),i+=2,t.lookupRec=A.GSUB.readSubstLookupRecords(C,i,s)}}else{if(B==7&&t.fmt==1){var y=o.readUshort(C,i);i+=2;var M=o.readUint(C,i);if(i+=4,Q.ltype==9)Q.ltype=y;else if(Q.ltype!=y)throw"invalid extension substitution";return A.GSUB.subt(C,Q.ltype,e+M)}console.debug("unsupported GSUB table LookupType",B,"format",t.fmt)}return t},A.GSUB.readSubClassSet=function(C,B){var i=A._bin.readUshort,Q=B,o=[],e=i(C,B);B+=2;for(var t=0;t<e;t++){var a=i(C,B);B+=2,o.push(A.GSUB.readSubClassRule(C,Q+a))}return o},A.GSUB.readSubClassRule=function(C,B){var i=A._bin.readUshort,Q={},o=i(C,B),e=i(C,B+=2);B+=2,Q.input=[];for(var t=0;t<o-1;t++)Q.input.push(i(C,B)),B+=2;return Q.substLookupRecords=A.GSUB.readSubstLookupRecords(C,B,e),Q},A.GSUB.readSubstLookupRecords=function(C,B,i){for(var Q=A._bin.readUshort,o=[],e=0;e<i;e++)o.push(Q(C,B),Q(C,B+2)),B+=4;return o},A.GSUB.readChainSubClassSet=function(C,B){var i=A._bin,Q=B,o=[],e=i.readUshort(C,B);B+=2;for(var t=0;t<e;t++){var a=i.readUshort(C,B);B+=2,o.push(A.GSUB.readChainSubClassRule(C,Q+a))}return o},A.GSUB.readChainSubClassRule=function(C,B){for(var i=A._bin,Q={},o=["backtrack","input","lookahead"],e=0;e<o.length;e++){var t=i.readUshort(C,B);B+=2,e==1&&t--,Q[o[e]]=i.readUshorts(C,B,t),B+=2*Q[o[e]].length}return t=i.readUshort(C,B),B+=2,Q.subst=i.readUshorts(C,B,2*t),B+=2*Q.subst.length,Q},A.GSUB.readLigatureSet=function(C,B){var i=A._bin,Q=B,o=[],e=i.readUshort(C,B);B+=2;for(var t=0;t<e;t++){var a=i.readUshort(C,B);B+=2,o.push(A.GSUB.readLigature(C,Q+a))}return o},A.GSUB.readLigature=function(C,B){var i=A._bin,Q={chain:[]};Q.nglyph=i.readUshort(C,B),B+=2;var o=i.readUshort(C,B);B+=2;for(var e=0;e<o-1;e++)Q.chain.push(i.readUshort(C,B)),B+=2;return Q},A.head={},A.head.parse=function(C,B,i){var Q=A._bin,o={};return Q.readFixed(C,B),B+=4,o.fontRevision=Q.readFixed(C,B),B+=4,Q.readUint(C,B),B+=4,Q.readUint(C,B),B+=4,o.flags=Q.readUshort(C,B),B+=2,o.unitsPerEm=Q.readUshort(C,B),B+=2,o.created=Q.readUint64(C,B),B+=8,o.modified=Q.readUint64(C,B),B+=8,o.xMin=Q.readShort(C,B),B+=2,o.yMin=Q.readShort(C,B),B+=2,o.xMax=Q.readShort(C,B),B+=2,o.yMax=Q.readShort(C,B),B+=2,o.macStyle=Q.readUshort(C,B),B+=2,o.lowestRecPPEM=Q.readUshort(C,B),B+=2,o.fontDirectionHint=Q.readShort(C,B),B+=2,o.indexToLocFormat=Q.readShort(C,B),B+=2,o.glyphDataFormat=Q.readShort(C,B),B+=2,o},A.hhea={},A.hhea.parse=function(C,B,i){var Q=A._bin,o={};return Q.readFixed(C,B),B+=4,o.ascender=Q.readShort(C,B),B+=2,o.descender=Q.readShort(C,B),B+=2,o.lineGap=Q.readShort(C,B),B+=2,o.advanceWidthMax=Q.readUshort(C,B),B+=2,o.minLeftSideBearing=Q.readShort(C,B),B+=2,o.minRightSideBearing=Q.readShort(C,B),B+=2,o.xMaxExtent=Q.readShort(C,B),B+=2,o.caretSlopeRise=Q.readShort(C,B),B+=2,o.caretSlopeRun=Q.readShort(C,B),B+=2,o.caretOffset=Q.readShort(C,B),B+=2,B+=8,o.metricDataFormat=Q.readShort(C,B),B+=2,o.numberOfHMetrics=Q.readUshort(C,B),B+=2,o},A.hmtx={},A.hmtx.parse=function(C,B,i,Q){for(var o=A._bin,e={aWidth:[],lsBearing:[]},t=0,a=0,s=0;s<Q.maxp.numGlyphs;s++)s<Q.hhea.numberOfHMetrics&&(t=o.readUshort(C,B),B+=2,a=o.readShort(C,B),B+=2),e.aWidth.push(t),e.lsBearing.push(a);return e},A.kern={},A.kern.parse=function(C,B,i,Q){var o=A._bin,e=o.readUshort(C,B);if(B+=2,e==1)return A.kern.parseV1(C,B-2,i,Q);var t=o.readUshort(C,B);B+=2;for(var a={glyph1:[],rval:[]},s=0;s<t;s++){B+=2,i=o.readUshort(C,B),B+=2;var n=o.readUshort(C,B);B+=2;var h=n>>>8;if((h&=15)!=0)throw"unknown kern table format: "+h;B=A.kern.readFormat0(C,B,a)}return a},A.kern.parseV1=function(C,B,i,Q){var o=A._bin;o.readFixed(C,B),B+=4;var e=o.readUint(C,B);B+=4;for(var t={glyph1:[],rval:[]},a=0;a<e;a++){o.readUint(C,B),B+=4;var s=o.readUshort(C,B);B+=2,o.readUshort(C,B),B+=2;var n=s>>>8;if((n&=15)!=0)throw"unknown kern table format: "+n;B=A.kern.readFormat0(C,B,t)}return t},A.kern.readFormat0=function(C,B,i){var Q=A._bin,o=-1,e=Q.readUshort(C,B);B+=2,Q.readUshort(C,B),B+=2,Q.readUshort(C,B),B+=2,Q.readUshort(C,B),B+=2;for(var t=0;t<e;t++){var a=Q.readUshort(C,B);B+=2;var s=Q.readUshort(C,B);B+=2;var n=Q.readShort(C,B);B+=2,a!=o&&(i.glyph1.push(a),i.rval.push({glyph2:[],vals:[]}));var h=i.rval[i.rval.length-1];h.glyph2.push(s),h.vals.push(n),o=a}return B},A.loca={},A.loca.parse=function(C,B,i,Q){var o=A._bin,e=[],t=Q.head.indexToLocFormat,a=Q.maxp.numGlyphs+1;if(t==0)for(var s=0;s<a;s++)e.push(o.readUshort(C,B+(s<<1))<<1);if(t==1)for(s=0;s<a;s++)e.push(o.readUint(C,B+(s<<2)));return e},A.maxp={},A.maxp.parse=function(C,B,i){var Q=A._bin,o={},e=Q.readUint(C,B);return B+=4,o.numGlyphs=Q.readUshort(C,B),B+=2,e==65536&&(o.maxPoints=Q.readUshort(C,B),B+=2,o.maxContours=Q.readUshort(C,B),B+=2,o.maxCompositePoints=Q.readUshort(C,B),B+=2,o.maxCompositeContours=Q.readUshort(C,B),B+=2,o.maxZones=Q.readUshort(C,B),B+=2,o.maxTwilightPoints=Q.readUshort(C,B),B+=2,o.maxStorage=Q.readUshort(C,B),B+=2,o.maxFunctionDefs=Q.readUshort(C,B),B+=2,o.maxInstructionDefs=Q.readUshort(C,B),B+=2,o.maxStackElements=Q.readUshort(C,B),B+=2,o.maxSizeOfInstructions=Q.readUshort(C,B),B+=2,o.maxComponentElements=Q.readUshort(C,B),B+=2,o.maxComponentDepth=Q.readUshort(C,B),B+=2),o},A.name={},A.name.parse=function(C,B,i){var Q=A._bin,o={};Q.readUshort(C,B),B+=2;var e=Q.readUshort(C,B);B+=2,Q.readUshort(C,B);for(var t,a=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],s=B+=2,n=0;n<e;n++){var h=Q.readUshort(C,B);B+=2;var D=Q.readUshort(C,B);B+=2;var r=Q.readUshort(C,B);B+=2;var G=Q.readUshort(C,B);B+=2;var w=Q.readUshort(C,B);B+=2;var S=Q.readUshort(C,B);B+=2;var y,M=a[G],p=s+12*e+S;if(h==0)y=Q.readUnicode(C,p,w/2);else if(h==3&&D==0)y=Q.readUnicode(C,p,w/2);else if(D==0)y=Q.readASCII(C,p,w);else if(D==1)y=Q.readUnicode(C,p,w/2);else if(D==3)y=Q.readUnicode(C,p,w/2);else{if(h!=1)throw"unknown encoding "+D+", platformID: "+h;y=Q.readASCII(C,p,w),console.debug("reading unknown MAC encoding "+D+" as ASCII")}var U="p"+h+","+r.toString(16);o[U]==null&&(o[U]={}),o[U][M!==void 0?M:G]=y,o[U]._lang=r}for(var l in o)if(o[l].postScriptName!=null&&o[l]._lang==1033)return o[l];for(var l in o)if(o[l].postScriptName!=null&&o[l]._lang==0)return o[l];for(var l in o)if(o[l].postScriptName!=null&&o[l]._lang==3084)return o[l];for(var l in o)if(o[l].postScriptName!=null)return o[l];for(var l in o){t=l;break}return console.debug("returning name table with languageID "+o[t]._lang),o[t]},A["OS/2"]={},A["OS/2"].parse=function(C,B,i){var Q=A._bin.readUshort(C,B);B+=2;var o={};if(Q==0)A["OS/2"].version0(C,B,o);else if(Q==1)A["OS/2"].version1(C,B,o);else if(Q==2||Q==3||Q==4)A["OS/2"].version2(C,B,o);else{if(Q!=5)throw"unknown OS/2 table version: "+Q;A["OS/2"].version5(C,B,o)}return o},A["OS/2"].version0=function(C,B,i){var Q=A._bin;return i.xAvgCharWidth=Q.readShort(C,B),B+=2,i.usWeightClass=Q.readUshort(C,B),B+=2,i.usWidthClass=Q.readUshort(C,B),B+=2,i.fsType=Q.readUshort(C,B),B+=2,i.ySubscriptXSize=Q.readShort(C,B),B+=2,i.ySubscriptYSize=Q.readShort(C,B),B+=2,i.ySubscriptXOffset=Q.readShort(C,B),B+=2,i.ySubscriptYOffset=Q.readShort(C,B),B+=2,i.ySuperscriptXSize=Q.readShort(C,B),B+=2,i.ySuperscriptYSize=Q.readShort(C,B),B+=2,i.ySuperscriptXOffset=Q.readShort(C,B),B+=2,i.ySuperscriptYOffset=Q.readShort(C,B),B+=2,i.yStrikeoutSize=Q.readShort(C,B),B+=2,i.yStrikeoutPosition=Q.readShort(C,B),B+=2,i.sFamilyClass=Q.readShort(C,B),B+=2,i.panose=Q.readBytes(C,B,10),B+=10,i.ulUnicodeRange1=Q.readUint(C,B),B+=4,i.ulUnicodeRange2=Q.readUint(C,B),B+=4,i.ulUnicodeRange3=Q.readUint(C,B),B+=4,i.ulUnicodeRange4=Q.readUint(C,B),B+=4,i.achVendID=[Q.readInt8(C,B),Q.readInt8(C,B+1),Q.readInt8(C,B+2),Q.readInt8(C,B+3)],B+=4,i.fsSelection=Q.readUshort(C,B),B+=2,i.usFirstCharIndex=Q.readUshort(C,B),B+=2,i.usLastCharIndex=Q.readUshort(C,B),B+=2,i.sTypoAscender=Q.readShort(C,B),B+=2,i.sTypoDescender=Q.readShort(C,B),B+=2,i.sTypoLineGap=Q.readShort(C,B),B+=2,i.usWinAscent=Q.readUshort(C,B),B+=2,i.usWinDescent=Q.readUshort(C,B),B+=2},A["OS/2"].version1=function(C,B,i){var Q=A._bin;return B=A["OS/2"].version0(C,B,i),i.ulCodePageRange1=Q.readUint(C,B),B+=4,i.ulCodePageRange2=Q.readUint(C,B),B+=4},A["OS/2"].version2=function(C,B,i){var Q=A._bin;return B=A["OS/2"].version1(C,B,i),i.sxHeight=Q.readShort(C,B),B+=2,i.sCapHeight=Q.readShort(C,B),B+=2,i.usDefault=Q.readUshort(C,B),B+=2,i.usBreak=Q.readUshort(C,B),B+=2,i.usMaxContext=Q.readUshort(C,B),B+=2},A["OS/2"].version5=function(C,B,i){var Q=A._bin;return B=A["OS/2"].version2(C,B,i),i.usLowerOpticalPointSize=Q.readUshort(C,B),B+=2,i.usUpperOpticalPointSize=Q.readUshort(C,B),B+=2},A.post={},A.post.parse=function(C,B,i){var Q=A._bin,o={};return o.version=Q.readFixed(C,B),B+=4,o.italicAngle=Q.readFixed(C,B),B+=4,o.underlinePosition=Q.readShort(C,B),B+=2,o.underlineThickness=Q.readShort(C,B),B+=2,o},A==null&&(A={}),A.U==null&&(A.U={}),A.U.codeToGlyph=function(C,B){var i=C.cmap,Q=-1;if(i.p0e4!=null?Q=i.p0e4:i.p3e1!=null?Q=i.p3e1:i.p1e0!=null?Q=i.p1e0:i.p0e3!=null&&(Q=i.p0e3),Q==-1)throw"no familiar platform and encoding!";var o=i.tables[Q];if(o.format==0)return B>=o.map.length?0:o.map[B];if(o.format==4){for(var e=-1,t=0;t<o.endCount.length;t++)if(B<=o.endCount[t]){e=t;break}return e==-1||o.startCount[e]>B?0:65535&(o.idRangeOffset[e]!=0?o.glyphIdArray[B-o.startCount[e]+(o.idRangeOffset[e]>>1)-(o.idRangeOffset.length-e)]:B+o.idDelta[e])}if(o.format==12){if(B>o.groups[o.groups.length-1][1])return 0;for(t=0;t<o.groups.length;t++){var a=o.groups[t];if(a[0]<=B&&B<=a[1])return a[2]+(B-a[0])}return 0}throw"unknown cmap table format "+o.format},A.U.glyphToPath=function(C,B){var i={cmds:[],crds:[]};if(C.SVG&&C.SVG.entries[B]){var Q=C.SVG.entries[B];return Q==null?i:(typeof Q=="string"&&(Q=A.SVG.toPath(Q),C.SVG.entries[B]=Q),Q)}if(C.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:C.CFF.Private?C.CFF.Private.defaultWidthX:0,open:!1},e=C.CFF,t=C.CFF.Private;if(e.ROS){for(var a=0;e.FDSelect[a+2]<=B;)a+=2;t=e.FDArray[e.FDSelect[a+1]].Private}A.U._drawCFF(C.CFF.CharStrings[B],o,e,t,i)}else C.glyf&&A.U._drawGlyf(B,C,i);return i},A.U._drawGlyf=function(C,B,i){var Q=B.glyf[C];Q==null&&(Q=B.glyf[C]=A.glyf._parseGlyf(B,C)),Q!=null&&(Q.noc>-1?A.U._simpleGlyph(Q,i):A.U._compoGlyph(Q,B,i))},A.U._simpleGlyph=function(C,B){for(var i=0;i<C.noc;i++){for(var Q=i==0?0:C.endPts[i-1]+1,o=C.endPts[i],e=Q;e<=o;e++){var t=e==Q?o:e-1,a=e==o?Q:e+1,s=1&C.flags[e],n=1&C.flags[t],h=1&C.flags[a],D=C.xs[e],r=C.ys[e];if(e==Q)if(s){if(!n){A.U.P.moveTo(B,D,r);continue}A.U.P.moveTo(B,C.xs[t],C.ys[t])}else n?A.U.P.moveTo(B,C.xs[t],C.ys[t]):A.U.P.moveTo(B,(C.xs[t]+D)/2,(C.ys[t]+r)/2);s?n&&A.U.P.lineTo(B,D,r):h?A.U.P.qcurveTo(B,D,r,C.xs[a],C.ys[a]):A.U.P.qcurveTo(B,D,r,(D+C.xs[a])/2,(r+C.ys[a])/2)}A.U.P.closePath(B)}},A.U._compoGlyph=function(C,B,i){for(var Q=0;Q<C.parts.length;Q++){var o={cmds:[],crds:[]},e=C.parts[Q];A.U._drawGlyf(e.glyphIndex,B,o);for(var t=e.m,a=0;a<o.crds.length;a+=2){var s=o.crds[a],n=o.crds[a+1];i.crds.push(s*t.a+n*t.b+t.tx),i.crds.push(s*t.c+n*t.d+t.ty)}for(a=0;a<o.cmds.length;a++)i.cmds.push(o.cmds[a])}},A.U._getGlyphClass=function(C,B){var i=A._lctf.getInterval(B,C);return i==-1?0:B[i+2]},A.U.getPairAdjustment=function(C,B,i){var Q=!1;if(C.GPOS)for(var o=C.GPOS,e=o.lookupList,t=o.featureList,a=[],s=0;s<t.length;s++){var n=t[s];if(n.tag=="kern"){Q=!0;for(var h=0;h<n.tab.length;h++)if(!a[n.tab[h]]){a[n.tab[h]]=!0;for(var D=e[n.tab[h]],r=0;r<D.tabs.length;r++)if(D.tabs[r]!=null){var G,w=D.tabs[r];if((!w.coverage||(G=A._lctf.coverageIndex(w.coverage,B))!=-1)&&D.ltype!=1){if(D.ltype==2){var S=null;if(w.fmt==1){var y=w.pairsets[G];for(s=0;s<y.length;s++)y[s].gid2==i&&(S=y[s])}else if(w.fmt==2){var M=A.U._getGlyphClass(B,w.classDef1),p=A.U._getGlyphClass(i,w.classDef2);S=w.matrix[M][p]}if(S){var U=0;return S.val1&&S.val1[2]&&(U+=S.val1[2]),S.val2&&S.val2[0]&&(U+=S.val2[0]),U}}}}}}}if(C.kern&&!Q){var l=C.kern.glyph1.indexOf(B);if(l!=-1){var N=C.kern.rval[l].glyph2.indexOf(i);if(N!=-1)return C.kern.rval[l].vals[N]}}return 0},A.U._applySubs=function(C,B,i,Q){for(var o=C.length-B-1,e=0;e<i.tabs.length;e++)if(i.tabs[e]!=null){var t,a=i.tabs[e];if(!a.coverage||(t=A._lctf.coverageIndex(a.coverage,C[B]))!=-1){if(i.ltype==1)C[B],a.fmt==1?C[B]=C[B]+a.delta:C[B]=a.newg[t];else if(i.ltype==4)for(var s=a.vals[t],n=0;n<s.length;n++){var h=s[n],D=h.chain.length;if(!(D>o)){for(var r=!0,G=0,w=0;w<D;w++){for(;C[B+G+(1+w)]==-1;)G++;h.chain[w]!=C[B+G+(1+w)]&&(r=!1)}if(r){for(C[B]=h.nglyph,w=0;w<D+G;w++)C[B+w+1]=-1;break}}}else if(i.ltype==5&&a.fmt==2)for(var S=A._lctf.getInterval(a.cDef,C[B]),y=a.cDef[S+2],M=a.scset[y],p=0;p<M.length;p++){var U=M[p],l=U.input;if(!(l.length>o)){for(r=!0,w=0;w<l.length;w++){var N=A._lctf.getInterval(a.cDef,C[B+1+w]);if(S==-1&&a.cDef[N+2]!=l[w]){r=!1;break}}if(r){var Y=U.substLookupRecords;for(n=0;n<Y.length;n+=2)Y[n],Y[n+1]}}}else if(i.ltype==6&&a.fmt==3){if(!A.U._glsCovered(C,a.backCvg,B-a.backCvg.length)||!A.U._glsCovered(C,a.inptCvg,B)||!A.U._glsCovered(C,a.ahedCvg,B+a.inptCvg.length))continue;var z=a.lookupRec;for(p=0;p<z.length;p+=2){S=z[p];var q=Q[z[p+1]];A.U._applySubs(C,B+S,q,Q)}}}}},A.U._glsCovered=function(C,B,i){for(var Q=0;Q<B.length;Q++)if(A._lctf.coverageIndex(B[Q],C[i+Q])==-1)return!1;return!0},A.U.glyphsToPath=function(C,B,i){for(var Q={cmds:[],crds:[]},o=0,e=0;e<B.length;e++){var t=B[e];if(t!=-1){for(var a=e<B.length-1&&B[e+1]!=-1?B[e+1]:0,s=A.U.glyphToPath(C,t),n=0;n<s.crds.length;n+=2)Q.crds.push(s.crds[n]+o),Q.crds.push(s.crds[n+1]);for(i&&Q.cmds.push(i),n=0;n<s.cmds.length;n++)Q.cmds.push(s.cmds[n]);i&&Q.cmds.push("X"),o+=C.hmtx.aWidth[t],e<B.length-1&&(o+=A.U.getPairAdjustment(C,t,a))}}return Q},A.U.P={},A.U.P.moveTo=function(C,B,i){C.cmds.push("M"),C.crds.push(B,i)},A.U.P.lineTo=function(C,B,i){C.cmds.push("L"),C.crds.push(B,i)},A.U.P.curveTo=function(C,B,i,Q,o,e,t){C.cmds.push("C"),C.crds.push(B,i,Q,o,e,t)},A.U.P.qcurveTo=function(C,B,i,Q,o){C.cmds.push("Q"),C.crds.push(B,i,Q,o)},A.U.P.closePath=function(C){C.cmds.push("Z")},A.U._drawCFF=function(C,B,i,Q,o){for(var e=B.stack,t=B.nStems,a=B.haveWidth,s=B.width,n=B.open,h=0,D=B.x,r=B.y,G=0,w=0,S=0,y=0,M=0,p=0,U=0,l=0,N=0,Y=0,z={val:0,size:0};h<C.length;){A.CFF.getCharString(C,h,z);var q=z.val;if(h+=z.size,q=="o1"||q=="o18")e.length%2!=0&&!a&&(s=e.shift()+Q.nominalWidthX),t+=e.length>>1,e.length=0,a=!0;else if(q=="o3"||q=="o23")e.length%2!=0&&!a&&(s=e.shift()+Q.nominalWidthX),t+=e.length>>1,e.length=0,a=!0;else if(q=="o4")e.length>1&&!a&&(s=e.shift()+Q.nominalWidthX,a=!0),n&&A.U.P.closePath(o),r+=e.pop(),A.U.P.moveTo(o,D,r),n=!0;else if(q=="o5")for(;e.length>0;)D+=e.shift(),r+=e.shift(),A.U.P.lineTo(o,D,r);else if(q=="o6"||q=="o7")for(var f=e.length,K=q=="o6",H=0;H<f;H++){var j=e.shift();K?D+=j:r+=j,K=!K,A.U.P.lineTo(o,D,r)}else if(q=="o8"||q=="o24"){f=e.length;for(var EA=0;EA+6<=f;)G=D+e.shift(),w=r+e.shift(),S=G+e.shift(),y=w+e.shift(),D=S+e.shift(),r=y+e.shift(),A.U.P.curveTo(o,G,w,S,y,D,r),EA+=6;q=="o24"&&(D+=e.shift(),r+=e.shift(),A.U.P.lineTo(o,D,r))}else{if(q=="o11")break;if(q=="o1234"||q=="o1235"||q=="o1236"||q=="o1237")q=="o1234"&&(w=r,S=(G=D+e.shift())+e.shift(),Y=y=w+e.shift(),p=y,l=r,D=(U=(M=(N=S+e.shift())+e.shift())+e.shift())+e.shift(),A.U.P.curveTo(o,G,w,S,y,N,Y),A.U.P.curveTo(o,M,p,U,l,D,r)),q=="o1235"&&(G=D+e.shift(),w=r+e.shift(),S=G+e.shift(),y=w+e.shift(),N=S+e.shift(),Y=y+e.shift(),M=N+e.shift(),p=Y+e.shift(),U=M+e.shift(),l=p+e.shift(),D=U+e.shift(),r=l+e.shift(),e.shift(),A.U.P.curveTo(o,G,w,S,y,N,Y),A.U.P.curveTo(o,M,p,U,l,D,r)),q=="o1236"&&(G=D+e.shift(),w=r+e.shift(),S=G+e.shift(),Y=y=w+e.shift(),p=y,U=(M=(N=S+e.shift())+e.shift())+e.shift(),l=p+e.shift(),D=U+e.shift(),A.U.P.curveTo(o,G,w,S,y,N,Y),A.U.P.curveTo(o,M,p,U,l,D,r)),q=="o1237"&&(G=D+e.shift(),w=r+e.shift(),S=G+e.shift(),y=w+e.shift(),N=S+e.shift(),Y=y+e.shift(),M=N+e.shift(),p=Y+e.shift(),U=M+e.shift(),l=p+e.shift(),Math.abs(U-D)>Math.abs(l-r)?D=U+e.shift():r=l+e.shift(),A.U.P.curveTo(o,G,w,S,y,N,Y),A.U.P.curveTo(o,M,p,U,l,D,r));else if(q=="o14"){if(e.length>0&&!a&&(s=e.shift()+i.nominalWidthX,a=!0),e.length==4){var Z=e.shift(),x=e.shift(),T=e.shift(),F=e.shift(),J=A.CFF.glyphBySE(i,T),_=A.CFF.glyphBySE(i,F);A.U._drawCFF(i.CharStrings[J],B,i,Q,o),B.x=Z,B.y=x,A.U._drawCFF(i.CharStrings[_],B,i,Q,o)}n&&(A.U.P.closePath(o),n=!1)}else if(q=="o19"||q=="o20")e.length%2!=0&&!a&&(s=e.shift()+Q.nominalWidthX),t+=e.length>>1,e.length=0,a=!0,h+=t+7>>3;else if(q=="o21")e.length>2&&!a&&(s=e.shift()+Q.nominalWidthX,a=!0),r+=e.pop(),D+=e.pop(),n&&A.U.P.closePath(o),A.U.P.moveTo(o,D,r),n=!0;else if(q=="o22")e.length>1&&!a&&(s=e.shift()+Q.nominalWidthX,a=!0),D+=e.pop(),n&&A.U.P.closePath(o),A.U.P.moveTo(o,D,r),n=!0;else if(q=="o25"){for(;e.length>6;)D+=e.shift(),r+=e.shift(),A.U.P.lineTo(o,D,r);G=D+e.shift(),w=r+e.shift(),S=G+e.shift(),y=w+e.shift(),D=S+e.shift(),r=y+e.shift(),A.U.P.curveTo(o,G,w,S,y,D,r)}else if(q=="o26")for(e.length%2&&(D+=e.shift());e.length>0;)G=D,w=r+e.shift(),D=S=G+e.shift(),r=(y=w+e.shift())+e.shift(),A.U.P.curveTo(o,G,w,S,y,D,r);else if(q=="o27")for(e.length%2&&(r+=e.shift());e.length>0;)w=r,S=(G=D+e.shift())+e.shift(),y=w+e.shift(),D=S+e.shift(),r=y,A.U.P.curveTo(o,G,w,S,y,D,r);else if(q=="o10"||q=="o29"){var P=q=="o10"?Q:i;if(e.length==0)console.debug("error: empty stack");else{var O=e.pop(),m=P.Subrs[O+P.Bias];B.x=D,B.y=r,B.nStems=t,B.haveWidth=a,B.width=s,B.open=n,A.U._drawCFF(m,B,i,Q,o),D=B.x,r=B.y,t=B.nStems,a=B.haveWidth,s=B.width,n=B.open}}else if(q=="o30"||q=="o31"){var QA=e.length,X=(EA=0,q=="o31");for(EA+=QA-(f=-3&QA);EA<f;)X?(w=r,S=(G=D+e.shift())+e.shift(),r=(y=w+e.shift())+e.shift(),f-EA==5?(D=S+e.shift(),EA++):D=S,X=!1):(G=D,w=r+e.shift(),S=G+e.shift(),y=w+e.shift(),D=S+e.shift(),f-EA==5?(r=y+e.shift(),EA++):r=y,X=!0),A.U.P.curveTo(o,G,w,S,y,D,r),EA+=4}else{if((q+"").charAt(0)=="o")throw console.debug("Unknown operation: "+q,C),q;e.push(q)}}}B.x=D,B.y=r,B.nStems=t,B.haveWidth=a,B.width=s,B.open=n};var I=A,g={Typr:I};return E.Typr=I,E.default=g,Object.defineProperty(E,"__esModule",{value:!0}),E}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function km(){return function(E){var A=Uint8Array,I=Uint16Array,g=Uint32Array,C=new A([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),B=new A([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),i=new A([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Q=function(q,f){for(var K=new I(31),H=0;H<31;++H)K[H]=f+=1<<q[H-1];var j=new g(K[30]);for(H=1;H<30;++H)for(var EA=K[H];EA<K[H+1];++EA)j[EA]=EA-K[H]<<5|H;return[K,j]},o=Q(C,2),e=o[0],t=o[1];e[28]=258,t[258]=28;for(var a=Q(B,0)[0],s=new I(32768),n=0;n<32768;++n){var h=(43690&n)>>>1|(21845&n)<<1;h=(61680&(h=(52428&h)>>>2|(13107&h)<<2))>>>4|(3855&h)<<4,s[n]=((65280&h)>>>8|(255&h)<<8)>>>1}var D=function(q,f,K){for(var H=q.length,j=0,EA=new I(f);j<H;++j)++EA[q[j]-1];var Z,x=new I(f);for(j=0;j<f;++j)x[j]=x[j-1]+EA[j-1]<<1;if(K){Z=new I(1<<f);var T=15-f;for(j=0;j<H;++j)if(q[j])for(var F=j<<4|q[j],J=f-q[j],_=x[q[j]-1]++<<J,P=_|(1<<J)-1;_<=P;++_)Z[s[_]>>>T]=F}else for(Z=new I(H),j=0;j<H;++j)q[j]&&(Z[j]=s[x[q[j]-1]++]>>>15-q[j]);return Z},r=new A(288);for(n=0;n<144;++n)r[n]=8;for(n=144;n<256;++n)r[n]=9;for(n=256;n<280;++n)r[n]=7;for(n=280;n<288;++n)r[n]=8;var G=new A(32);for(n=0;n<32;++n)G[n]=5;var w=D(r,9,1),S=D(G,5,1),y=function(q){for(var f=q[0],K=1;K<q.length;++K)q[K]>f&&(f=q[K]);return f},M=function(q,f,K){var H=f/8|0;return(q[H]|q[H+1]<<8)>>(7&f)&K},p=function(q,f){var K=f/8|0;return(q[K]|q[K+1]<<8|q[K+2]<<16)>>(7&f)},U=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],l=function(q,f,K){var H=new Error(f||U[q]);if(H.code=q,Error.captureStackTrace&&Error.captureStackTrace(H,l),!K)throw H;return H},N=function(q,f,K){var H=q.length;if(!H||K&&!K.l&&H<5)return f||new A(0);var j=!f||K,EA=!K||K.i;K||(K={}),f||(f=new A(3*H));var Z,x=function(lA){var qA=f.length;if(lA>qA){var HA=new A(Math.max(2*qA,lA));HA.set(f),f=HA}},T=K.f||0,F=K.p||0,J=K.b||0,_=K.l,P=K.d,O=K.m,m=K.n,QA=8*H;do{if(!_){K.f=T=M(q,F,1);var X=M(q,F+1,3);if(F+=3,!X){var tA=q[(KA=((Z=F)/8|0)+(7&Z&&1)+4)-4]|q[KA-3]<<8,eA=KA+tA;if(eA>H){EA&&l(0);break}j&&x(J+tA),f.set(q.subarray(KA,eA),J),K.b=J+=tA,K.p=F=8*eA;continue}if(X==1)_=w,P=S,O=9,m=5;else if(X==2){var hA=M(q,F,31)+257,iA=M(q,F+10,15)+4,MA=hA+M(q,F+5,31)+1;F+=14;for(var LA=new A(MA),dA=new A(19),UA=0;UA<iA;++UA)dA[i[UA]]=M(q,F+3*UA,7);F+=3*iA;var mA=y(dA),rA=(1<<mA)-1,RA=D(dA,mA,1);for(UA=0;UA<MA;){var KA,DA=RA[M(q,F,rA)];if(F+=15&DA,(KA=DA>>>4)<16)LA[UA++]=KA;else{var k=0,d=0;for(KA==16?(d=3+M(q,F,3),F+=2,k=LA[UA-1]):KA==17?(d=3+M(q,F,7),F+=3):KA==18&&(d=11+M(q,F,127),F+=7);d--;)LA[UA++]=k}}var b=LA.subarray(0,hA),$=LA.subarray(hA);O=y(b),m=y($),_=D(b,O,1),P=D($,m,1)}else l(1);if(F>QA){EA&&l(0);break}}j&&x(J+131072);for(var aA=(1<<O)-1,cA=(1<<m)-1,wA=F;;wA=F){var sA=(k=_[p(q,F)&aA])>>>4;if((F+=15&k)>QA){EA&&l(0);break}if(k||l(2),sA<256)f[J++]=sA;else{if(sA==256){wA=F,_=null;break}var gA=sA-254;if(sA>264){var JA=C[UA=sA-257];gA=M(q,F,(1<<JA)-1)+e[UA],F+=JA}var GA=P[p(q,F)&cA],kA=GA>>>4;if(GA||l(3),F+=15&GA,$=a[kA],kA>3&&(JA=B[kA],$+=p(q,F)&(1<<JA)-1,F+=JA),F>QA){EA&&l(0);break}j&&x(J+131072);for(var SA=J+gA;J<SA;J+=4)f[J]=f[J-$],f[J+1]=f[J+1-$],f[J+2]=f[J+2-$],f[J+3]=f[J+3-$];J=SA}}K.l=_,K.p=wA,K.b=J,_&&(T=1,K.m=O,K.d=P,K.n=m)}while(!T);return J==f.length?f:function(lA,qA,HA){(qA==null||qA<0)&&(qA=0),(HA==null||HA>lA.length)&&(HA=lA.length);var _A=new(lA instanceof I?I:lA instanceof g?g:A)(HA-qA);return _A.set(lA.subarray(qA,HA)),_A}(f,0,J)},Y=new A(0),z=typeof TextDecoder<"u"&&new TextDecoder;try{z.decode(Y,{stream:!0})}catch{}return E.convert_streams=function(q){var f=new DataView(q),K=0;function H(){var hA=f.getUint16(K);return K+=2,hA}function j(){var hA=f.getUint32(K);return K+=4,hA}function EA(hA){tA.setUint16(eA,hA),eA+=2}function Z(hA){tA.setUint32(eA,hA),eA+=4}for(var x={signature:j(),flavor:j(),length:j(),numTables:H(),reserved:H(),totalSfntSize:j(),majorVersion:H(),minorVersion:H(),metaOffset:j(),metaLength:j(),metaOrigLength:j(),privOffset:j(),privLength:j()},T=0;Math.pow(2,T)<=x.numTables;)T++;T--;for(var F=16*Math.pow(2,T),J=16*x.numTables-F,_=12,P=[],O=0;O<x.numTables;O++)P.push({tag:j(),offset:j(),compLength:j(),origLength:j(),origChecksum:j()}),_+=16;var m,QA=new Uint8Array(12+16*P.length+P.reduce(function(hA,iA){return hA+iA.origLength+4},0)),X=QA.buffer,tA=new DataView(X),eA=0;return Z(x.flavor),EA(x.numTables),EA(F),EA(T),EA(J),P.forEach(function(hA){Z(hA.tag),Z(hA.origChecksum),Z(_),Z(hA.origLength),hA.outOffset=_,(_+=hA.origLength)%4!=0&&(_+=4-_%4)}),P.forEach(function(hA){var iA,MA=q.slice(hA.offset,hA.offset+hA.compLength);if(hA.compLength!=hA.origLength){var LA=new Uint8Array(hA.origLength);iA=new Uint8Array(MA,2),N(iA,LA)}else LA=new Uint8Array(MA);QA.set(LA,hA.outOffset);var dA=0;(_=hA.outOffset+hA.origLength)%4!=0&&(dA=4-_%4),QA.set(new Uint8Array(dA).buffer,hA.outOffset+hA.origLength),m=_+dA}),X.slice(0,m)},Object.defineProperty(E,"__esModule",{value:!0}),E}({}).convert_streams}function Rm(E,A){const I={M:2,L:2,Q:4,C:6,Z:0},g={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},C=1,B=2,i=4,Q=8,o=16,e=32;let t;function a(M){if(!t){const p={R:B,L:C,D:i,C:o,U:e,T:Q};t=new Map;for(let U in g){let l=0;g[U].split(",").forEach(N=>{let[Y,z]=N.split("+");Y=parseInt(Y,36),z=z?parseInt(z,36):0,t.set(l+=Y,p[U]);for(let q=z;q--;)t.set(++l,p[U])})}}return t.get(M)||e}const s=1,n=2,h=3,D=4,r=[null,"isol","init","fina","medi"];function G(M){const p=new Uint8Array(M.length);let U=e,l=s,N=-1;for(let Y=0;Y<M.length;Y++){const z=M.codePointAt(Y);let q=a(z)|0,f=s;q&Q||(U&(C|i|o)?q&(B|i|o)?(f=h,(l===s||l===h)&&p[N]++):q&(C|e)&&(l===n||l===D)&&p[N]--:U&(B|e)&&(l===n||l===D)&&p[N]--,l=p[Y]=f,U=q,N=Y,z>65535&&Y++)}return p}function w(M,p){const U=[];for(let N=0;N<p.length;N++){const Y=p.codePointAt(N);Y>65535&&N++,U.push(E.U.codeToGlyph(M,Y))}const l=M.GSUB;if(l){const{lookupList:N,featureList:Y}=l;let z;const q=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws)$/,f=[];Y.forEach(K=>{if(q.test(K.tag))for(let H=0;H<K.tab.length;H++){if(f[K.tab[H]])continue;f[K.tab[H]]=!0;const j=N[K.tab[H]],EA=/^(isol|init|fina|medi)$/.test(K.tag);EA&&!z&&(z=G(p));for(let Z=0;Z<U.length;Z++)(!z||!EA||r[z[Z]]===K.tag)&&E.U._applySubs(U,Z,j,N)}})}return U}function S(...M){for(let p=0;p<M.length;p++)if(typeof M[p]=="number")return M[p]}function y(M){const p=Object.create(null),U=M["OS/2"],l=M.hhea,N=M.head.unitsPerEm,Y=S(U&&U.sTypoAscender,l&&l.ascender,N),z={unitsPerEm:N,ascender:Y,descender:S(U&&U.sTypoDescender,l&&l.descender,0),capHeight:S(U&&U.sCapHeight,Y),xHeight:S(U&&U.sxHeight,Y),lineGap:S(U&&U.sTypoLineGap,l&&l.lineGap),forEachGlyph(q,f,K,H){let j=0;const EA=1/z.unitsPerEm*f,Z=w(M,q);let x=0,T=-1;return Z.forEach((F,J)=>{if(F!==-1){let _=p[F];if(!_){const{cmds:P,crds:O}=E.U.glyphToPath(M,F);let m="",QA=0;for(let iA=0,MA=P.length;iA<MA;iA++){const LA=I[P[iA]];m+=P[iA];for(let dA=1;dA<=LA;dA++)m+=(dA>1?",":"")+O[QA++]}let X,tA,eA,hA;if(O.length){X=tA=1/0,eA=hA=-1/0;for(let iA=0,MA=O.length;iA<MA;iA+=2){let LA=O[iA],dA=O[iA+1];LA<X&&(X=LA),dA<tA&&(tA=dA),LA>eA&&(eA=LA),dA>hA&&(hA=dA)}}else X=eA=tA=hA=0;_=p[F]={index:F,advanceWidth:M.hmtx.aWidth[F],xMin:X,yMin:tA,xMax:eA,yMax:hA,path:m,pathCommandCount:P.length}}T!==-1&&(j+=E.U.getPairAdjustment(M,T,F)*EA),H.call(null,_,j,x),_.advanceWidth&&(j+=_.advanceWidth*EA),K&&(j+=K*f),T=F}x+=q.codePointAt(x)>65535?2:1}),j}};return z}return function(p){const U=new Uint8Array(p,0,4),l=E._bin.readASCII(U,0,4);if(l==="wOFF")p=A(p);else if(l==="wOF2")throw new Error("woff2 fonts not supported");return y(E.parse(p)[0])}}const Fm=FQ({name:"Typr Font Parser",dependencies:[Mm,km,Rm],init(E,A,I){const g=E(),C=A();return I(g,C)}}),sB={defaultFontURL:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},pm=new II;function eB(){return(self.performance||Date).now()}const Tt=Object.create(null);function WD(E,A){E=Km({},E);const I=eB();if(E.font=Jm(E.font||sB.defaultFontURL),E.text=""+E.text,E.sdfGlyphSize=E.sdfGlyphSize||sB.sdfGlyphSize,E.colorRanges!=null){let a={};for(let s in E.colorRanges)if(E.colorRanges.hasOwnProperty(s)){let n=E.colorRanges[s];typeof n!="number"&&(n=pm.set(n).getHex()),a[s]=n}E.colorRanges=a}Object.freeze(E);const{textureWidth:g,sdfExponent:C}=sB,{sdfGlyphSize:B}=E,i=g/B*4;let Q=Tt[B];if(!Q){const a=document.createElement("canvas");a.width=g,a.height=B*256/i,Q=Tt[B]={glyphCount:0,sdfGlyphSize:B,sdfCanvas:a,sdfTexture:new XI(a,void 0,void 0,void 0,gg,gg),contextLost:!1,glyphsByFont:new Map},Q.sdfTexture.generateMipmaps=!1,Nm(Q)}const{sdfTexture:o,sdfCanvas:e}=Q;let t=Q.glyphsByFont.get(E.font);t||Q.glyphsByFont.set(E.font,t=new Map),fm(E).then(a=>{const{glyphIds:s,glyphPositions:n,fontSize:h,unitsPerEm:D,timings:r}=a,G=[],w=new Float32Array(s.length*4),S=h/D;let y=0,M=0;const p=eB();s.forEach((z,q)=>{let f=t.get(z);if(!f){const{path:EA,pathBounds:Z}=a.glyphData[z],x=Math.max(Z[2]-Z[0],Z[3]-Z[1])/B*(sB.sdfMargin*B+.5),T=Q.glyphCount++,F=[Z[0]-x,Z[1]-x,Z[2]+x,Z[3]+x];t.set(z,f={path:EA,atlasIndex:T,sdfViewBox:F}),G.push(f)}const{sdfViewBox:K}=f,H=n[M++],j=n[M++];w[y++]=H+K[0]*S,w[y++]=j+K[1]*S,w[y++]=H+K[2]*S,w[y++]=j+K[3]*S,s[q]=f.atlasIndex}),r.quads=(r.quads||0)+(eB()-p);const U=eB();r.sdf={};const l=e.height,N=Math.ceil(Q.glyphCount/i),Y=Math.pow(2,Math.ceil(Math.log2(N*B)));Y>l&&(console.info(`Increasing SDF texture size ${l}->${Y}`),ym(e,g,Y),o.dispose()),Promise.all(G.map(z=>jD(z,Q,E.gpuAccelerateSDF).then(({timing:q})=>{r.sdf[z.atlasIndex]=q}))).then(()=>{G.length&&!Q.contextLost&&(_D(Q),o.needsUpdate=!0),r.sdfTotal=eB()-U,r.total=eB()-I,A(Object.freeze({parameters:E,sdfTexture:o,sdfGlyphSize:B,sdfExponent:C,glyphBounds:w,glyphAtlasIndices:s,glyphColors:a.glyphColors,caretPositions:a.caretPositions,caretHeight:a.caretHeight,chunkedBounds:a.chunkedBounds,ascender:a.ascender,descender:a.descender,lineHeight:a.lineHeight,capHeight:a.capHeight,xHeight:a.xHeight,topBaseline:a.topBaseline,blockBounds:a.blockBounds,visibleBounds:a.visibleBounds,timings:a.timings}))})}),Promise.resolve().then(()=>{Q.contextLost||dm(e)})}function jD({path:E,atlasIndex:A,sdfViewBox:I},{sdfGlyphSize:g,sdfCanvas:C,contextLost:B},i){if(B)return Promise.resolve({timing:-1});const{textureWidth:Q,sdfExponent:o}=sB,e=Math.max(I[2]-I[0],I[3]-I[1]),t=Math.floor(A/4),a=t%(Q/g)*g,s=Math.floor(t/(Q/g))*g,n=A%4;return hm(g,g,E,I,e,o,C,a,s,n,i)}function Nm(E){const A=E.sdfCanvas;A.addEventListener("webglcontextlost",I=>{console.log("Context Lost",I),I.preventDefault(),E.contextLost=!0}),A.addEventListener("webglcontextrestored",I=>{console.log("Context Restored",I),E.contextLost=!1;const g=[];E.glyphsByFont.forEach(C=>{C.forEach(B=>{g.push(jD(B,E,!0))})}),Promise.all(g).then(()=>{_D(E),E.sdfTexture.needsUpdate=!0})})}function Um({font:E,characters:A,sdfGlyphSize:I},g){let C=Array.isArray(A)?A.join(`
`):""+A;WD({font:E,sdfGlyphSize:I,text:C},g)}function Km(E,A){for(let I in A)A.hasOwnProperty(I)&&(E[I]=A[I]);return E}let ii;function Jm(E){return ii||(ii=typeof document>"u"?{}:document.createElement("a")),ii.href=E,ii.href}function _D(E){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:A,sdfTexture:I}=E,{width:g,height:C}=A,B=E.sdfCanvas.getContext("webgl");let i=I.image.data;(!i||i.length!==g*C*4)&&(i=new Uint8Array(g*C*4),I.image={width:g,height:C,data:i},I.flipY=!1,I.isDataTexture=!0),B.readPixels(0,0,g,C,B.RGBA,B.UNSIGNED_BYTE,i)}}const um=FQ({name:"Typesetter",dependencies:[sB,Fm,Dm,Em],init(E,A,I,g){const{defaultFontURL:C}=E;return I(A,g(),{defaultFontURL:C})}}),fm=FQ({name:"Typesetter",dependencies:[um],init(E){return function(A){return new Promise(I=>{E.typeset(A,I)})}},getTransferables(E){const A=[E.glyphPositions.buffer,E.glyphIds.buffer];return E.caretPositions&&A.push(E.caretPositions.buffer),E.glyphColors&&A.push(E.glyphColors.buffer),A}}),Ot={};function qm(E){let A=Ot[E];if(!A){const I=new HC(1,1,E,E),g=I.clone(),C=I.attributes,B=g.attributes,i=new AC,Q=C.uv.count;for(let o=0;o<Q;o++)B.position.array[o*3]*=-1,B.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{i.setAttribute(o,new sC([...C[o].array,...B[o].array],C[o].itemSize))}),i.setIndex([...I.index.array,...g.index.array.map(o=>o+Q)]),i.translate(.5,.5,0),A=Ot[E]=i}return A}const Ym="aTroikaGlyphBounds",Pt="aTroikaGlyphIndex",mm="aTroikaGlyphColor";class Lm extends lS{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Ti,this.boundingBox=new pB}computeBoundingSphere(){}computeBoundingBox(){}setSide(A){const I=this.getIndex().count;this.setDrawRange(A===ag?I/2:0,A===GQ?I:I/2)}set detail(A){if(A!==this._detail){this._detail=A,(typeof A!="number"||A<1)&&(A=1);let I=qm(A);["position","normal","uv"].forEach(g=>{this.attributes[g]=I.attributes[g].clone()}),this.setIndex(I.getIndex().clone())}}get detail(){return this._detail}set curveRadius(A){A!==this._curveRadius&&(this._curveRadius=A,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(A,I,g,C,B){WE(this,Ym,A,4),WE(this,Pt,I,1),WE(this,mm,B,3),this._blockBounds=g,this._chunkedBounds=C,this.instanceCount=I.length,this._updateBounds()}_updateBounds(){const A=this._blockBounds;if(A){const{curveRadius:I,boundingBox:g}=this;if(I){const{PI:C,floor:B,min:i,max:Q,sin:o,cos:e}=Math,t=C/2,a=C*2,s=Math.abs(I),n=A[0]/s,h=A[2]/s,D=B((n+t)/a)!==B((h+t)/a)?-s:i(o(n)*s,o(h)*s),r=B((n-t)/a)!==B((h-t)/a)?s:Q(o(n)*s,o(h)*s),G=B((n+C)/a)!==B((h+C)/a)?s*2:Q(s-e(n)*s,s-e(h)*s);g.min.set(D,A[1],I<0?-G:0),g.max.set(r,A[3],I<0?0:G)}else g.min.set(A[0],A[1],0),g.max.set(A[2],A[3],0);g.getBoundingSphere(this.boundingSphere)}}applyClipRect(A){let I=this.getAttribute(Pt).count,g=this._chunkedBounds;if(g)for(let C=g.length;C--;){I=g[C].end;let B=g[C].rect;if(B[1]<A.w&&B[3]>A.y&&B[0]<A.z&&B[2]>A.x)break}this.instanceCount=I}}function WE(E,A,I,g){const C=E.getAttribute(A);I?C&&C.array.length===I.length?(C.array.set(I),C.needsUpdate=!0):(E.setAttribute(A,new sS(I,g)),delete E._maxInstanceCount,E.dispose()):C&&E.deleteAttribute(A)}const Hm=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaDistanceOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,bm=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,vm=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,xm=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function Tm(E){const A=no(E,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new gI},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new wI(0,0,0,0)},uTroikaClipRect:{value:new wI(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new gI},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new II},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Cg},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:Hm,vertexTransform:bm,fragmentDefs:vm,fragmentColorTransform:xm,customRewriter({vertexShader:I,fragmentShader:g}){let C=/\buniform\s+vec3\s+diffuse\b/;return C.test(g)&&(g=g.replace(C,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),C.test(I)||(I=I.replace(OD,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:I,fragmentShader:g}}});return A.transparent=!0,Object.defineProperties(A,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),A}const Xo=new Ho({color:16777215,side:GQ,transparent:!0}),Wt=8421504,jt=new pI,Ei=new V,jE=new V,VB=[],Om=new V,_E="+x+y";function _t(E){return Array.isArray(E)?E[0]:E}let VD=()=>{const E=new cg(new HC(1,1),Xo);return VD=()=>E,E},ZD=()=>{const E=new cg(new HC(1,1,32,1),Xo);return ZD=()=>E,E};const Pm={type:"syncstart"},Wm={type:"synccomplete"},zD=["font","fontSize","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],jm=zD.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class XD extends cg{constructor(){const A=new Lm;super(A,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.fontSize=.1,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=Wt,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=_E,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(A){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(A):(this._isSyncing=!0,this.dispatchEvent(Pm),WD({text:this.text,font:this.font,fontSize:this.fontSize||.1,letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF},I=>{this._isSyncing=!1,this._textRenderInfo=I,this.geometry.updateGlyphs(I.glyphBounds,I.glyphAtlasIndices,I.blockBounds,I.chunkedBounds,I.glyphColors);const g=this._queuedSyncs;g&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{g.forEach(C=>C&&C())})),this.dispatchEvent(Wm),A&&A()})))}onBeforeRender(A,I,g,C,B,i){this.sync(),B.isTroikaTextMaterial&&this._prepareForRender(B),B._hadOwnSide=B.hasOwnProperty("side"),this.geometry.setSide(B._actualSide=B.side),B.side=hC}onAfterRender(A,I,g,C,B,i){B._hadOwnSide?B.side=B._actualSide:delete B.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let A=this._derivedMaterial;const I=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Xo.clone());if((!A||A.baseMaterial!==I)&&(A=this._derivedMaterial=Tm(I),I.addEventListener("dispose",function g(){I.removeEventListener("dispose",g),A.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let g=A._outlineMtl;return g||(g=A._outlineMtl=Object.create(A,{id:{value:A.id+.1}}),g.isTextOutlineMaterial=!0,g.depthWrite=!1,g.map=null,A.addEventListener("dispose",function C(){A.removeEventListener("dispose",C),g.dispose()})),[g,A]}else return A}set material(A){A&&A.isTroikaTextMaterial?(this._derivedMaterial=A,this._baseMaterial=A.baseMaterial):this._baseMaterial=A}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(A){this.geometry.detail=A}get curveRadius(){return this.geometry.curveRadius}set curveRadius(A){this.geometry.curveRadius=A}get customDepthMaterial(){return _t(this.material).getDepthMaterial()}get customDistanceMaterial(){return _t(this.material).getDistanceMaterial()}_prepareForRender(A){const I=A.isTextOutlineMaterial,g=A.uniforms,C=this.textRenderInfo;if(C){const{sdfTexture:Q,blockBounds:o}=C;g.uTroikaSDFTexture.value=Q,g.uTroikaSDFTextureSize.value.set(Q.image.width,Q.image.height),g.uTroikaSDFGlyphSize.value=C.sdfGlyphSize,g.uTroikaSDFExponent.value=C.sdfExponent,g.uTroikaTotalBounds.value.fromArray(o),g.uTroikaUseGlyphColors.value=!I&&!!C.glyphColors;let e=0,t=0,a=0,s,n,h,D=0,r=0;if(I){let{outlineWidth:w,outlineOffsetX:S,outlineOffsetY:y,outlineBlur:M,outlineOpacity:p}=this;e=this._parsePercent(w)||0,t=Math.max(0,this._parsePercent(M)||0),s=p,D=this._parsePercent(S)||0,r=this._parsePercent(y)||0}else a=Math.max(0,this._parsePercent(this.strokeWidth)||0),a&&(h=this.strokeColor,g.uTroikaStrokeColor.value.set(h??Wt),n=this.strokeOpacity,n==null&&(n=1)),s=this.fillOpacity;g.uTroikaDistanceOffset.value=e,g.uTroikaPositionOffset.value.set(D,r),g.uTroikaBlurRadius.value=t,g.uTroikaStrokeWidth.value=a,g.uTroikaStrokeOpacity.value=n,g.uTroikaFillOpacity.value=s??1,g.uTroikaCurveRadius.value=this.curveRadius||0;let G=this.clipRect;if(G&&Array.isArray(G)&&G.length===4)g.uTroikaClipRect.value.fromArray(G);else{const w=(this.fontSize||.1)*100;g.uTroikaClipRect.value.set(o[0]-w,o[1]-w,o[2]+w,o[3]+w)}this.geometry.applyClipRect(g.uTroikaClipRect.value)}g.uTroikaSDFDebug.value=!!this.debugSDF,A.polygonOffset=!!this.depthOffset,A.polygonOffsetFactor=A.polygonOffsetUnits=this.depthOffset||0;const B=I?this.outlineColor||0:this.color;if(B==null)delete A.color;else{const Q=A.hasOwnProperty("color")?A.color:A.color=new II;(B!==Q._input||typeof B=="object")&&Q.set(Q._input=B)}let i=this.orientation||_E;if(i!==A._orientation){let Q=g.uTroikaOrient.value;i=i.replace(/[^-+xyz]/g,"");let o=i!==_E&&i.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,e,t,a,s]=o;Ei.set(0,0,0)[t]=e==="-"?1:-1,jE.set(0,0,0)[s]=a==="-"?-1:1,jt.lookAt(Om,Ei.cross(jE),jE),Q.setFromMatrix4(jt)}else Q.identity();A._orientation=i}}_parsePercent(A){if(typeof A=="string"){let I=A.match(/^(-?[\d.]+)%$/),g=I?parseFloat(I[1]):NaN;A=(isNaN(g)?0:g/100)*this.fontSize}return A}localPositionToTextCoords(A,I=new gI){I.copy(A);const g=this.curveRadius;return g&&(I.x=Math.atan2(A.x,Math.abs(g)-Math.abs(A.z))*Math.abs(g)),I}worldPositionToTextCoords(A,I=new gI){return Ei.copy(A),this.localPositionToTextCoords(this.worldToLocal(Ei),I)}raycast(A,I){const{textRenderInfo:g,curveRadius:C}=this;if(g){const B=g.blockBounds,i=C?ZD():VD(),Q=i.geometry,{position:o,uv:e}=Q.attributes;for(let t=0;t<e.count;t++){let a=B[0]+e.getX(t)*(B[2]-B[0]);const s=B[1]+e.getY(t)*(B[3]-B[1]);let n=0;C&&(n=C-Math.cos(a/C)*C,a=Math.sin(a/C)*C),o.setXYZ(t,a,s,n)}Q.boundingSphere=this.geometry.boundingSphere,Q.boundingBox=this.geometry.boundingBox,i.matrixWorld=this.matrixWorld,i.material.side=this.material.side,VB.length=0,i.raycast(A,VB);for(let t=0;t<VB.length;t++)VB[t].object=this,I.push(VB[t])}}copy(A){const I=this.geometry;return super.copy(A),this.geometry=I,jm.forEach(g=>{this[g]=A[g]}),this}clone(){return new this.constructor().copy(this)}}zD.forEach(E=>{const A="_private_"+E;Object.defineProperty(XD.prototype,E,{get(){return this[A]},set(I){I!==this[A]&&(this[A]=I,this._needsSync=!0)}})});const $D="/Dungeon-Survivor/assets/m5x7.47c3f0b0.ttf";class pQ extends kI{previousText="";text;mesh;constructor(A,I){super();const g=Object.assign({size:16,color:16777215,anchorX:"center",anchorY:"middle"},I);this.text=A,this.previousText=A,this.mesh=new XD,this.mesh.text=A,this.mesh.fontSize=g.size,this.mesh.font=$D,this.mesh.anchorY=g.anchorY,this.mesh.anchorX=g.anchorX,this.mesh.color=g.color,this.mesh.renderOrder=10,g.maxWidth&&(this.mesh.maxWidth=g.maxWidth)}setText(A){this.previousText=this.text,this.text=A,this.mesh.text=A}}pQ.register();const A0=function*(E){for(let A=0;A<E;A++)yield A;return E},_m=yA.UI.healthBar;class Vm extends fg{constructor(){super(MB)}update(A){A.forEach(I=>{const g=I.getComponent(MB),C=I.getComponent(oI),B=I.getComponent(jI),i=I.getComponent(lg);if(g.show&&!g.healthBarId&&C){const Q=new cI,o=new oI(_m.clone(),{renderOrder:20});I.addChildren(Q),Q.addComponent(o),g.healthBarId=Q.id,C.mesh.add(o.mesh),o.mesh.position.y=C.height/2,g.updateHealth(0)}B&&g.canTakeDamage&&B.contacts(Q=>{const o=Q.getComponent(RQ),e=I.getComponent(QI);if(o.target.includes(g.type)){const t=h=>h.getComponent(_i)??(h.parent?t(h.parent):null),a=t(Q),s=a?a.calculateDamage(o.amount):o.amount;g.updateHealth(-s);const n=new cI;n.addComponent(new QI(e.x,e.y)),n.addComponent(new oI(yA.UI.empty)),n.addComponent(new pQ(String(s*-1),{size:8,color:a?.crit?16711680:16777215})),o.destroyOnHit--,o.destroyOnHit===0&&Q.destroy(),i&&o.amount>0&&(C.modifier="hurt"),g.canTakeDamage=!1,eC.add(function*(){yield*A0(20),g.canTakeDamage=!0,n.destroy(),i&&(C.modifier="buffer")})}}),g.health==0&&I.destroy()})}}class $o extends kI{enabled=!0;constructor(){super()}}$o.register();class I0 extends fg{constructor(){super(QI)}update(A){A.forEach(I=>{const g=I.getComponent(QI),C=I.getComponent($o),B=I.getComponent(jI),i=I.getComponent(lg),Q=I.getComponent(ug),o=I.getComponent(_i);if(B){if(C?.enabled){const e=TI.getInput(Ni)?.active,t=TI.getInput(Ui)?.active;if(e||t)e&&e!=0&&(B.velocity.x=e),t&&t!=0&&(B.velocity.y=t);else{const a={x:0,y:0};TI.getInput(Po)?.active?a.y=1:TI.getInput(Wo)?.active&&(a.y=-1),TI.getInput(jo)?.active?a.x=-1:TI.getInput(_o)?.active&&(a.x=1);const s=Math.sqrt(a.x**2+a.y**2);(a.x!=0||a.y!=0)&&(B.velocity.x=a.x/s,B.velocity.y=a.y/s)}}i&&(B.velocity.x!=0&&(i.flipped=B.velocity.x<0),i.state=B.velocity.x+B.velocity.y>B.moveForce*.5?"run":"idle"),B.body&&(B.body.setLinvel({x:B.velocity.x*B.moveForce,y:B.velocity.y*B.moveForce},!0),B.velocity.x=0,B.velocity.y=0,g.x=B.body.translation().x,g.y=B.body.translation().y,Q&&(Q.angVel&&B.body.setAngvel(Q.angVel+(o?.angVel??0),!0),Q.rotation=B.body.rotation()))}})}}class Zi extends kI{selectedTile;unSelectedTile;constructor(A,I){super(),this.selectedTile=A,this.unSelectedTile=I}}Zi.register();class Ae extends fg{objects=[];constructor(){super(oI),TI.eventBus.subscribe("move",({uiObjects:A,objects:I})=>{this.objects=[...I,...A]})}update(A){A.forEach(I=>{const g=I.getComponent(oI),C=I.getComponent(QI),B=I.getComponent(ug),i=I.getComponent(pQ),Q=I.getComponent(Ug),o=I.getComponent(Zi);if(o&&g.mesh&&(this.objects.includes(g.mesh.id)?g.texture.image=o.selectedTile.buffer.canvas:g.texture.image=o.unSelectedTile.buffer.canvas,g.texture.needsUpdate=!0),Q){const e=I.parent?.getComponent(oI),t=e?e?.width/2:hB.right,a=e?e?.height/2:hB.top,s=Q.relativePosition.x*t-g.width/2*Q.center.x,n=Q.relativePosition.y*a-g.height/2*Q.center.y;g.mesh.position.set(s,n,0),g.renderOrder=(e?.renderOrder??1)+1,g&&!g?.mesh.parent&&(e?.mesh??Wi).add(g.mesh)}g&&C&&(g.mesh.parent||$g.add(g.mesh),g.mesh.position.set(C.x,C.y,0)),g&&g.mesh.parent&&i&&(g.mesh.add(i.mesh),i.mesh.renderOrder=(g.renderOrder??0)+1),B&&(g.mesh.rotation.z=B.rotation+Math.PI/2),g.mesh.renderOrder=g.renderOrder})}}var WI=(E=>(E.run="run",E.map="map",E.levelUp="levelUp",E.pause="pause",E))(WI||{});class g0 extends kI{xp=0;level=0;nextLevel=20;constructor(){super(),xA.eventBus.subscribe(KI.XP,A=>this.updateXP(A)),xA.eventBus.publish(KI.LEVELUP,this.level)}updateXP(A){this.xp+=A,xA.eventBus.publish(KI.XPPERCENT,this.xp/this.nextLevel);const I=Math.floor(this.xp/this.nextLevel);if(I>0){for(let g=0;g<I;g++)this.xp=this.xp%this.nextLevel,this.nextLevel*=1.5,this.level++,xA.eventBus.publish(KI.LEVELUP,this.level);sg.setState(WI.levelUp)}}}g0.register();const ZB={orc:{tiles:{idle:yA.tiles.orc_warrior_idle_anim,run:yA.tiles.orc_warrior_run_anim},health:30},orcShaman:{tiles:{idle:yA.tiles.orc_shaman_idle_anim,run:yA.tiles.orc_shaman_run_anim},health:50},orcMasked:{tiles:{idle:yA.tiles.masked_orc_idle_anim,run:yA.tiles.masked_orc_run_anim},health:80},goblin:{tiles:{idle:yA.tiles.goblin_idle_anim,run:yA.tiles.goblin_run_anim},health:10},zombieBig:{tiles:{idle:yA.tiles.big_zombie_idle_anim,run:yA.tiles.big_zombie_run_anim},health:300}},Do={elfFemale:{tiles:{idle:yA.tiles.elf_f_idle_anim,run:yA.tiles.elf_f_idle_anim}},elfMale:{tiles:{idle:yA.tiles.elf_m_idle_anim,run:yA.tiles.elf_m_run_anim}},wizardFemale:{tiles:{idle:yA.tiles.wizzard_f_idle_anim,run:yA.tiles.wizzard_f_run_anim}},wizardMale:{tiles:{idle:yA.tiles.wizzard_m_idle_anim,run:yA.tiles.wizzard_m_run_anim}},knightFemale:{tiles:{idle:yA.tiles.knight_f_idle_anim,run:yA.tiles.knight_f_run_anim}},knightMale:{tiles:{idle:yA.tiles.knight_m_idle_anim,run:yA.tiles.knight_m_run_anim}},lizardFemale:{tiles:{idle:yA.tiles.lizard_f_idle_anim,run:yA.tiles.lizard_f_run_anim}},lizardMale:{tiles:{idle:yA.tiles.lizard_m_idle_anim,run:yA.tiles.lizard_m_run_anim}}},VE={arrow:{tile:yA.tiles.weapon_arrow,speed:5e3,damage:10},fireBall:{tile:yA.tiles.flame,speed:3e3,damage:20}},vA={orbiter:"orbiter",shooter:"shooter",targeter:"targeter",toucher:"toucher"},Vt={knife:{tile:yA.tiles.weapon_knife,damage:5,behaviors:[vA.orbiter,vA.toucher]},swordOld:{tile:yA.tiles.weapon_rusty_sword,damage:7,behaviors:[vA.orbiter,vA.toucher]},sword:{tile:yA.tiles.weapon_regular_sword,damage:10,behaviors:[vA.orbiter,vA.toucher]},swordGem:{tile:yA.tiles.weapon_red_gem_sword,damage:15,behaviors:[vA.orbiter,vA.toucher]},hammerLong:{tile:yA.tiles.weapon_big_hammer,damage:15,behaviors:[vA.orbiter,vA.toucher]},hammer:{tile:yA.tiles.weapon_hammer,damage:15,behaviors:[vA.orbiter,vA.toucher]},club:{tile:yA.tiles.weapon_baton_with_spikes,damage:10,behaviors:[vA.orbiter,vA.toucher]},mace:{tile:yA.tiles.weapon_mace,damage:15,behaviors:[vA.orbiter,vA.toucher]},katana:{tile:yA.tiles.weapon_katana,damage:5,behaviors:[vA.orbiter,vA.toucher]},swordSaw:{tile:yA.tiles.weapon_saw_sword,damage:10,behaviors:[vA.orbiter,vA.toucher]},swordAnime:{tile:yA.tiles.weapon_anime_sword,damage:20,behaviors:[vA.orbiter,vA.toucher]},hatchet:{tile:yA.tiles.weapon_axe,damage:10,behaviors:[vA.orbiter,vA.toucher]},machete:{tile:yA.tiles.weapon_machete,damage:15,behaviors:[vA.orbiter,vA.toucher]},cleaver:{tile:yA.tiles.weapon_cleaver,damage:15,behaviors:[vA.orbiter,vA.toucher]},rapier:{tile:yA.tiles.weapon_duel_sword,damage:10,behaviors:[vA.orbiter,vA.toucher]},swordKnight:{tile:yA.tiles.weapon_knight_sword,damage:15,behaviors:[vA.orbiter,vA.toucher]},swordGolden:{tile:yA.tiles.weapon_golden_sword,damage:15,behaviors:[vA.orbiter,vA.toucher]},swordGoldenBig:{tile:yA.tiles.weapon_lavish_sword,damage:15,behaviors:[vA.orbiter,vA.toucher]},staff:{tile:yA.tiles.weapon_red_magic_staff,damage:15,behaviors:[vA.orbiter,vA.shooter],projectile:VE.fireBall,spread:.5,projectilesNb:3},staffGem:{tile:yA.tiles.weapon_green_magic_staff,damage:15,behaviors:[vA.orbiter,vA.shooter],projectile:VE.fireBall},bow:{tile:yA.tiles.weapon_bow,damage:15,behaviors:[vA.targeter,vA.orbiter,vA.shooter],projectile:VE.arrow}};class rQ extends kI{lightId=null;color;distance;constructor(A=1118481,I=500){super(),this.color=A,this.distance=I}destroy(){this.lightId&&$g.getObjectById(this.lightId)?.removeFromParent()}}rQ.register();const nI={ENEMY:2,XP:4,WEAPON:8,SENSOR:16,TRAP:32,PLAYER:64,POTION:128,WALL:256},Zm=(E,A)=>{const I=new cI;I.addComponent(new oI(yA.tiles.column,{renderOrder:20})),I.addComponent(new jI({type:"fixed"},[{width:16,height:16,sensor:!1,contact:!1,group:nI.WALL,canCollideWith:[nI.PLAYER,nI.ENEMY]}])),I.addComponent(new QI(E,A));const g=new cI,C=yA.tiles.flame_wall;return g.addComponent(new oI(C,{renderOrder:21})),g.addComponent(new lg({default:C})),g.addComponent(new QI(E,A)),g.addComponent(new rQ(new II("hsl(20, 20%, 15%)"),500)),I.addChildren(g),I},zm=()=>{const E=new cI,A=new QI(0,0);E.addComponent(A);const I=Math.floor(window.innerWidth*1.5/16)*16,g=Math.floor(window.innerHeight*1.5/16)*16,C=nC(I,g),B=[[yA.tiles.floor_1,10],[yA.tiles.floor_2,1],[yA.tiles.floor_3,1],[yA.tiles.floor_4,1],[yA.tiles.floor_5,1],[yA.tiles.floor_6,1],[yA.tiles.floor_7,1],[yA.tiles.floor_8,1]],i=B.reduce((e,t)=>e+t[1],0),Q=B.flatMap(([e,t])=>new Array(t).fill(e));for(let e=0;e<Math.ceil(I/16)*16;e+=16)for(let t=0;t<Math.ceil(g/16)*16;t+=16){const a=Q[Math.floor(i*Math.random())];C.drawImage(a.buffer.canvas,e,t)}for(let e=0;e<I;e+=256)for(let t=0;t<g;t+=256)E.addChildren(Zm(e-I/2,t-g/2));const o=new oI(new Xg({buffer:C}),{renderOrder:0});return xA.eventBus.subscribe(KI.CAMERAMOVE,({x:e,y:t})=>{o.texture.offset.x=e/o.width,o.texture.offset.y=t/o.height,A.x=e,A.y=t}),E.addComponent(o),E};class DQ extends kI{top;bottom;right;left;constructor({top:A,bottom:I,left:g,right:C}){super(),this.top=A,this.bottom=I,this.left=g,this.right=C}}DQ.register();class kB extends kI{target=null;targetedEnemy=null;distanceToTarget;constructor(A,I){super(),this.distanceToTarget=I??0,typeof A=="string"?this.targetedEnemy=A:this.target=A,xA.eventBus.subscribe(KI.DELETEENTITY,g=>{g.id==this.targetedEnemy&&(this.targetedEnemy=null)})}}kB.register();class Ie extends kI{constructor(){super()}}Ie.register();class Ji extends kI{projectile;timer=0;delay=20;spread;range;projectilesNb;constructor(A){super(),this.projectile=A.projectile,this.projectilesNb=A.projectilesNb??1,this.spread=A.spread??0,this.range=A.range??60}}Ji.register();const Xm=(E,A)=>{const I=new cI,g=A.getComponent(QI),C=A.getComponent(oI),B=E.tile;for(let Q of E.behaviors){const o={[vA.orbiter]:new ji("revolute",(B.height+C.height)/2,A),[vA.targeter]:new kB(nI.ENEMY),[vA.shooter]:new Ji(E),[vA.toucher]:new RQ(E.damage,[nI.ENEMY])}[Q];I.addComponent(o)}I.addComponent(new jI({moveForce:10,lock:!0},[{width:B.width,height:B.height,contact:!0,sensor:!0,mass:1,group:nI.WEAPON,canCollideWith:[nI.ENEMY]}])),I.addComponent(new oI(B));const i=E.behaviors.includes(vA.targeter)?0:1;return I.addComponent(new ug(0,i)),I.addComponent(new QI(g.x,g.y)),I},Zt=(E,A,I)=>{const g=new cI;return g.addComponent(new oI(E.tiles.idle)),g.addComponent(new rQ(new II("hsl(0,0%,5%)"),1e3)),g.addComponent(new MB(200,nI.PLAYER)),g.addComponent(new lg(E.tiles)),I?g.addComponent(new kB(I.id,50)):(g.addComponent(new $o),g.addComponent(new DQ({}))),g.addComponent(new jI({moveForce:100},[{width:E.tiles.idle.width,height:E.tiles.idle.height,contact:!0,group:nI.PLAYER,canCollideWith:[nI.ENEMY,nI.TRAP,nI.POTION,nI.WALL]},{width:100,height:100,contact:!0,sensor:!0,group:nI.SENSOR,canCollideWith:[nI.XP]}])),g.addComponent(new QI(0,0)),g.addComponent(new Ie),g.addChildren(Xm(A,g)),g};class C0 extends kI{parentId;constructor(A,I=1){super();const g=C=>{if(this.parentId!=C.id)return;xA.eventBus.unsubscribe(KI.DELETEENTITY,g);const B=C.getComponent(QI);for(let i=0;i<I;i++)A().addComponent(new QI(B.x,B.y))};xA.eventBus.subscribe(KI.DELETEENTITY,g)}bind(A){this.parentId=A}}C0.register();class ui extends kI{amount;constructor(A=1){super(),this.amount=A}}ui.register();const $m=()=>{const E=new cI;return E.addComponent(new oI(yA.tiles.xp,{renderOrder:1,scale:.5})),E.addComponent(new jI({moveForce:1e4},[{width:2,height:2,contact:!0,group:nI.XP,canCollideWith:[nI.SENSOR],mass:1}])),E.addComponent(new ui(1)),E},AL=(E,A)=>{const I=new cI,g=Object.values(E.tiles)[0];return I.addComponent(new oI(g)),I.addComponent(new lg(E.tiles)),I.addComponent(new RQ(1,[nI.PLAYER])),I.addComponent(new MB(E.health,nI.ENEMY)),I.addComponent(new C0($m)),I.addComponent(new QI(A.x,A.y)),I.addComponent(new kB(nI.PLAYER)),I.addComponent(new jI({moveForce:40},[{width:g.width,height:g.height,contact:!1,group:nI.ENEMY,canCollideWith:[nI.ENEMY,nI.PLAYER,nI.TRAP,nI.WEAPON,nI.WALL]}])),I},IL=async(E,A,I)=>{const g=yA.magic[I??"smoke"],C=new cI;return C.addComponent(new oI(g)),C.addComponent(new QI(E,A)),C.addComponent(new lg({default:g},{start:!1,frameRate:5})).playAnimation().then(()=>C.destroy())};class gL{enemies=[];constructor(){xA.eventBus.subscribe(KI.DELETEENTITY,A=>{this.enemies.includes(A.id)&&this.enemies.splice(this.enemies.indexOf(A.id),1)})}spawnEnemies(A,I){for(let g=0;g<I;g++){const C=Math.random()*Math.PI*2,B=(Math.cos(C)*zA.right+zA.position.x)*(Math.random()*1.2+1),i=Math.sin(C)*zA.top+zA.position.y*(Math.random()*1.2+1);IL(B,i).then(()=>{this.enemies.push(AL(A,{x:B,y:i}).id)})}}*wave(A,I,g,C){let B=0,i=0;for(;B<g;)i===0&&(this.spawnEnemies(A,I),B++),i=(i+1)%(C??300),yield;yield}*waitForEnemiesCleared(){for(;this.enemies.length;)yield}}class CL extends fg{constructor(){super(rQ)}update(A){A.forEach(I=>{const g=I.getComponent(rQ),C=I.getComponent(QI);if(!g.lightId&&C){const B=new II(g.color),i=new cS(B,12,g.distance);i.position.set(0,0,15),$g.add(i),g.lightId=i.id}g.lightId&&C&&$g.getObjectById(g.lightId)?.position.set(C.x,C.y,15)})}}const BL=(E,A,I,g)=>{const C=new cI;return C.addComponent(new oI(E.tile)),E.tile.frames>1&&C.addComponent(new lg({idle:E.tile})),C.addComponent(new jI({moveForce:E.speed},[{mass:.1,group:nI.PLAYER,contact:!0,sensor:!0,canCollideWith:[nI.ENEMY],width:E.tile.width,height:E.tile.height}])),C.addComponent(new RQ(E.damage,[nI.ENEMY],1)),C.addComponent(new QI(A.x,A.y)),C.addComponent(new ug(I,0)),eC.add(function*(){yield*A0(g),C.destroy()}),C};class QL extends fg{constructor(){super(Ji)}update(A){A.forEach(I=>{const g=I.getComponent(Ji),C=I.getComponent(ug);g.timer++;const B=g.projectilesNb;if(g.delay<=g.timer){for(let i=0;i<B;i++){const Q=I.getComponent(QI),o=BL(g.projectile,{x:Q.x,y:Q.y},C.rotation-g.spread/2+C.rotation*i/g.projectilesNb/2,g.range),e=o.getComponent(lg);e&&(e.selectedFrame=Math.floor(Math.random()*e.frames)),I.addChildren(o)}g.timer=0}for(let i of I.children){const Q=i.getComponent(jI),o=i.getComponent(ug),e=-Math.cos(o.rotation)*Q.moveForce,t=-Math.sin(o.rotation)*Q.moveForce;Q.body?.applyImpulse(new So(e,t),!0)}})}}class iL extends fg{constructor(){super(kB)}update(A){A.forEach(I=>{const g=I.parent?.getComponent(QI)??I.getComponent(QI),C=I.getComponent(kB),B=I.getComponent(ji),i=I.getComponent(jI);if(!C.targetedEnemy){const o=xA.getEntitiesAndComponents(MB).reduce(([e,t],[a,s])=>{if(s.type==C.target){const n=xA.getEntityById(a).getComponent(QI),h=Math.pow(n.x-g.x,2)+Math.pow(n.y-g.y,2);if(h<t)return[a,h];if(t==0)return[a,h]}return[e,t]},["",0])[0];o&&(C.targetedEnemy=o)}const Q=I.getComponent(ug);if(C.targetedEnemy){const e=xA.getEntityById(C.targetedEnemy).getComponent(QI),t=g.x-e.x,a=g.y-e.y;if(Math.sqrt(t**2+a**2)<C.distanceToTarget)return;const n=Math.atan2(a,t);if(B?.type=="revolute"){const h=Q.rotation,D=n-h;if(!Q)return;const r=.01;Math.abs(D)<=r?Q.angVel=0:Q.angVel=Math.sin(D)*4}else i.velocity.x=-Math.cos(n),i.velocity.y=-Math.sin(n)}else Q&&(Q.angVel=0)})}}class EL extends fg{constructor(){super(Ie)}update(A){A.forEach(I=>{const g=I.getComponent(jI),C=I.getComponent(QI);g.contacts(B=>{if(B.getComponent(ui)){const Q=B.getComponent(jI),o=B.getComponent(QI),e=C.x-o.x,t=C.y-o.y,a={x:e>0?1:-1,y:t>0?1:-1},s=Math.sqrt(Math.pow(e,2)+Math.pow(t,2)),n=Q.moveForce*1/s;Q.body.applyImpulse({x:n*a.x,y:n*a.y},!0)}}),g.contacts(B=>{const i=B.getComponent(ui);i&&(B.destroy(),xA.eventBus.publish(KI.XP,i.amount))},nI.PLAYER)})}}const gQ=(E,A,I,g)=>{const C=typeof A=="number"?A:typeof A.y=="number"?A.y:A.y.top,B=typeof A=="number"?A:typeof A.y=="number"?A.y:A.y.bottom,i=typeof A=="number"?A:typeof A.x=="number"?A.x:A.x.left,Q=typeof A=="number"?A:typeof A.x=="number"?A.x:A.x.right,o=I+i+Q,e=g+B+C,t=E.width-i-Q,a=E.height-B-C,s=nC(o,e);s.drawImage(E.buffer.canvas,0,0,i,C,0,0,i,C),s.drawImage(E.buffer.canvas,E.width-Q,0,Q,C,o-Q,0,Q,C),s.drawImage(E.buffer.canvas,0,E.height-B,i,B,0,e-B,i,B),s.drawImage(E.buffer.canvas,E.width-Q,E.height-B,Q,B,o-Q,e-B,Q,B);const n=Math.ceil(I/t),h=Math.ceil(g/a);for(let D=0;D<n;D++){const r=D==n-1&&I%t||t;s.drawImage(E.buffer.canvas,i,0,t,C,i+D*t,0,r,C),s.drawImage(E.buffer.canvas,i,C+a,t,C,i+D*t,g+C,r,C);for(let G=0;G<h;G++){const w=G==h-1&&g%a||a;D==0&&(s.drawImage(E.buffer.canvas,0,C,i,a,0,C+G*a,i,w),s.drawImage(E.buffer.canvas,t+i,C,Q,a,I+i,C+G*a,Q,w)),s.drawImage(E.buffer.canvas,i,C,r,w,i+D*t,C+G*a,r,w)}}return new Xg({buffer:s})},B0={x:{left:2,right:4},y:{top:0,bottom:0}},Q0=100,i0=7,zt=gQ(yA.UI.XPBar,B0,Q0,i0),oL=gQ(yA.UI.XPFull,B0,Q0,i0),eL=()=>{const E=new cI,A=new oI(zt.clone(),{renderOrder:100,scale:3});return xA.eventBus.subscribe(KI.XPPERCENT,I=>{vD(A,zt,oL,I)}),E.addComponent(A),E.addComponent(new Ug({x:1,y:1},{x:-1,y:1})),E},tL=()=>{const E=new cI;E.addComponent(new Ug({x:-1,y:1},{x:-1,y:1})),E.addComponent(new oI(yA.UI.box,{scale:1.5}));const A=E.addComponent(new pQ(String(0),{size:32}));return xA.eventBus.subscribe(KI.LEVELUP,I=>{A.setText(String(I))}),E},aL=()=>{const E=new cI;return E.addChildren(tL()).addChildren(eL()),E};class E0 extends fg{constructor(){super(DQ)}update(A){A.forEach(I=>{const g=I.getComponent(QI),C=I.getComponent(DQ);if(xA.eventBus.publish(KI.CAMERAMOVE,{x:g.x,y:g.y}),C.left&&C.right&&C.top&&C.bottom){const B=C.right-C.left,i=C.top-C.bottom,Q=B<i?window.innerWidth/window.innerHeight:window.innerHeight/window.innerWidth,o=Math.min(B,i);zA.left=-o/2,zA.right=o/2,zA.top=o/Q/2,zA.bottom=-o/Q/2,zA.updateProjectionMatrix()}else{const B=window.innerWidth/window.innerHeight,i=300;zA.left=-i*B/2,zA.right=i*B/2,zA.top=i/2,zA.bottom=-i/2,zA.updateProjectionMatrix()}zA.position.x=g.x,C?.bottom&&C.bottom-g.y>zA.bottom?zA.position.y=C.bottom-zA.bottom:C?.top&&C.top-g.y<zA.top?zA.position.y=C.top-zA.top:zA.position.y=g.y,C?.left&&C.left-g.x>zA.left?zA.position.x=C.left-zA.left:C?.right&&C.right-g.x<zA.right?zA.position.x=C.right-zA.right:zA.position.x=g.x,zA.lookAt(new V(zA.position.x,zA.position.y,0))})}}class sL{ui;background;player;skills=new _i;store=new g0;constructor(){}update(){Vg.step(),xA.updateSystems(),TI.getInput(Pi)?.once&&sg.setState(WI.pause)}render(){zo()}set(A){switch(TI.enable("dpad"),Ae.register(),I0.register(),bD.register(),Vm.register(),XY.register(),EL.register(),CL.register(),QL.register(),iL.register(),E0.register(),eC.resume(),A){case WI.pause:break;case WI.map:{this.ui=aL(),this.background=zm(),this.player=new cI,this.player.addComponent(this.skills),this.player.addComponent(this.store);const I=this.player.addChildren(Zt(Do.knightMale,Vt.sword));this.player.addChildren(Zt(Do.elfMale,Vt.bow,I));const g=new gL;eC.add(function*(){yield*g.wave(ZB.goblin,20,10),yield*g.wave(ZB.orc,15,5),yield*g.wave(ZB.orcShaman,10,4),yield*g.wave(ZB.orcMasked,10,3),yield*g.wave(ZB.zombieBig,1,1),yield*g.waitForEnemiesCleared(),yield sg.setState(WI.map)})}break}}unset(A){switch(xA.unRegisterSystems(),TI.disable("dpad"),eC.stop(),A){case WI.map:this.background?.destroy(),this.ui?.destroy(),this.player?.destroy();break}}}const nL=[{icon:yA.skills.attack_speed_boost,name:"Rotation speed",modifier:E=>E.angVel*=1.2},{icon:yA.skills.attack_boost,name:"Damage",modifier:E=>E.damage*=1.2},{icon:yA.skills.critical_boost,name:"Critical damage",modifier:E=>E.critDamage*=1.5},{icon:yA.skills.defense_boost,name:"Defense",modifier:E=>E.critDamage*=1.5},{icon:yA.skills.exp_boost,name:"Experience up",modifier:E=>E.critDamage*=1.5},{icon:yA.skills.knockback_boost,name:"Knockback",modifier:E=>E.critDamage*=1.5}],rL=()=>{const E=new cI;E.addComponent(new oI(gQ(yA.UI.frame1,16,100,50),{scale:2}));const A=E.addComponent(new Ug({x:0,y:2}));A.moveTo(-2,0,30);const I=[...nL];for(let g=0;g<3;g++){const C=new cI,B=gQ(yA.UI.frame2,4,24,24),i=C.addComponent(new oI(B,{scale:2})),Q=new cI,o=gQ(yA.UI.empty,0,32,32);Q.addComponent(new oI(o,{scale:2})),Q.addComponent(new Zi(yA.UI.selectedframe,o)),Q.addComponent(new Ug),C.addChildren(Q),C.addComponent(new Ug({x:[-.5,0,.5][g],y:0}));const e=new cI,[t]=I.splice(Math.floor(Math.random()*I.length),1);e.addComponent(new oI(t.icon,{scale:2})),e.addComponent(new Ug);const a=new cI;a.addComponent(new Ug({x:0,y:-1},{x:0,y:0})),a.addComponent(new pQ(t.name,{maxWidth:i.width,anchorY:"top",anchorX:"50%"})),a.addComponent(new oI(yA.UI.empty)),C.addChildren(a),C.addChildren(e),E.addChildren(C);const s=TI.eventBus.subscribe("down",({uiObjects:n})=>{n.includes(i.mesh.id)&&(TI.eventBus.unsubscribe("down",s),xA.eventBus.publish(KI.SKILL,t),A.moveTo(0,-2,30).then(()=>sg.setState(WI.run)))})}return E},DL=()=>{const E=new cI;return E.addChildren(rL()),E};class hL{ui=null;construtor(){}update(){xA.updateSystems(),TI.getInput(Oo)?.once&&sg.setState(WI.run)}render(){zo()}set(){this.ui=DL(),Ae.register()}unset(){this.ui?.destroy(),xA.unRegisterSystems()}}class cL{constructor(){}update(){TI.getInput(Pi)?.once&&sg.setState(WI.run)}render(){}set(){}unset(){}}class ge extends kI{constructor(){super()}}ge.register();class nB extends kI{nodes;selected;encounter;showingOptions=!1;constructor(A,I,g){super(),this.encounter=g,this.nodes=A,this.selected=I}}nB.register();const lL=E=>{const A=new Map,I=E.find(C=>C.start),g=(C,B=!1)=>{if(A.has(C.id))return A.get(C.id);const i=new cI,Q=i.addComponent(new QI(C.x,C.y));B&&xA.eventBus.publish(KI.PATHPOSITION,Q);const o={};for(let e of["left","right","top"])if(C[e]){const t=E.find(a=>a.id==C[e]);if(!t)continue;o[e]=g(t,!1)}return i.addComponent(new nB(o,B,C.encounter)),i};return g(I,!0)};class wL extends fg{constructor(){super(nB)}update(A){A.forEach(I=>{const g=I.getComponent(nB),[[C]]=xA.getEntitiesAndComponents(ge),B=xA.getEntityById(C).getComponent(QI),i=I.getComponent(QI);if(g.selected&&xA.eventBus.publish(KI.PATHPOSITION,i),g.selected&&(B.x!=i.x||B.y!=i.y))B.x+=Math.sign(i.x-B.x),B.y+=Math.sign(i.y-B.y);else if(g.selected&&g.encounter)g.encounter=!1,sg.setState(WI.run);else if(g.selected&&!g.showingOptions){const Q=Object.entries(g.nodes);if(Q.length==1)g.nodes[Q[0][0]].getComponent(nB).selected=!0,I.destroy();else for(let[o,e]of Q){const t=new cI;I.addChildren(t);const a=t.addComponent(new oI(yA.UI.arrow));t.addComponent(new Zi(yA.UI.arrowselected,yA.UI.arrow));const s=t.addComponent(new QI(i.x,i.y));switch(o){case"left":s.x-=16;break;case"top":s.y+=16,t.addComponent(new ug(Math.PI));break;case"right":s.x+=16,t.addComponent(new ug(Math.PI/2));break}TI.eventBus.subscribe("down",({objects:n})=>{n.includes(a.mesh.id)&&(e.getComponent(nB).selected=!0,g.selected=!1,t.destroy(),I.destroy())})}g.showingOptions=!0}})}}class GL{map;player;light;path;lastPosition={x:void 0,y:void 0};constructor(){this.light=new To(16777215)}render(){zo()}update(){xA.updateSystems(),Vg.step()}set(){$g.add(this.light);const A=yA.overworld,I=A.tile;this.map=new cI,this.player=new cI,this.map.addComponent(new oI(I)),this.map.addComponent(new QI(0,0));const g=Do.knightMale;this.player.addComponent(new oI(g.tiles.idle,{scale:.6,renderOrder:11})),this.player.addComponent(new lg(g.tiles)),this.player.addComponent(new DQ({bottom:-I.height/2,top:I.height/2,right:I.width/2,left:-I.width/2})),this.player.addComponent(new ge),xA.eventBus.subscribe(KI.PATHPOSITION,C=>{this.lastPosition.x=C.x,this.lastPosition.y=C.y}),!this.lastPosition.x&&!this.lastPosition.y&&lL(A.objects.get("path")),this.player.addComponent(new QI(this.lastPosition.x,this.lastPosition.y)),E0.register(),bD.register(),Ae.register(),I0.register(),wL.register()}unset(){xA.unRegisterSystems(),this.light?.removeFromParent(),this.map?.destroy(),this.player?.destroy()}}await new Promise(E=>Um({font:$D},()=>E()));sg.addState(WI.run,new sL);sg.addState(WI.levelUp,new hL);sg.addState(WI.pause,new cL);sg.addState(WI.map,new GL);sg.setState(WI.map);sg.start();