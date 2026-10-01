// Xcode 27 refuses to build pods whose IPHONEOS_DEPLOYMENT_TARGET is below 15.0
// (e.g. ReachabilitySwift, RNSVG). Raise every pod target to at least 15.1.
const { withDangerousMod } = require('expo/config-plugins');
const fs = require('node:fs');
const path = require('node:path');

const MARKER = '# with-min-pod-deployment-target';
const MIN = '15.1';

module.exports = function withMinPodDeploymentTarget(config) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfile, 'utf8');
      if (!contents.includes(MARKER)) {
        contents = contents.replace(
          /post_install do \|installer\|\n/,
          (m) =>
            `${m}    ${MARKER}\n` +
            `    installer.pods_project.targets.each do |t|\n` +
            `      t.build_configurations.each do |c|\n` +
            `        if c.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f < ${MIN}\n` +
            `          c.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${MIN}'\n` +
            `        end\n` +
            `      end\n` +
            `    end\n`
        );
        fs.writeFileSync(podfile, contents);
      }
      return cfg;
    },
  ]);
};
