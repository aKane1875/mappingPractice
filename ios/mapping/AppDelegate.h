#import <Foundation/Foundation.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <Expo/Expo.h>
#import <UMCore/UMAppDelegateWrapper.h>


@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate>
@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate>
@end
