//
//  AppDelegate.swift
//  V2EX Plus
//
//  V2EX Plus.
//

import Cocoa
import Darwin

@main
struct ApplicationMain {
    static func main() {
        let arguments = CommandLine.arguments
        guard let syncIndex = arguments.firstIndex(of: "--autosign-sync") else {
            _ = NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
            return
        }

        let values = arguments.dropFirst(syncIndex + 1)
        guard values.count == 3 else {
            Darwin.exit(64)
        }

        let archiveURL = URL(fileURLWithPath: values[values.startIndex])
        let destinationDirectory = URL(fileURLWithPath: values[values.index(after: values.startIndex)])
        let resultURL = URL(fileURLWithPath: values[values.index(values.startIndex, offsetBy: 2)])
        let fileManager = FileManager.default
        let appDestination = destinationDirectory.appendingPathComponent(Bundle.main.bundleURL.lastPathComponent)
        let archiveDestination = destinationDirectory.appendingPathComponent(archiveURL.lastPathComponent)
        var result = "ok"

        do {
            try fileManager.createDirectory(at: destinationDirectory, withIntermediateDirectories: true)
            if fileManager.fileExists(atPath: appDestination.path) {
                try fileManager.removeItem(at: appDestination)
            }
            try fileManager.copyItem(at: Bundle.main.bundleURL, to: appDestination)

            if fileManager.fileExists(atPath: archiveDestination.path) {
                try fileManager.removeItem(at: archiveDestination)
            }
            try fileManager.copyItem(at: archiveURL, to: archiveDestination)
        } catch {
            result = "error: \(error.localizedDescription)"
        }

        try? Data(result.utf8).write(to: resultURL)
        Darwin.exit(result == "ok" ? 0 : 1)
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

}
